"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Clock, X, ExternalLink, Github } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  category: string;
  description: string;
  technologies: string;
  mainImage: string;
  additionalImages: string;
  duration: string;
  completionDate: string;
  liveDemoUrl?: string;
  gitHubUrl?: string;
}

const categories = ["Semua", "Landing Page", "Company Profile", "SaaS & App", "E-Commerce"];

export default function PublicPortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [activeCat, setActiveCat] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolio");
        const data = await res.json();
        if (data.success) {
          setPortfolios(data.data);
        }
      } catch (err) {
        console.error("Fetch Portfolio Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  const filtered = portfolios.filter(
    (p) => activeCat === "Semua" || p.category.toLowerCase() === activeCat.toLowerCase()
  );

  return (
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Portofolio & Galeri Karya
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Karya Terbaik Yang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Telah Kami Selesaikan
            </span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Jelajahi portofolio nyata dari proyek yang telah kami kembangkan untuk berbagai klien bisnis di Indonesia.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCat === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-semibold text-sm">
            Memuat data portofolio dari database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-16 text-center text-slate-500 font-semibold text-sm">
            Belum ada proyek dalam kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => {
              const techList = item.technologies.split(",").map((t) => t.trim());
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedProject(item)}
                >
                  {/* Image Header */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                      {item.category}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs font-bold text-primary mb-1">
                        {item.clientName}
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {techList.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 3 && (
                          <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                            +{techList.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {item.duration}
                        </span>
                        <span className="text-primary font-bold">Lihat Detail &rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-12">
              <div className="inline-block px-3 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                {selectedProject.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedProject.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Klien: <span className="text-slate-800">{selectedProject.clientName}</span>
              </p>
            </div>

            {/* Main Image Banner */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={selectedProject.mainImage}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Additional Gallery Images */}
            {(() => {
              let extras: string[] = [];
              try {
                extras = typeof selectedProject.additionalImages === "string"
                  ? JSON.parse(selectedProject.additionalImages)
                  : selectedProject.additionalImages || [];
              } catch {
                extras = [];
              }

              if (extras.length === 0) return null;

              return (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Galeri Tangkapan Layar
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {extras.map((img, idx) => (
                      <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <Image src={img} alt={`Extra ${idx}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-bold block">Durasi Pengerjaan</span>
                <span className="font-bold text-slate-800">{selectedProject.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Tanggal Selesai</span>
                <span className="font-bold text-slate-800">
                  {new Date(selectedProject.completionDate).toLocaleDateString("id-ID")}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Teknologi</span>
                <span className="font-bold text-slate-800">{selectedProject.technologies}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ringkasan Proyek
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                {selectedProject.description}
              </p>
            </div>

            {/* Links & Close */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex gap-3">
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary/95 transition-all shadow-sm"
                  >
                    Kunjungi Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.gitHubUrl && (
                  <a
                    href={selectedProject.gitHubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub Repo
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 ml-auto"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
