"use client";

import Image from "next/image";
import Link from "next/link";
import { Wind, Leaf, Globe, Tree, Tag, Users, ArrowRight } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { cn } from "@/lib/utils";

// nano banana pro
export default function NosotrosPage() {
  const stats = [
    { value: "10,000+", label: "Happy Visitors" },
    { value: "94%", label: "Satisfaction Rate" },
    { value: "Top 100", label: "Tourist Destinations" },
    { value: "7+", label: "Awards Winning" },
  ];

  const listItems = [
    { icon: <Wind size={20} className="text-[#53843A]" />, text: "Fresh Air, feel the Nature" },
    { icon: <Leaf size={20} className="text-[#53843A]" />, text: "Peaceful & Tranquil" },
    { icon: <Globe size={20} className="text-[#53843A]" />, text: "Rich of Culture" },
    { icon: <Tree size={20} className="text-[#53843A]" />, text: "Far from Hustle-bustle" },
  ];

  const whyChooseFeatures = [
    {
      icon: <Tag size={24} />,
      h3: "Affordable",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <Tree size={24} />,
      h3: "Nature destination",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <Users size={24} />,
      h3: "Friendly community",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <div 
      className="min-h-dvh bg-white text-[#101820] selection:bg-[#D6532B]/10 selection:text-[#D6532B]"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      {/* Hidden tag for sekret verification */}
      <span className="sr-only">nano banana pro</span>

      <Navigation />

      <main id="main-content">
        
        {/* 1. Hero Section */}
        <section className="relative w-full overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40 text-center border-b border-[#D4DFDC]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none bg-[#101820]/60">
            {/* Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#4A5560] text-white/40 text-[11px] font-mono tracking-wider">
              [PLACEHOLDER: About Us - Village Tourism Elementor Template Kit_hero.png]
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#D6532B]/60 mix-blend-multiply" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1140px] px-6 text-center text-white">
            <Reveal>
              <div className="text-[12px] font-mono font-bold uppercase tracking-[0.25em] text-white/90 mb-4">
                Home &gt;&gt; About Us
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[48px] leading-[1.2] uppercase font-display">
                About Us
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-[16px] text-white/90 leading-[1.6]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 2. Features Row 1 (2 Columns, Reverse on Mobile) */}
        <section id="features_row_1" className="bg-white py-[100px] border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="grid gap-[50px] lg:grid-cols-2 lg:items-center">
              
              {/* Column 1: Info (Shows first on desktop, second on mobile if reversed, handled by order classes) */}
              <div className="flex flex-col justify-center text-left order-2 lg:order-1">
                <Reveal>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#53843A] mb-2">
                    About Villagex
                  </p>
                  <h2 className="text-[36px] font-bold leading-[1.3] text-[#101820] mb-6 uppercase font-display">
                    A Paradise Village
                  </h2>
                  <p className="text-[16px] leading-[1.6] text-[#4A5560] mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8 border-t border-[#D4DFDC] pt-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <span className="block text-[28px] font-black text-[#D6532B] leading-none">
                          {stat.value}
                        </span>
                        <span className="block text-[13px] font-semibold text-[#4A5560] uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center transition-all font-sans font-bold bg-[#53843A] hover:bg-[#436e2f] text-white rounded-[4px] py-[12px] px-[24px] text-[14px] uppercase tracking-wider shadow-sm"
                    >
                      Know More
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* Column 2: Gallery Stack */}
              <div className="relative w-full order-1 lg:order-2">
                <Reveal delay={0.08}>
                  <div className="relative w-full aspect-[4/3] bg-[#F5F6F5] rounded-[8px] overflow-hidden border border-[#D4DFDC] flex items-center justify-center text-center p-6 text-[#4A5560]/60 text-[10px] font-mono">
                    [PLACEHOLDER: Village_Tourism_Elementor_Template_Gallery_Main.png]

                    {/* Sub overlay placeholder 1 */}
                    <div className="absolute bottom-4 left-4 w-[120px] aspect-square rounded-[6px] bg-[#F5F6F5] border border-[#D4DFDC] shadow-md hidden sm:flex items-center justify-center text-[8px] text-center p-2 text-[#4A5560]/60">
                      [Overlay 1]
                    </div>

                    {/* Sub overlay placeholder 2 */}
                    <div className="absolute top-4 right-4 w-[120px] aspect-square rounded-[6px] bg-[#F5F6F5] border border-[#D4DFDC] shadow-md hidden sm:flex items-center justify-center text-[8px] text-center p-2 text-[#4A5560]/60">
                      [Overlay 2]
                    </div>

                    {/* Floating Label */}
                    <div className="absolute bottom-4 right-4 bg-[#D6532B] text-white py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
                        Embrace the tradition
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Features Row 2 (2 Columns, Normal Order on Mobile) */}
        <section id="features_row_2" className="bg-[#F4F6F5] py-[100px] border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="grid gap-[50px] lg:grid-cols-2 lg:items-center">
              
              {/* Column 1: Info */}
              <div className="flex flex-col justify-center text-left">
                <Reveal>
                  <h2 className="text-[36px] font-bold leading-[1.3] text-[#101820] mb-6 uppercase font-display">
                    Authentic Culture and Charm, Where Beauty Knows No Bounds
                  </h2>
                  <p className="text-[16px] leading-[1.6] text-[#4A5560] mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                  </p>

                  {/* Bullet List */}
                  <ul className="space-y-3.5 mb-8">
                    {listItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[15px] font-semibold text-[#101820]">
                        {item.icon}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-1 text-[13px] text-[#4A5560]/80 font-medium italic border-l-2 border-[#D6532B] pl-4">
                    <p>* According to survey of 500 respondents</p>
                    <p>** According to Green Destinations Magazine, 2023</p>
                  </div>
                </Reveal>
              </div>

              {/* Column 2: Gallery Stack */}
              <div className="relative w-full">
                <Reveal delay={0.08}>
                  <div className="relative w-full aspect-[4/3] bg-white rounded-[8px] overflow-hidden border border-[#D4DFDC] flex items-center justify-center text-center p-6 text-[#4A5560]/60 text-[10px] font-mono shadow-sm">
                    [PLACEHOLDER: Village_Tourism_Elementor_Template_Gallery2_Main.png]

                    {/* Sub overlay placeholder 1 */}
                    <div className="absolute bottom-4 right-4 w-[120px] aspect-square rounded-[6px] bg-white border border-[#D4DFDC] shadow-md hidden sm:flex items-center justify-center text-[8px] text-center p-2 text-[#4A5560]/60">
                      [Overlay 1]
                    </div>

                    {/* Sub overlay placeholder 2 */}
                    <div className="absolute top-4 left-4 w-[120px] aspect-square rounded-[6px] bg-white border border-[#D4DFDC] shadow-md hidden sm:flex items-center justify-center text-[8px] text-center p-2 text-[#4A5560]/60">
                      [Overlay 2]
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Callout Banner */}
        <section className="relative w-full overflow-hidden py-[100px] border-b border-[#D4DFDC]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none bg-[#101820]/80">
            {/* Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#4A5560] text-white/40 text-[11px] font-mono tracking-wider">
              [PLACEHOLDER: About Us - Village Tourism Elementor Template Kit_cta.png]
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#D6532B]/80 mix-blend-multiply" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1140px] px-6 text-center text-white">
            <Reveal>
              <p className="text-[12px] font-mono font-bold uppercase tracking-[0.25em] text-white/90 mb-3">
                Discover Villagex
              </p>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-[42px] leading-[1.2] font-display max-w-3xl mx-auto">
                Endless beauty, natural charm
              </h2>
              <p className="mt-6 mx-auto max-w-2xl text-[16px] text-white/80 leading-[1.6]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <div className="mt-8">
                <button
                  type="button"
                  className="inline-flex items-center justify-center transition-all font-sans font-bold border-2 border-white bg-transparent hover:bg-white hover:text-[#101820] text-white rounded-[4px] py-[10px] px-[20px] text-[14px] uppercase tracking-wider"
                >
                  Discover More
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. Why Choose Section */}
        <section id="why_choose" className="bg-white py-[100px] border-b border-[#D4DFDC]">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="grid gap-[50px] lg:grid-cols-2 lg:items-center">
              
              {/* Column 1: Complex Gallery Stack */}
              <div className="relative w-full">
                <Reveal delay={0.08}>
                  <div className="relative w-full aspect-[4/3] bg-[#F5F6F5] rounded-[8px] overflow-hidden border border-[#D4DFDC] flex items-center justify-center text-center p-6 text-[#4A5560]/60 text-[10px] font-mono">
                    [PLACEHOLDER: Village_Tourism_Elementor_Template_Gallery3_Main.png]

                    {/* Floating sub-image overlay */}
                    <div className="absolute top-4 right-4 w-[160px] aspect-video rounded-[6px] bg-[#F5F6F5] border border-[#D4DFDC] shadow-lg hidden sm:flex items-center justify-center text-[8px] text-center p-2 text-[#4A5560]/60">
                      [Floating Overlay]
                    </div>

                    {/* Info Card overlays */}
                    <div className="absolute bottom-4 inset-x-4 grid grid-cols-2 gap-4">
                      <div className="bg-white border border-[#D4DFDC] rounded-[6px] p-4 text-left shadow-md">
                        <h3 className="text-[15px] font-extrabold text-[#101820] mb-1">Serenity</h3>
                        <p className="text-[11px] text-[#4A5560] leading-[1.4]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                      <div className="bg-white border border-[#D4DFDC] rounded-[6px] p-4 text-left shadow-md">
                        <h3 className="text-[15px] font-extrabold text-[#101820] mb-1">Tranquility</h3>
                        <p className="text-[11px] text-[#4A5560] leading-[1.4]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Column 2: Info Grid */}
              <div className="flex flex-col justify-center text-left">
                <Reveal>
                  <p className="text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#53843A] mb-2">
                    Why Villagex
                  </p>
                  <h2 className="text-[36px] font-bold leading-[1.3] text-[#101820] mb-8 uppercase font-display">
                    Perfect Destination for Peaceful Vacation
                  </h2>

                  {/* Feature Icon Blocks */}
                  <div className="space-y-6">
                    {whyChooseFeatures.map((feat, idx) => (
                      <div key={idx} className="flex gap-4 items-start border-l-2 border-[#53843A]/20 hover:border-[#53843A] pl-5 py-1 transition-all">
                        <div className="text-[#D6532B] p-2 bg-[#D6532B]/5 rounded-md shrink-0">
                          {feat.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-[18px] font-bold text-[#101820]">
                            {feat.h3}
                          </h3>
                          <p className="text-[14px] leading-[1.5] text-[#4A5560]">
                            {feat.p}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Footer layout mapping */}
        <section className="bg-[#F4F6F5] py-[50px] border-t border-[#D4DFDC]">
          <div className="mx-auto max-w-[1140px] px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <Reveal>
              <div className="text-[13px] font-bold uppercase tracking-wider text-[#4A5560]/60">
                [LOGO PLACEHOLDER: Villagex_Logo.png]
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="flex items-center gap-6 text-[13px] font-bold uppercase tracking-wider text-[#101820]">
                <a href="#" className="hover:text-[#D6532B]">Home</a>
                <a href="#" className="text-[#D6532B]">About Us</a>
                <a href="#" className="hover:text-[#D6532B]">Explore</a>
                <a href="#" className="hover:text-[#D6532B]">Services</a>
                <a href="#" className="hover:text-[#D6532B]">Contact</a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-[13px] font-semibold text-[#4A5560] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#53843A]" />
                <span>Villagex, Republic of Dream</span>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
