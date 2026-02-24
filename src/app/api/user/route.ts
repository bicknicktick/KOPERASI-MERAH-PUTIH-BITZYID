import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: {
      id: true,
      nik: true,
      name: true,
      role: true,
      balance: true,
      notificationsEnabled: true,
    },
  });

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data: any = {};

    if (typeof body.name === "string") {
      const trimmed = body.name.trim();
      if (!trimmed) {
        return NextResponse.json({ error: "Nama tidak boleh kosong" }, { status: 400 });
      }
      data.name = trimmed;
    }

    if (typeof body.notificationsEnabled === "boolean") {
      data.notificationsEnabled = body.notificationsEnabled;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Tidak ada data untuk diperbarui" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: (session.user as any).id },
      data,
      select: {
        id: true,
        nik: true,
        name: true,
        role: true,
        balance: true,
        notificationsEnabled: true,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
