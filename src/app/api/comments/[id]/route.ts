import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/middleware/authMiddleware";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	const comment = await prisma.comment.update({ where: { id: Number(params.id) }, data: { approved: true } });
	return NextResponse.json({ comment });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const authRes = requireAuth(req, ["admin", "editor"]);
	if (authRes instanceof NextResponse) return authRes;
	await prisma.comment.delete({ where: { id: Number(params.id) } });
	return NextResponse.json({ message: "Deleted" });
}
