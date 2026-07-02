import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const portfolios = await db.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: portfolios });
  } catch (error) {
    console.error("Fetch Portfolios Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data portofolio." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      clientName,
      category,
      description,
      technologies,
      mainImage,
      additionalImages,
      duration,
      completionDate,
      liveDemoUrl,
      gitHubUrl,
    } = body;

    if (!title || !clientName || !category || !description || !technologies || !mainImage || !duration || !completionDate) {
      return NextResponse.json(
        { success: false, message: "Mohon lengkapi semua bidang wajib." },
        { status: 400 }
      );
    }

    const newPortfolio = await db.portfolio.create({
      data: {
        title,
        clientName,
        category,
        description,
        technologies,
        mainImage,
        additionalImages: typeof additionalImages === "string" ? additionalImages : JSON.stringify(additionalImages || []),
        duration,
        completionDate: new Date(completionDate),
        liveDemoUrl: liveDemoUrl || null,
        gitHubUrl: gitHubUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: newPortfolio }, { status: 201 });
  } catch (error) {
    console.error("Create Portfolio Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat portofolio baru." },
      { status: 500 }
    );
  }
}
