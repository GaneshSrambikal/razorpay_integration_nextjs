'use client'
import { useState } from "react";
import ProductCard from "./Product/Cards/ProductCard/page";
import { Toaster } from "@/components/ui/toaster";
import Banner from "./Product/Banner";

export default function Home() {

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-slate-200">
        <ProductCard />
        <Toaster />
        <Banner />
    </main>
    </>
  );
}
