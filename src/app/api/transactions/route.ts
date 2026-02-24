import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, amount } = await req.json();

    if (!type || !amount) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const trx = await prisma.transaction.create({
      data: {
        userId: (session.user as any).id,
        type,
        amount: parseFloat(amount),
        status: "pending",
      },
    });

    return NextResponse.json(trx);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}