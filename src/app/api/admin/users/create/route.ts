import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, nik, password, role, balance } = await req.json();

    if (!name || !nik || !password) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { nik },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'NIK sudah terdaftar' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        nik,
        password, // Simpan password (idealnya pakai hash)
        role: role || 'member',
        balance: parseInt(balance) || 0,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
