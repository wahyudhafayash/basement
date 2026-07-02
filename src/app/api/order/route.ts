import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      whatsappNumber,
      businessName,
      businessType,
      projectType,
      selectedPackage,
      additionalServices,
      projectDescription,
      estimatedBudget,
      targetCompletion,
      additionalNotes,
    } = body;

    // Validation
    if (
      !fullName ||
      !email ||
      !whatsappNumber ||
      !businessName ||
      !businessType ||
      !projectType ||
      !selectedPackage ||
      !projectDescription ||
      !estimatedBudget ||
      !targetCompletion
    ) {
      return NextResponse.json(
        { success: false, message: "Mohon lengkapi semua bidang wajib." },
        { status: 400 }
      );
    }

    const newOrder = await db.order.create({
      data: {
        fullName,
        email,
        whatsappNumber,
        businessName,
        businessType,
        projectType,
        selectedPackage,
        additionalServices:
          typeof additionalServices === "string"
            ? additionalServices
            : JSON.stringify(additionalServices || []),
        projectDescription,
        estimatedBudget,
        targetCompletion: new Date(targetCompletion),
        additionalNotes: additionalNotes || null,
        status: "PENDING",
      },
    });

    // Generate Proposal PDF
    try {
      const { generateProposalPDF } = await import("@/lib/pdf");
      const pdfPath = await generateProposalPDF(newOrder);
      await db.order.update({
        where: { id: newOrder.id },
        data: { pdfPath },
      });
      newOrder.pdfPath = pdfPath;
    } catch (pdfErr) {
      console.error("PDF Generation Warning:", pdfErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pesanan berhasil dibuat.",
        orderId: newOrder.id,
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memproses pemesanan." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const order = await db.order.findUnique({ where: { id } });
      if (!order) {
        return NextResponse.json(
          { success: false, message: "Pesanan tidak ditemukan." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: order });
    }

    const orders = await db.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetch Order Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data pesanan." },
      { status: 500 }
    );
  }
}
