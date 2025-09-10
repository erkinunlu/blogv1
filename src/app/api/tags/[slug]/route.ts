import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
	await prisma.tag.delete({ where: { slug: params.slug } });
	return NextResponse.json({ message: "Deleted" });
}
