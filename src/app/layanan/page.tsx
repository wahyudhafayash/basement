"use client"
import React from "react";
import Link from "next/link";
import {
  Layout,
  Smartphone,
  Zap,
  ShieldCheck,
  Code2,
  Database,
  CreditCard,
  Search,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: <Layout className="w-8 h-8 text-primary" />,
    title: "Pembuatan Website Premium",
    desc: "Landing page konversi tinggi, profil perusahaan, hingga website kustom dengan performa ultra-cepat dan SEO friendly.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    icon: <Smartphone className="w-8 h-8 text-indigo-600" />,
    title: "Pengembangan Aplikasi Mobile",
    desc: "Aplikasi Android & iOS multiplatform dengan antarmuka halus, responsif, dan siap rilis di Play Store / App Store.",
    tags: ["React Native", "Flutter", "REST API"],
  },
  {
    icon: <Code2 className="w-8 h-8 text-violet-600" />,
    title: "UI/UX & Brand Design",
    desc: "Perancangan wireframe, antarmuka estetik, dan prototipe interaktif di Figma sebelum tahap pengkodean.",
    tags: ["Framer", "Figma", "User Research"],
  },
  {
    icon: <Search className="w-8 h-8 text-emerald-600" />,
    title: "Optimasi SEO & Performa",
    desc: "Strategi optimasi mesin pencari organik dan Core Web Vitals untuk menduduki halaman utama pencarian Google.",
    tags: ["SEO On-Page", "PageSpeed 100", "Schema"],
  },
  {
    icon: <CreditCard className="w-8 h-8 text-amber-500" />,
    title: "Integrasi Payment Gateway",
    desc: "Sistem pembayaran otomatis terintegrasi (Midtrans, Xendit, Stripe) untuk toko e-commerce dan SaaS.",
    tags: ["Midtrans", "Stripe", "Webhook"],
  },
  {
    icon: <Database className="w-8 h-8 text-blue-600" />,
    title: "Integrasi API & Backend Custom",
    desc: "Arsitektur database scalable, pembuatan RESTful API, dan penghubungan sistem internal bisnis Anda.",
    tags: ["Prisma", "Node.js", "SQLite"],
  },
  {
    icon: <Zap className="w-8 h-8 text-rose-500" />,
    title: "Setup Cloud & Domain SSL",
    desc: "Konfigurasi server hosting awan, pemasangan sertifikat SSL HTTPS gratis, dan pendaftaran domain kustom.",
    tags: ["Vercel", "AWS", "Cloudflare"],
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-cyan-600" />,
    title: "Pemeliharaan & Garansi Web",
    desc: "Dukungan teknis berkala, pembaruan keamanan rutin, serta garansi pemulihan instan jika terjadi kendala.",
    tags: ["24/7 Support", "Backup Routine", "Garansi"],
  },
];

export default function LayananPage() {
  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Layanan Professional
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Solusi Rekayasa Digital Lengkap untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Pertumbuhan Bisnis Anda
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Pilih layanan pengembangan yang Anda butuhkan. Kami menjamin kode rapi, arsitektur aman, dan desain berkelas dunia.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/order" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-1">
                  Pesan Layanan ini <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Bar */}
        <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl text-center space-y-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Teknologi Modern Yang Kami Gunakan
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-700 font-bold text-sm sm:text-base">
            <span>Next.js 15</span>
            <span>React 18</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
            <span>Prisma ORM</span>
            <span>SQLite</span>
            <span>Node.js</span>
            <span>Framer Motion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
