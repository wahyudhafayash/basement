"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { BsArrowRight } from "react-icons/bs";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background flex flex-col justify-center items-center">
      {/* Background Lines from Aceternity UI */}
      <BackgroundLines className="absolute inset-0 z-0">
        <div className="hidden" />
      </BackgroundLines>

      {/* Subtle Radial Gradient for premium depth in light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Studio Web & Aplikasi Premium
          </motion.div>

          {/* Main Heading with Elegant Gradients */}
          <motion.h1
            variants={itemVariants}
            className="text-[40px] sm:text-[60px] md:text-[80px] font-black tracking-tight leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/60 max-w-4xl"
          >
            Membangun Produk Digital <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-600">
              Yang Menghasilkan Klien
            </span>
          </motion.h1>

          {/* Engaging Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-md sm:text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed font-medium"
          >
            Mulai dari landing page konversi tinggi hingga sistem kustom skala bisnis. Kami merekayasa website premium super cepat, responsif, dan siap melipatgandakan kredibilitas usaha Anda.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link href="/order" passHref className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-6 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.25)] transition-all duration-300 hover:shadow-[0_4px_30px_rgba(99,102,241,0.4)]"
              >
                Pesan Jasa Sekarang
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/portfolio" passHref className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full border-border/80 hover:bg-black/5 font-bold px-8 py-6 flex items-center justify-center gap-2 transition-all duration-300"
              >
                Lihat Portofolio
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle indicator for scrolling down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none opacity-40 sm:opacity-70">
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-black">Gulir ke Bawah</span>
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-muted-foreground to-transparent animate-bounce" />
      </div>
    </div>
  );
};

export default Hero;
