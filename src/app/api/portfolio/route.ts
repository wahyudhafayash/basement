import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const portfolios = await db.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: portfolios });
  } catch (error) {
    console.error("Fetch Public Portfolios Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat data portofolio." },
      { status: 500 }
    );
  }
}
