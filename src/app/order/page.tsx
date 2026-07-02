"use client"
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Phone, Building2, Layers, CheckSquare, Calendar, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";

const availablePackages: Record<string, string[]> = {
  Website: [
    "Landing Page",
    "Company Profile",
    "Portfolio Website",
    "Custom Website",
    "E-Commerce",
    "Dashboard Admin",
  ],
  "Mobile Application": ["Android", "iOS", "Cross Platform"],
  "Custom Software": ["API Integration", "Database System", "SaaS Platform"],
};

const additionalServiceOptions = [
  "UI/UX Design",
  "Logo Design",
  "SEO Optimization",
  "Website Maintenance",
  "Hosting Setup",
  "Domain Registration",
  "Copywriting",
  "CMS Integration",
  "Payment Gateway",
  "API Integration",
];

const budgetOptions = [
  "< Rp 1 Juta",
  "Rp 1 - 3 Juta",
  "Rp 3 - 5 Juta",
  "Rp 5 - 10 Juta",
  "> Rp 10 Juta",
];

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    businessName: "",
    businessType: "E-Commerce / Perdagangan",
    projectType: "Website",
    selectedPackage: "Company Profile",
    additionalServices: [] as string[],
    projectDescription: "",
    estimatedBudget: "Rp 1 - 3 Juta",
    targetCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    additionalNotes: "",
  });

  // Preselect package if passed in URL
  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg) {
      setFormData((prev) => ({
        ...prev,
        selectedPackage: pkg,
      }));
    }
  }, [searchParams]);

  const handleProjectTypeChange = (type: string) => {
    const defaultPkg = availablePackages[type]?.[0] || "";
    setFormData((prev) => ({
      ...prev,
      projectType: type,
      selectedPackage: defaultPkg,
    }));
  };

  const toggleAdditionalService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.additionalServices.includes(service);
      const updated = exists
        ? prev.additionalServices.filter((s) => s !== service)
        : [...prev.additionalServices, service];
      return { ...prev, additionalServices: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal memproses pesanan.");
      }

      router.push(`/order/success?id=${data.orderId}`);
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
    <div className="bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
            Formulir Pemesanan Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Formulir Pemesanan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Jasa Digital
            </span>
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            Lengkapi detail kebutuhan proyek Anda. Proposal resmi PDF akan dibuat secara otomatis setelah pemesanan dikirim.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10">
          {/* Section 1: Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                1
              </div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Informasi Personal
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nama Lengkap *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="cth: Budi Santoso"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Email Resmi *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="cth: budi@perusahaan.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Nomor WhatsApp *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="cth: 081234567890"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Business Information */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                2
              </div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" /> Informasi Bisnis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nama Bisnis / Usaha *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="cth: PT Sinar Jaya E-Commerce"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Jenis / Bidang Bisnis *</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                >
                  <option value="E-Commerce / Perdagangan">E-Commerce / Perdagangan</option>
                  <option value="Jasa Professional / Konsultan">Jasa Professional / Konsultan</option>
                  <option value="UMKM / Toko Lokal">UMKM / Toko Lokal</option>
                  <option value="Teknologi & Startup">Teknologi & Startup</option>
                  <option value="Pendidikan / Edutech">Pendidikan / Edutech</option>
                  <option value="Kesehatan / Healthcare">Kesehatan / Healthcare</option>
                  <option value="Personal Branding">Personal Branding</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Project & Package */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                3
              </div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Pilihan Layanan & Paket
              </h2>
            </div>

            <div className="space-y-6">
              {/* Project Type Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipe Proyek *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(availablePackages).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleProjectTypeChange(type)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        formData.projectType === type
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Paket Pilihan *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {availablePackages[formData.projectType]?.map((pkg) => (
                    <button
                      type="button"
                      key={pkg}
                      onClick={() => setFormData({ ...formData, selectedPackage: pkg })}
                      className={`p-3.5 rounded-xl text-xs font-bold border text-left transition-all ${
                        formData.selectedPackage === pkg
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Services Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 uppercase">Layanan Tambahan (Opsional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {additionalServiceOptions.map((service) => {
                    const isChecked = formData.additionalServices.includes(service);
                    return (
                      <div
                        key={service}
                        onClick={() => toggleAdditionalService(service)}
                        className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-center gap-2.5 ${
                          isChecked
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <CheckSquare className={`w-4 h-4 ${isChecked ? "text-primary" : "text-slate-300"}`} />
                        <span>{service}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Project Details & Questions */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                4
              </div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Detail & Estimasi Proyek
              </h2>
            </div>

            <div className="space-y-6">
              {/* Project Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Deskripsi Kebutuhan Proyek *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Jelaskan tujuan website, referensi contoh tampilan, atau fitur utama yang diinginkan..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Estimated Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-primary" /> Estimasi Budget *
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Completion Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> Target Tanggal Selesai *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.targetCompletion}
                    onChange={(e) => setFormData({ ...formData, targetCompletion: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Catatan Tambahan (Opsional)</label>
                <textarea
                  rows={2}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Instruksi khusus, batasan waktu, atau pertanyaan awal..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Data Anda aman & proposal resmi PDF dibuat otomatis.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold text-xs rounded-full hover:bg-primary/95 shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Memproses Pemesanan..." : "Kirim Pemesanan & Buat Proposal"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center text-xs font-bold text-slate-400">Memuat Formulir...</div>}>
      <OrderFormContent />
    </Suspense>
  );
}
