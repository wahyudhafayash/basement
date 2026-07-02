"use client"
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  Download,
  MessageSquare,
  Mail,
  ArrowRight,
  Building2,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";

interface OrderData {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  businessName: string;
  businessType: string;
  projectType: string;
  selectedPackage: string;
  additionalServices: string;
  projectDescription: string;
  estimatedBudget: string;
  targetCompletion: string;
  pdfPath?: string;
  createdAt: string;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/order?id=${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center text-xs font-bold text-slate-400">
        Memuat detail pesanan & menginisialisasi proposal PDF...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background pt-32 text-center space-y-4">
        <p className="text-slate-600 text-sm font-semibold">Pesanan tidak ditemukan.</p>
        <Link href="/order">
          <button className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-full">
            Kembali ke Formulir
          </button>
        </Link>
      </div>
    );
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const proposalUrl = order.pdfPath ? `${siteUrl}${order.pdfPath}` : `${siteUrl}/proposals/${order.id}-proposal.pdf`;

  // WhatsApp formatted text
  const waMessage = encodeURIComponent(
    `Halo Basement Co.! Saya baru saja mengirim pesanan proyek.\n\n` +
    `*Detail Pesanan:*\n` +
    `- No. Ref: REF-${order.id.substring(0, 8).toUpperCase()}\n` +
    `- Nama: ${order.fullName}\n` +
    `- Perusahaan: ${order.businessName}\n` +
    `- Paket: ${order.selectedPackage} (${order.projectType})\n` +
    `- Budget: ${order.estimatedBudget}\n\n` +
    `Link Proposal PDF: ${proposalUrl}`
  );

  const waLink = `https://wa.me/6287785349292?text=${waMessage}`;

  // Email mailto link
  const mailSubject = encodeURIComponent(`[Order Proposal] ${order.businessName} - ${order.selectedPackage}`);
  const mailBody = encodeURIComponent(
    `Kepada Tim Basement Co.,\n\n` +
    `Saya telah mengirimkan formulir pemesanan jasa rekayasa digital.\n\n` +
    `Detail Ringkas:\n` +
    `- Pemesan: ${order.fullName}\n` +
    `- Email: ${order.email}\n` +
    `- Usaha: ${order.businessName} (${order.businessType})\n` +
    `- Paket: ${order.selectedPackage}\n` +
    `- Target Selesai: ${new Date(order.targetCompletion).toLocaleDateString("id-ID")}\n\n` +
    `Link unduh Proposal PDF resmi: ${proposalUrl}\n\n` +
    `Terima kasih.`
  );

  const mailLink = `mailto:hello@basement.co?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl space-y-12 relative z-10">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Pesanan Berhasil Dikirim
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Proposal PDF Resmi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Siap Digunakan
            </span>
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            Terima kasih, <span className="font-bold text-slate-900">{order.fullName}</span>. Pesanan Anda telah tersimpan dan proposal PDF resmi telah selesai dibuat.
          </p>
        </div>

        {/* Action Buttons Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-4">
            <Sparkles className="w-4 h-4 text-primary" /> Opsi Tindakan Proposal
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Download PDF */}
            <a
              href={order.pdfPath || `/proposals/${order.id}-proposal.pdf`}
              download={`Proposal-${order.businessName}.pdf`}
              target="_blank"
              rel="noreferrer"
              className="bg-primary hover:bg-primary/95 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md shadow-primary/20 transition-all group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Unduh PDF Proposal</h3>
                <p className="text-[11px] text-white/80 mt-0.5">Simpan dokumen proposal resmi ke perangkat Anda.</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold pt-2 group-hover:translate-x-1 transition-transform">
                Unduh PDF <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Send via WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md shadow-emerald-500/20 transition-all group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kirim via WhatsApp</h3>
                <p className="text-[11px] text-white/80 mt-0.5">Kirim detail & link proposal langsung ke tim kami.</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold pt-2 group-hover:translate-x-1 transition-transform">
                Buka WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Send via Email */}
            <a
              href={mailLink}
              className="bg-slate-900 hover:bg-slate-800 text-white p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md shadow-slate-900/20 transition-all group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kirim via Email</h3>
                <p className="text-[11px] text-white/80 mt-0.5">Format email penawaran resmi terisi otomatis.</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold pt-2 group-hover:translate-x-1 transition-transform">
                Kirim Email <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-slate-900 text-base">Ringkasan Pesanan</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Ref: REF-{order.id.substring(0, 8).toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Pemesan</span>
              <span className="font-bold text-slate-900 text-sm block">{order.fullName}</span>
              <span className="text-slate-500 block">{order.email}</span>
              <span className="text-slate-500 block">{order.whatsappNumber}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Perusahaan & Bidang</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" /> {order.businessName}
              </div>
              <span className="text-slate-500 block">{order.businessType}</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Paket & Budget</span>
              <div className="flex items-center gap-1.5 font-bold text-primary text-sm">
                <Layers className="w-4 h-4" /> {order.selectedPackage}
              </div>
              <span className="text-slate-500 block">Estimasi: {order.estimatedBudget}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Target Selesai: <strong className="text-slate-800">{new Date(order.targetCompletion).toLocaleDateString("id-ID")}</strong></span>
            </div>

            <Link href="/" className="text-primary font-bold hover:underline">
              &larr; Kembali ke Beranda Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center text-xs font-bold text-slate-400">Memuat Ringkasan...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
