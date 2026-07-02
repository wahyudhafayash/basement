import { jsPDF } from "jspdf";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export interface OrderPDFData {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  businessName: string;
  businessType: string;
  projectType: string;
  selectedPackage: string;
  additionalServices: string; // JSON string or comma list
  projectDescription: string;
  estimatedBudget: string;
  targetCompletion: Date | string;
  additionalNotes?: string | null;
  createdAt: Date | string;
}

export async function generateProposalPDF(order: OrderPDFData): Promise<string> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  let extrasList: string[] = [];
  try {
    extrasList = typeof order.additionalServices === "string"
      ? JSON.parse(order.additionalServices)
      : order.additionalServices || [];
  } catch {
    extrasList = [order.additionalServices];
  }

  // Colors
  const primaryColor = [99, 102, 241]; // Violet / Indigo
  const darkTextColor = [30, 41, 59];
  const mutedTextColor = [100, 116, 139];

  // Header Banner / Logo
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 20, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("BASEMENT CO. DIGITAL STUDIO", 15, 13);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("PROPOSAL PENAWARAN RESMI", 195, 13, { align: "right" });

  // Order & Date Info
  let y = 32;
  doc.setFontSize(10);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
  doc.setFont("helvetica", "bold");
  doc.text("DOKUMEN PROPOSAL PROYEK", 15, y);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text(`No. Ref: REF-${order.id.substring(0, 8).toUpperCase()}`, 195, y, { align: "right" });

  y += 6;
  doc.text(`Tanggal Dibuat: ${new Date(order.createdAt).toLocaleDateString("id-ID")}`, 195, y, { align: "right" });

  // Divider Line
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, 195, y);

  // Section 1: Informasi Klien & Bisnis
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("1. INFORMASI KLIEN & BISNIS", 15, y);

  y += 7;
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  doc.text(`Nama Pemesan: ${order.fullName}`, 15, y);
  doc.text(`Email Resmi: ${order.email}`, 110, y);

  y += 6;
  doc.text(`No. WhatsApp: ${order.whatsappNumber}`, 15, y);
  doc.text(`Nama Usaha: ${order.businessName}`, 110, y);

  y += 6;
  doc.text(`Bidang Usaha: ${order.businessType}`, 15, y);

  // Section 2: Paket & Layanan Dipilih
  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("2. DETAIL SPESIFIKASI PROYEK & PAKET", 15, y);

  y += 7;
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  doc.text(`Tipe Rekayasa: ${order.projectType}`, 15, y);
  doc.text(`Paket Pilihan: ${order.selectedPackage}`, 110, y);

  y += 6;
  const extrasStr = extrasList.length > 0 ? extrasList.join(", ") : "Tidak Ada";
  doc.text(`Layanan Tambahan: ${extrasStr}`, 15, y);

  // Section 3: Deskripsi & Estimasi Budget
  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("3. ESTIMASI BIAYA & TARGET WAKTU", 15, y);

  y += 7;
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  doc.text(`Estimasi Budget: ${order.estimatedBudget}`, 15, y);
  doc.text(
    `Target Selesai: ${new Date(order.targetCompletion).toLocaleDateString("id-ID")}`,
    110,
    y
  );

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Ringkasan Kebutuhan Proyek:", 15, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);

  const splitDesc = doc.splitTextToSize(order.projectDescription, 180);
  doc.text(splitDesc, 15, y);
  y += splitDesc.length * 5;

  if (order.additionalNotes) {
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.text("Catatan Khusus:", 15, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
    const splitNotes = doc.splitTextToSize(order.additionalNotes, 180);
    doc.text(splitNotes, 15, y);
    y += splitNotes.length * 5;
  }

  // Section 4: Signature Area
  y = Math.max(y + 15, 230);
  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, 195, y);

  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);

  doc.text("Disetujui Oleh Admin Basement Co.,", 15, y);
  doc.text("Pemesan / Klien,", 145, y);

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.text("( Tim Lead Studio )", 15, y);
  doc.text(`( ${order.fullName} )`, 145, y);

  // Footer Branding
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(mutedTextColor[0], mutedTextColor[1], mutedTextColor[2]);
  doc.text("Basement Co. Digital Agency - Jakarta, Indonesia | Website: basement.co", 105, 287, {
    align: "center",
  });

  // Save to file
  const proposalsDir = path.join(process.cwd(), "public", "proposals");
  await mkdir(proposalsDir, { recursive: true });

  const filename = `${order.id}-proposal.pdf`;
  const filepath = path.join(proposalsDir, filename);

  const pdfOutput = doc.output("arraybuffer");
  await writeFile(filepath, Buffer.from(pdfOutput));

  return `/proposals/${filename}`;
}
