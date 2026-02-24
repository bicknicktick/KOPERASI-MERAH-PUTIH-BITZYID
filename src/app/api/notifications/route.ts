import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: (session?.user as any).id },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return NextResponse.json(notifications);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

export async function PUT() {
    const session = await getServerSession(authOptions);

    if (!(session?.user as any)?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await prisma.notification.updateMany({
            where: {
                userId: (session?.user as any).id,
                isRead: false
            },
            data: {
                isRead: true
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
    }
}
