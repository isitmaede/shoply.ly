"use client";

import Head from "next/head";
import Link from "next/link";
import { Cairo } from "next/font/google";
import { motion } from "framer-motion";
import { Zap, Layout, Bell, CheckCircle, LogIn, UserPlus } from "lucide-react";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const AppName = "Shopyly";
const colors = {
  primary: "#6D28D9", // Deep violet
  secondary: "#EC4899", // Pink accent
  bg: "#FAFAFA",
  dark: "#111827",
};

// Base animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// HEADER
const Header = () => (
  <header
    className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100 ${cairo.className}`}
  >
    <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-extrabold text-gray-800 tracking-wide"
      >
        {AppName}
        <span className="text-pink-500">.ly</span>
      </Link>

      <div className="flex items-center space-x-5 space-x-reverse gap-3">
        <Link
          href="/login"
          className="flex items-center text-gray-700 hover:text-violet-700 font-medium transition"
        >
          <LogIn className="w-5 h-5 ml-2" />
          تسجيل دخول
        </Link>
        <Link
          href="/signup"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-transform hover:scale-105 flex items-center"
        >
          <UserPlus className="w-5 h-5 ml-2" />
          إنشاء متجر
        </Link>
      </div>
    </div>
  </header>
);

// HERO
const HeroSection = () => (
  <section
    className="relative pt-40 pb-32 overflow-hidden"
    style={{
      background:
        "radial-gradient(circle at 80% 20%, #FDECF5 0%, #F4EAFE 60%, #FAFAFA 100%)",
    }}
  >
    <div className="absolute inset-0">
      <div className="absolute w-72 h-72 bg-pink-400/20 rounded-full blur-3xl top-20 left-20"></div>
      <div className="absolute w-96 h-96 bg-violet-400/20 rounded-full blur-3xl bottom-0 right-0"></div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 relative z-10 items-center">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1
          className={`text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight ${cairo.className}`}
        >
          <span className="text-violet-700">منشور اليوم،</span>
          <br />
          <span className="text-pink-600">متجر الغد!</span>
        </h1>
        <p className="text-gray-600 text-xl mt-6 mb-10 leading-relaxed max-w-md">
          {AppName} يحول صفحتك إلى متجر إلكتروني متكامل في دقائق، بتصميم أنيق
          وإشعارات فورية لطلباتك.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 text-lg"
        >
          <Zap className="w-5 h-5 ml-2" />
          انطلق مجاناً
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex justify-center"
      >
        <div className="rounded-[40px] bg-white shadow-2xl border border-gray-100 p-6 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
          <div className="bg-gray-100 h-80 w-full rounded-3xl flex items-center justify-center border-4 border-pink-400">
            <p className="text-gray-500 italic text-center text-lg">
              معاينة واجهة المتجر الفاخرة
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// FEATURES
const FeaturesSection = () => (
  <section className="py-28 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2
        className={`text-4xl font-extrabold text-gray-900 mb-20 relative inline-block ${cairo.className}`}
      >
        الـ 3 مفاتيح لتجارتك الناجحة
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full"></span>
      </h2>

      <div className="grid md:grid-cols-3 gap-10 mt-16">
        {[
          {
            Icon: Bell,
            title: "إشعارات فورية",
            text: "تلقي الطلبات عبر Telegram و WhatsApp لتضمن عدم ضياع أي عميل.",
          },
          {
            Icon: Layout,
            title: "تصميم مذهل",
            text: "أنشئ متجرك عبر قوالب أنيقة بدون أي خبرة تقنية، واجهة تبهر الزائر.",
          },
          {
            Icon: CheckCircle,
            title: "إدارة ذكية",
            text: "تتبع المخزون تلقائياً، وأضف منتجاتك بكل سهولة واحتراف.",
          },
        ].map(({ Icon, title, text }, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="p-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-transform border border-violet-100"
          >
            <Icon className="w-12 h-12 text-violet-700 mb-6 mx-auto" />
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// FINAL CTA
const FinalCTA = () => (
  <section className="py-28 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-pink-600 to-violet-800 opacity-90"></div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative z-10 max-w-3xl mx-auto px-6 text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        متجرك التالي يبدأ هنا.
      </h2>
      <p className="text-lg mb-10 opacity-90">
        أطلق مشروعك اليوم، وتمتع بتجربة تسوّق لا مثيل لها لك ولعملائك.
      </p>
      <Link
        href="/signup"
        className="inline-flex bg-white text-violet-700 font-extrabold py-4 px-12 rounded-full shadow-xl transition-transform hover:scale-105 text-lg"
      >
        ابدأ مجاناً الآن
      </Link>
    </motion.div>
  </section>
);

// MAIN
const LandingPage = () => (
  <div className={cairo.className}>
    <Head>
      <title>{`أطلق متجرك الإلكتروني | ${AppName}`}</title>
    </Head>

    <Header />
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <FinalCTA />
    </main>

    <footer className="text-center py-6 text-gray-400 text-sm border-t bg-gray-900">
      © {new Date().getFullYear()} {AppName}. جمال التقنية في البساطة.
    </footer>
  </div>
);

export default LandingPage;
