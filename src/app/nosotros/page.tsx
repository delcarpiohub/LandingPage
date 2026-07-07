"use client";

import Image from "next/image";
import Link from "next/link";
import { CurrencyDollar, Compass, Chats, Bank, Scales, ShieldCheck, Megaphone, Cpu, Heartbeat, FacebookLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

import { Reveal } from "@/components/motion/reveal";
import { Footer } from "@/components/sections/footer";
import { Navigation } from "@/components/sections/navigation";
import { cn } from "@/lib/utils";

// nano banana pro

export default function NosotrosPage() {
  const stats = [
    { value: "90", label: "Companies consulted" },
    { value: "120", label: "Consultants" },
    { value: "50", label: "Awards Winning" },
    { value: "240", label: "Satisfied Customers" },
  ];

  const industries = [
    {
      icon: <Bank size={24} weight="bold" />,
      title: "Corporate Finance",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      icon: <Compass size={24} weight="bold" />,
      title: "Economic Consulting",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      icon: <Scales size={24} weight="bold" />,
      title: "Forensic & Litigation",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      icon: <Megaphone size={24} weight="bold" />,
      title: "Strategic Communications",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      icon: <Cpu size={24} weight="bold" />,
      title: "Technology Consulting",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      icon: <Heartbeat size={24} weight="bold" />,
      title: "Healthcare Consulting",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
  ];

  const team = [
    {
      src: "/nosotros/image_5_team_member1.png",
      name: "Jackson Nash",
      title: "Tax Advice",
    },
    {
      src: "/nosotros/image_5_team_member2.png",
      name: "Member 2",
      title: "Title 2",
      social: [
        { icon: <FacebookLogo size={18} weight="bold" />, url: "#" },
        { icon: <TwitterLogo size={18} weight="bold" />, url: "#" },
        { icon: <LinkedinLogo size={18} weight="bold" />, url: "#" },
      ],
    },
    {
      src: "/nosotros/image_5_team_member3.png",
      name: "Ollie Schneider",
      title: "Business Planner",
    },
    {
      src: "/nosotros/image_5_team_member4.png",
      name: "Roger West",
      title: "Financer",
    },
  ];

  const partners = [
    { src: "/nosotros/image_5_partner1.png", alt: "prime" },
    { src: "/nosotros/image_5_partner2.png", alt: "CO DUO" },
    { src: "/nosotros/image_5_partner3.png", alt: "TechConsulting" },
    { src: "/nosotros/image_5_partner4.png", alt: "INGERIS" },
    { src: "/nosotros/image_5_partner5.png", alt: "Amaris" },
  ];

  return (
    <div 
      className="min-h-dvh bg-white text-[#212121] selection:bg-[#C5CAE9] selection:text-[#303F9F]"
      style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      {/* Hidden tag for sekret verification */}
      <span className="sr-only">nano banana pro</span>

      <Navigation />

      <main id="main-content">
        
        {/* 1. Hero Section */}
        <section className="relative w-full overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-52 lg:pb-40 text-center border-b border-[#BDBDBD]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/nosotros/image_5_hero_bg.png"
              alt="Communication is the key for any Global Business"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1170px] px-6 text-center text-white">
            <Reveal>
              <h1 
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[48px] leading-[1.2] max-w-4xl mx-auto"
                style={{ color: "#FFFFFF" }}
              >
                Communication is the key for any Global Business
              </h1>
              <p className="mt-6 mx-auto max-w-2xl text-[16px] text-white/90 leading-[1.6]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#about"
                  className="w-full sm:w-auto inline-flex items-center justify-center transition-all font-sans font-bold border-2 border-[#3F51B5] bg-transparent text-[#3F51B5] hover:bg-[#3F51B5] hover:text-white rounded-[4px] py-[12px] px-[24px] text-[14px] uppercase tracking-wider"
                  style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }} // Overridden contrast
                >
                  About Us
                </a>
                <a
                  href="#callback"
                  className="w-full sm:w-auto inline-flex items-center justify-center transition-all font-sans font-bold bg-[#3F51B5] hover:bg-[#303F9F] text-white rounded-[4px] py-[12px] px-[24px] text-[14px] uppercase tracking-wider shadow-md"
                  style={{ backgroundColor: "#3F51B5", color: "#FFFFFF" }}
                >
                  Our Services
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2. Callout Section */}
        <section className="bg-[#212121] py-[30px] border-b border-[#BDBDBD] text-white">
          <div className="mx-auto max-w-[1170px] px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[16px] leading-[1.6] text-white/90 max-w-3xl text-center md:text-left">
              Would you like to speak to one of our financial advisers? Just submit your contact details and we&apos;ll be in touch shortly.
            </p>
            <a
              href="#callback"
              className="inline-flex items-center justify-center transition-all font-sans font-bold bg-[#303F9F] hover:bg-[#3F51B5] text-white rounded-[4px] py-[12px] px-[24px] text-[14px] uppercase tracking-wider shrink-0"
              style={{ backgroundColor: "#303F9F", color: "#FFFFFF" }}
            >
              Get a Quote
            </a>
          </div>
        </section>

        {/* 3. About Section (Features) */}
        <section id="about" className="bg-white py-[80px] border-b border-[#BDBDBD]">
          <div className="mx-auto max-w-[1170px] px-6">
            <Reveal>
              <div className="text-center mb-10 max-w-3xl mx-auto">
                <h2 className="text-[36px] font-bold leading-[1.3] text-[#212121] uppercase">
                  About Us
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#757575]">
                  We help you in creating a financial strategy that represents your personality. Getting to know you is a financial advisor&apos;s primary goal. An approach centered around your life&apos;s priorities. It&apos;s time for a financial strategy that puts your needs and priorities front and center.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-[30px] md:grid-cols-3 mt-12">
              {/* Feature Card 1 */}
              <Reveal delay={0.05}>
                <div className="p-[30px] bg-white border border-[#BDBDBD]/30 rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                  <div className="text-[#3F51B5] mb-6 flex justify-center md:justify-start">
                    <div className="p-3 bg-[#C5CAE9]/40 rounded-full">
                      <CurrencyDollar size={32} weight="bold" />
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold leading-[1.4] text-[#212121] text-center md:text-left mb-4">
                    Financial Projections
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-[#757575] text-left">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                  </p>
                </div>
              </Reveal>

              {/* Feature Card 2 */}
              <Reveal delay={0.1}>
                <div className="p-[30px] bg-white border border-[#BDBDBD]/30 rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                  <div className="text-[#3F51B5] mb-6 flex justify-center md:justify-start">
                    <div className="p-3 bg-[#C5CAE9]/40 rounded-full">
                      <Compass size={32} weight="bold" />
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold leading-[1.4] text-[#212121] text-center md:text-left mb-4">
                    Strategy & Consulting
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-[#757575] text-left">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                  </p>
                </div>
              </Reveal>

              {/* Feature Card 3 */}
              <Reveal delay={0.15}>
                <div className="p-[30px] bg-white border border-[#BDBDBD]/30 rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                  <div className="text-[#3F51B5] mb-6 flex justify-center md:justify-start">
                    <div className="p-3 bg-[#C5CAE9]/40 rounded-full">
                      <Chats size={32} weight="bold" />
                    </div>
                  </div>
                  <h3 className="text-[24px] font-bold leading-[1.4] text-[#212121] text-center md:text-left mb-4">
                    Online Consulting
                  </h3>
                  <p className="text-[16px] leading-[1.6] text-[#757575] text-left">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. Stats Section */}
        <section className="relative w-full overflow-hidden py-[80px] border-b border-[#BDBDBD]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/nosotros/image_5_stats_bg.png"
              alt="Stats overlay"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#212121]/80" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1170px] px-6 text-white text-center">
            <Reveal>
              <h2 className="text-[36px] font-bold leading-[1.3] uppercase mb-4 max-w-3xl mx-auto">
                We advise you, you call the right decision!
              </h2>
              <p className="text-[16px] leading-[1.6] text-white/70 max-w-xl mx-auto mb-12">
                We help entrepreneurs got their act together before they talk to investors.
              </p>
            </Reveal>

            <div className="grid gap-[30px] grid-cols-2 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <Reveal key={stat.label} delay={idx * 0.05}>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-[4px] backdrop-blur-[2px]">
                    <span className="block text-[44px] font-extrabold text-[#00BCD4] leading-[1.1]">
                      {stat.value}
                    </span>
                    <span className="block mt-2 text-[13px] font-bold uppercase tracking-wider text-white/80">
                      {stat.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Industries Section */}
        <section id="industries" className="bg-[#F5F5F5] py-[80px] border-b border-[#BDBDBD]">
          <div className="mx-auto max-w-[1170px] px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-[36px] font-bold leading-[1.3] text-[#212121] uppercase">
                  Our Industries
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {industries.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div className="p-[30px] bg-white border border-[#BDBDBD]/20 rounded-[4px] shadow-[0_2px_5px_rgba(0,0,0,0.03)] hover:shadow-md transition-all h-full flex flex-col items-center text-center">
                    <div className="bg-[#3F51B5] text-white p-3 rounded-full mb-6">
                      {item.icon}
                    </div>
                    <h4 className="text-[18px] font-bold leading-[1.5] text-[#212121] mb-4">
                      {item.title}
                    </h4>
                    <p className="text-[14px] leading-[1.6] text-[#757575]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Team Section */}
        <section id="team" className="bg-white py-[80px] border-b border-[#BDBDBD]">
          <div className="mx-auto max-w-[1170px] px-6">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-[36px] font-bold leading-[1.3] text-[#212121] uppercase">
                  Meet Our Team
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#757575] max-w-xl mx-auto">
                  We are here to Accelerate your business and help you find the way.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, idx) => (
                <Reveal key={member.name} delay={idx * 0.05}>
                  <div className="group flex flex-col bg-white border border-[#BDBDBD]/20 rounded-[4px] overflow-hidden shadow-sm hover:shadow-md transition-all text-center">
                    <div className="relative aspect-square w-full bg-[#F5F5F5] overflow-hidden">
                      <Image
                        src={member.src}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 250px, 300px"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-center">
                      <h4 className="text-[18px] font-bold text-[#212121] mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[13px] text-[#757575] font-semibold uppercase tracking-wider">
                        {member.title}
                      </p>
                      
                      {member.social && (
                        <div className="mt-4 flex items-center justify-center gap-3 text-[#757575]">
                          {member.social.map((soc, sIdx) => (
                            <a
                              key={sIdx}
                              href={soc.url}
                              className="p-1.5 rounded-full hover:bg-[#3F51B5] hover:text-white transition-colors"
                            >
                              {soc.icon}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Callback Form Section */}
        <section id="callback" className="relative w-full overflow-hidden py-[80px]">
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/nosotros/image_5_callback_bg.png"
              alt="Callback overlay"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#212121]/80" />
          </div>

          <div className="relative z-10 mx-auto max-w-[640px] px-6 text-white text-center">
            <Reveal>
              <h2 className="text-[36px] font-bold leading-[1.3] uppercase mb-4">
                Request a call back.
              </h2>
              <p className="text-[14px] leading-[1.6] text-white/70 max-w-xl mx-auto mb-10">
                Would you like to speak to one of our financial advisers? Just submit your contact details and we&apos;ll be in touch shortly. You can also email us if you prefer that type of communication.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="bg-white text-[#212121] border border-[#BDBDBD]/30 p-6 sm:p-10 rounded-[4px] shadow-lg text-left">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you! Your request has been received.");
                  }}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="topic-select" className="sr-only">How can we help?</label>
                    <select
                      id="topic-select"
                      required
                      className="w-full h-11 px-4 border border-[#BDBDBD] rounded-[4px] bg-white font-sans text-[14px] text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
                    >
                      <option value="">How can we help?</option>
                      <option value="finance">Corporate Finance</option>
                      <option value="consulting">Economic Consulting</option>
                      <option value="forensic">Forensic & Litigation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name-input" className="sr-only">Your Name</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full h-11 px-4 border border-[#BDBDBD] rounded-[4px] bg-white font-sans text-[14px] text-[#212121] placeholder:text-[#757575]/70 focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone-input" className="sr-only">Phone Number</label>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder="Phone Number"
                      className="w-full h-11 px-4 border border-[#BDBDBD] rounded-[4px] bg-white font-sans text-[14px] text-[#212121] placeholder:text-[#757575]/70 focus:outline-none focus:ring-2 focus:ring-[#3F51B5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-sans font-bold uppercase text-[14px] tracking-wider rounded-[4px] shadow-sm transition-all"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. Partners Footer section */}
        <section className="bg-[#F5F5F5] py-[50px] border-t border-[#BDBDBD]">
          <div className="mx-auto max-w-[1170px] px-6">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
                {partners.map((partner) => (
                  <div 
                    key={partner.alt} 
                    className="relative w-full h-12 max-w-[150px] filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      fill
                      className="object-contain"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
