const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial portfolios...");

  await prisma.portfolio.createMany({
    data: [
      {
        title: "Apex Finance Dashboard",
        clientName: "PT Apex Finansial Indonesia",
        category: "SaaS & App",
        description: "Dashboard analisis keuangan real-time dengan integrasi charts interaktif, sistem manajemen transaksi, dan arsitektur cloud tingkat tinggi.",
        technologies: "Next.js, TypeScript, Tailwind CSS, Prisma, Chart.js",
        mainImage: "/images/heroBackground.jpg",
        additionalImages: JSON.stringify(["/images/heroBackground.jpg"]),
        duration: "4 Minggu",
        completionDate: new Date("2026-05-15"),
        liveDemoUrl: "https://apexfinance.example.com",
        gitHubUrl: "https://github.com/basementco/apex-finance",
      },
      {
        title: "EcoEarth E-Commerce Platform",
        clientName: "EcoEarth Global",
        category: "E-Commerce",
        description: "Platform e-commerce ramah lingkungan dengan sistem katalog cepat, otomatisasi pembayaran payment gateway, dan optimasi performa Core Web Vitals 100%.",
        technologies: "React, Next.js, Stripe API, Tailwind CSS, SQLite",
        mainImage: "/images/heroBackground.jpg",
        additionalImages: JSON.stringify([]),
        duration: "3 Minggu",
        completionDate: new Date("2026-06-01"),
        liveDemoUrl: "https://ecoearth.example.com",
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
