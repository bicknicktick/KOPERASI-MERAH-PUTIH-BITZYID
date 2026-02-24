import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: {
          select: { name: true, nik: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Hitung Metrik Dashboard Koperasi (Approved Only)
    const approvedSimpanan = await prisma.transaction.aggregate({
      where: { type: 'simpanan', status: 'approved' },
      _sum: { amount: true },
    });
    
    const approvedPinjaman = await prisma.transaction.aggregate({
      where: { type: 'pinjaman', status: 'approved' },
      _sum: { amount: true },
    });

    const totalKas = (approvedSimpanan._sum.amount || 0) - (approvedPinjaman._sum.amount || 0);
    
    const userCount = await prisma.user.count({
      where: { role: 'member' }
    });

    return NextResponse.json({
      transactions,
      metrics: {
        totalSimpanan: approvedSimpanan._sum.amount || 0,
        totalPinjaman: approvedPinjaman._sum.amount || 0,
        totalKas: totalKas > 0 ? totalKas : 0,
        totalAnggota: userCount
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const transaction = await prisma.transaction.update({
      where: { id },
      data: { status },
    });

    // Update saldo user jika transaksi disetujui
    if (status === 'approved') {
      const user = await prisma.user.findUnique({ where: { id: transaction.userId } });
      if (user) {
        const newBalance = transaction.type === 'simpanan' 
          ? user.balance + transaction.amount 
          : user.balance - transaction.amount;
          
        await prisma.user.update({
          where: { id: user.id },
          data: { balance: newBalance },
        });
      }
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update transaksi' }, { status: 500 });
  }
}