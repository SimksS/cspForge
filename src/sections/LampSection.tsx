"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
 
export default function LampSection({ title }: { title: string }) {
  return (
    <LampContainer>
      <motion.h2
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
       {title}
      </motion.h2>
    </LampContainer>
  );
}
