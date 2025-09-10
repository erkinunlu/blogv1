import { sign, verify, type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const JWT_SECRET = (process.env.JWT_SECRET || "") as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET environment variable is not set");
}

export interface JwtPayloadData {
	userId: string;
	role: "admin" | "editor" | "user";
	email: string;
}

export function signToken(data: JwtPayloadData): string {
	const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as unknown as SignOptions["expiresIn"] };
	return sign(data as unknown as JwtPayload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayloadData | null {
	try {
		return verify(token, JWT_SECRET) as JwtPayloadData;
	} catch {
		return null;
	}
}

export async function hashPassword(plain: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plain, hash);
}

export function getTokenFromRequest(req: NextRequest): string | null {
	const token = req.cookies.get("token")?.value;
	return token || null;
}
