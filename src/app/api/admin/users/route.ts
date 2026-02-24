import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  try {
    const { id, name, nik, role, balance } = await req.json();

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        nik,
        role,
        balance: parseInt(balance) || 0,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update user' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // Delete related transactions first to prevent foreign key errors
    await prisma.transaction.deleteMany({
      where: { userId: id }
    });

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'User dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal hapus user' }, { status: 500 });
  }
}