"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronUp, ArrowRight, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Landing Page",
    price: "399K",
    desc: "Optimalkan konversi penjualan produk/jasa Anda dengan landing page estetik dan cepat.",
    features: [
      "Gratis Konsultasi",
      "Desain Responsive Mobile & Desktop",
      "1 Halaman Utama + CTA",
      "Free SSL (HTTPS)",
      "Gratis Domain .xyz 1 Tahun Pertama",
      "Gratis High-Speed Hosting",
      "Garansi Perbaikan Error",
    ],
    popular: false,
  },
  {
    name: "Company Profile",
    price: "1.299K",
    desc: "Perkenalkan perusahaan Anda dengan profil profesional yang memukau dan terpercaya.",
    features: [
      "Gratis Konsultasi",
      "Desain Responsive Premium",
      "Hingga 5 Halaman Konten",
      "Free SSL (HTTPS)",
      "Gratis Custom Domain .com / .co.id 1 Tahun",
      "Gratis Premium Hosting",
      "Integrasi Form Kontak & WhatsApp",
      "Optimasi SEO Basic",
    ],
    popular: true,
  },
  {
    name: "Custom Web & SaaS",
    price: "2.999K+",
    desc: "Solusi aplikasi web kompleks, dashboard admin, e-commerce, atau fitur kustom khusus.",
    features: [
      "Gratis Konsultasi & Blueprint",
      "Arsitektur Next.js & React Custom",
      "Halaman Tidak Terbatas",
      "Integrasi Database SQLite/Postgres",
      "Integrasi Payment Gateway",
      "Dashboard Admin Manajerial",
      "Optimasi Performa Core Web Vitals 100%",
      "Garansi Maintenance 6 Bulan",
    ],
    popular: false,
  },
];

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan website?",
    a: "Waktu pengerjaan bergantung pada paket yang dipilih. Landing page rata-rata selesai dalam 3-5 hari kerja, Company Profile 1-2 minggu, dan proyek kustom/SaaS 2-4 minggu.",
  },
  {
    q: "Apakah biaya hosting dan domain sudah termasuk?",
    a: "Ya! Seluruh paket pembuatan website kami sudah mencakup gratis hosting dan gratis domain selama 1 tahun pertama.",
  },
  {
    q: "Bagaimana alur pembayaran jasa pembuatan website?",
    a: "Sistem pembayaran kami menggunakan skema Down Payment (DP) sebesar 50% di awal proyek, dan pelunasan 50% setelah proyek selesai dan disetujui.",
  },
  {
    q: "Apakah saya bisa meminta revisi desain?",
    a: "Tentu! Kami memberikan garansi revisi hingga Anda puas dengan hasil tampilan sebelum website resmi dirilis secara publik.",
  },
  {
    q: "Bagaimana jika terjadi kendala pada website setelah selesai?",
    a: "Kami menyediakan garansi purna jual dan pemeliharaan teknis gratis untuk memastikan website Anda selalu aktif 24/7 tanpa gangguan.",
  },
];

export default function PaketHargaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl space-y-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Investasi Transparan
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Paket Harga Pembuatan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Website & Aplikasi
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Tanpa biaya tersembunyi. Pilih paket yang sesuai dengan kebutuhan dan skala perkembangan bisnis Anda saat ini.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white border-2 ${
                plan.popular
                  ? "border-primary shadow-xl scale-105"
                  : "border-slate-200 shadow-sm"
              } rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:shadow-2xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                  Paling Populer
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      Rp {plan.price}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6 space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fitur Termasuk:</span>
                  <ul className="space-y-2.5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-slate-100">
                <Link href={`/order?package=${encodeURIComponent(plan.name)}`}>
                  <button
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/20"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                  >
                    Pesan Paket Ini <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-2">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Pertanyaan Sering Diajukan (FAQ)</h2>
            <p className="text-xs text-slate-500">
              Jawaban atas hal-hal yang sering ditanyakan calon klien kami.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
