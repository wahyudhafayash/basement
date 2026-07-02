"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Award, Users, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function TentangKamiPage() {
  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl space-y-24 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Profil Perusahaan
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Studio Teknologi Digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Terdepan di Indonesia
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Basement Co. merancang dan mengembangkan website serta aplikasi berkinerja tinggi yang membantu bisnis tampil profesional, terpercaya, dan menghasilkan konversi tinggi.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-slate-50 border border-slate-200/80 p-8 sm:p-12 rounded-3xl">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src="/images/Daffa5.jpeg"
                alt="Basement Co."
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pengalaman & Dedikasi Tanpa Kompromi
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Didirikan dengan fokus utama pada kualitas engineering dan estetika antarmuka, Basement Co. telah membantu puluhan bisnis mulai dari UMKM, Startup, hingga Perusahaan Komersial untuk membangun ekosistem digital mereka.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kami memadukan teknologi modern seperti Next.js, React, TypeScript, dan Tailwind CSS untuk menjamin setiap proyek memiliki kecepatan muat di bawah 1 detik, struktur SEO yang sempurna, dan tampilan yang memukau di semua perangkat.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Proyek Selesai", value: "50+", icon: <Award className="w-5 h-5 text-primary" /> },
            { label: "Tingkat Kepuasan", value: "99.8%", icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
            { label: "Klien Bisnis", value: "40+", icon: <Users className="w-5 h-5 text-indigo-600" /> },
            { label: "Performa Web Avg", value: "< 1s", icon: <Zap className="w-5 h-5 text-amber-500" /> },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-2 shadow-sm">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Visi Kami</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Menjadi mitra rekayasa perangkat lunak terpercaya di Indonesia yang menghasilkan solusi digital berstandar internasional, mendorong akselerasi bisnis klien ke tingkat tertinggi.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Misi Kami</h3>
            <ul className="space-y-3">
              {[
                "Mengutamakan kualitas kode bersih, performa cepat, dan keamanan.",
                "Menghadirkan desain UI/UX yang modern, intuitif, dan responsif.",
                "Memberikan dukungan teknis dan garansi pemeliharaan berkelanjutan.",
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-xs font-medium">{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary via-violet-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">Siap Memulai Proyek Digital Anda?</h2>
          <p className="text-white/80 text-sm max-w-2xl mx-auto font-medium">
            Konsultasikan kebutuhan pembuatan website atau aplikasi Anda dengan tim ahli kami secara gratis.
          </p>
          <Link href="/order" className="inline-block">
            <button className="bg-white text-primary hover:bg-slate-100 font-bold px-8 py-4 rounded-full text-sm transition-all shadow-lg flex items-center gap-2 mx-auto">
              Pesan Jasa Sekarang <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
