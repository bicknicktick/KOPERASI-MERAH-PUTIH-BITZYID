import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nik, name, password } = await req.json();

    if (!nik || !name || !password) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { nik } });
    if (existingUser) {
      return NextResponse.json({ error: "NIK sudah terdaftar" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        nik,
        name,
        password: hashedPassword,
        balance: 0,
      },
    });

    return NextResponse.json({ message: "User berhasil dibuat", user: { id: user.id, nik: user.nik } });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}