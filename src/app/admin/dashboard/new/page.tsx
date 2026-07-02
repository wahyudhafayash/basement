"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Upload, Plus, Trash2, Save } from "lucide-react";

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    category: "Landing Page",
    description: "",
    technologies: "",
    mainImage: "",
    additionalImages: [] as string[],
    duration: "2 Minggu",
    completionDate: new Date().toISOString().split("T")[0],
    liveDemoUrl: "",
    gitHubUrl: "",
  });

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingExtra, setUploadingExtra] = useState(false);

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, mainImage: result.url }));
      } else {
        alert(result.message || "Gagal mengunggah gambar utama.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan upload.");
    } finally {
      setUploadingMain(false);
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingExtra(true);
    try {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          additionalImages: [...prev.additionalImages, result.url],
        }));
      } else {
        alert(result.message || "Gagal mengunggah gambar.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingExtra(false);
    }
  };

  const removeExtraImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.mainImage) {
      setError("Mohon unggah gambar utama proyek.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan data.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan sistem.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Tambah Portofolio Baru
          </span>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl font-black text-slate-900">Form Portofolio Baru</h1>
            <p className="text-xs text-slate-500 mt-1">
              Isi seluruh informasi detail proyek untuk ditampilkan pada katalog publik.
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-4 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Judul Proyek *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="cth: Apex Finance Web Dashboard"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Client Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Nama Klien / Perusahaan *</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="cth: PT Sinar Jaya E-Commerce"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Kategori Proyek *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Company Profile">Company Profile</option>
                <option value="SaaS & App">SaaS & App</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Custom Website">Custom Website</option>
                <option value="Dashboard Admin">Dashboard Admin</option>
              </select>
            </div>

            {/* Technologies */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Teknologi Digunakan *</label>
              <input
                type="text"
                required
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="cth: Next.js, TypeScript, Tailwind CSS, Prisma"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Durasi Pengerjaan *</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="cth: 3 Minggu"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Completion Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Tanggal Selesai *</label>
              <input
                type="date"
                required
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* Live Demo URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">URL Live Demo (Opsional)</label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>

            {/* GitHub URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">URL GitHub (Opsional)</label>
              <input
                type="url"
                value={formData.gitHubUrl}
                onChange={(e) => setFormData({ ...formData, gitHubUrl: e.target.value })}
                placeholder="https://github.com/org/repo"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase">Deskripsi Proyek *</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan fitur utama, tantangan yang diselesaikan, dan dampak proyek ini..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Main Image Upload */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <label className="text-xs font-bold text-slate-700 uppercase">Gambar Utama (Main Mockup) *</label>
            <div className="flex items-start gap-6">
              {formData.mainImage ? (
                <div className="relative w-40 h-28 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100">
                  <Image src={formData.mainImage} alt="Main" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mainImage: "" })}
                    className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mb-1" />
                  <span className="text-xs font-bold text-slate-600">
                    {uploadingMain ? "Mengunggah..." : "Klik untuk Pilih Gambar Utama"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WEBP maks 5MB</span>
                  <input type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Additional Images Upload */}
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <label className="text-xs font-bold text-slate-700 uppercase">Gambar Tambahan (Galeri)</label>
            <div className="flex flex-wrap gap-4 items-center">
              {formData.additionalImages.map((img, idx) => (
                <div key={idx} className="relative w-28 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image src={img} alt={`Extra ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExtraImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-md shadow"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <label className="flex flex-col items-center justify-center w-28 h-20 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-primary bg-slate-50/50 hover:bg-slate-50 transition-all">
                <Plus className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 mt-1">
                  {uploadingExtra ? "Upload..." : "Tambah"}
                </span>
                <input type="file" accept="image/*" onChange={handleAdditionalImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">
            <Link href="/admin/dashboard">
              <button
                type="button"
                className="px-6 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
              >
                Batal
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary/95 shadow-md shadow-primary/20 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan..." : "Simpan Portofolio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
