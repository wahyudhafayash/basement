import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolio = await db.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portofolio tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: portfolio });
  } catch (error) {
    console.error("Fetch Single Portfolio Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updated = await db.portfolio.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Portfolio Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui data portofolio." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Portofolio berhasil dihapus." });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus portofolio." },
      { status: 500 }
    );
  }
}
