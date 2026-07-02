"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Edit3,
  LogOut,
  FolderKanban,
  Search,
  ExternalLink,
  Calendar,
  Clock,
  Code2,
  AlertCircle
} from "lucide-react";

interface Portfolio {
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
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/portfolio");
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

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPortfolios((prev) => prev.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Dashboard Portofolio
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Kelola proyek & tampilan karya Basement Co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard/new">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm">
                <Plus className="w-4 h-4" />
                Tambah Portofolio
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan judul, klien, atau kategori..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-all shadow-sm"
            />
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Total Proyek: <span className="text-slate-900 font-bold">{portfolios.length}</span>
          </div>
        </div>

        {/* Portfolio Table / Grid */}
        {loading ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-sm font-medium">
            Memuat data portofolio...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold text-sm">Belum ada data portofolio.</p>
            <p className="text-slate-400 text-xs">Klik tombol &ldquo;Tambah Portofolio&rdquo; untuk menambahkan karya pertama Anda.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Proyek</th>
                    <th className="py-4 px-6">Klien & Kategori</th>
                    <th className="py-4 px-6">Teknologi</th>
                    <th className="py-4 px-6">Durasi & Selesai</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                            <Image
                              src={item.mainImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                            {item.liveDemoUrl && (
                              <a
                                href={item.liveDemoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-primary flex items-center gap-1 hover:underline mt-0.5"
                              >
                                Live Demo <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{item.clientName}</div>
                        <span className="inline-block px-2 py-0.5 mt-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate max-w-[150px]">{item.technologies}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(item.completionDate).toLocaleDateString("id-ID")}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/dashboard/edit/${item.id}`}>
                            <button className="p-2 text-slate-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                              <Edit3 className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 border border-slate-200 shadow-xl text-center">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hapus Portofolio ini?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tindakan ini tidak dapat dibatalkan. Data portofolio akan terhapus dari database.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting ? "Hapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
