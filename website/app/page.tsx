import type { Metadata } from "next";

import About from "./_components/about";
import Contact from "./_components/contact";
import Hero from "./_components/hero";
import Products from "./_components/products";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Contact />
    </>
  );
}
