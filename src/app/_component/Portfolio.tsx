"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  category: string;
  description: string;
  technologies: string;
  mainImage: string;
  duration: string;
  liveDemoUrl?: string;
}

const categories = ["Semua", "Landing Page", "Company Profile", "SaaS & App", "E-Commerce"];

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

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
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicData();
  }, []);

  const filteredProjects = portfolios.filter(
    (p) => activeCategory === "Semua" || p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <section className="bg-background py-24 border-t border-slate-100 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
              Portofolio Pilihan
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
              Karya Kreatif{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
                Yang Telah Selesai
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Lihat proyek buatan kami yang aktif dan terbukti membantu kemajuan bisnis para klien.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Projects Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-semibold text-xs">
            Memuat portofolio dari database...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 font-semibold text-xs">
            Belum ada proyek dalam kategori ini.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.slice(0, 6).map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group h-[400px]"
                >
                  {/* Mockup Image Header */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={project.mainImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold text-white uppercase tracking-wider bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      {project.category}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-primary mb-1">
                        {project.clientName}
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{project.duration}</span>
                      </div>
                      <Link href="/portfolio" className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                        Detail <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All Button */}
        <div className="text-center pt-12">
          <Link href="/portfolio">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-8 py-3.5 rounded-full transition-all border border-slate-200">
              Lihat Semua Portofolio &rarr;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
