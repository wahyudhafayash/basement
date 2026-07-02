"use client"
import React from "react";
import Link from "next/link";
import { MessageSquare, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function HubungiKamiPage() {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "6287785349292";
    const message = encodeURIComponent("Halo Basement Co., saya ingin berkonsultasi mengenai jasa pembuatan website/aplikasi.");
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Kontak Resmi
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hubungi Tim Konsultan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Basement Co.
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Kami siap membantu menjawab pertanyaan Anda, memberikan estimasi biaya, serta merencanakan strategi produk digital Anda.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp Card */}
          <div
            onClick={handleWhatsAppRedirect}
            className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 cursor-pointer hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Respon cepat untuk pertanyaan langsung dan diskusi awal proyek.
              </p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold pt-2">
              Chat Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Email Card */}
          <a
            href="mailto:hello@basement.co"
            className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                Email Resmi
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kirim proposal tender, dokumen spesifikasi, atau tawaran kemitraan.
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold pt-2">
              hello@basement.co <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Location Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Lokasi Studio</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Jakarta, Indonesia
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-2">
              <Clock className="w-3.5 h-3.5" /> Senin - Jumat (09.00 - 17.00)
            </div>
          </div>
        </div>

        {/* Formal Order Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Sudah Siap Melakukan Pemesanan Jasa?</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
            Gunakan formulir pemesanan resmi kami untuk mendapatkan rekomendasi paket instan dan pembuatan proposal PDF.
          </p>
          <Link href="/order" className="inline-block">
            <button className="bg-primary text-white hover:bg-primary/95 font-bold px-8 py-4 rounded-full text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-2 mx-auto">
              Buka Formulir Pemesanan <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
