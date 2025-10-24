"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle } from "lucide-react";

import { supabase } from "@/lib/SupabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const colors = {
    primary: "#6D28D9",
    secondary: "#EC4899",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      // 2. تسجيل الخطأ الدقيق في الـ Console للمساعدة في التشخيص
      console.error("Supabase Login Error:", error.message);

      // رسالة توضيحية للمستخدم
      setErrorMsg(
        "خطأ في تسجيل الدخول. تأكد من صحة البريد الإلكتروني أو كلمة المرور، وربما لم يتم تأكيد الحساب."
      );
      setSuccess(false);
    } else {
      // 3. نجاح تسجيل الدخول
      setSuccess(true);
     
      setTimeout(() => {
        
        router.push("/home");
      }, 1000);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}
    >
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          تسجيل <span className="text-[#6D28D9]">الدخول</span>
        </h1>
        <p className="text-gray-500 mb-6">
          أهلاً بعودتك، أكمل الدخول إلى متجرك بسهولة.
        </p>

        <form className="flex flex-col gap-4 text-right" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full text-left focus:outline-none focus:border-[#6D28D9] transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl p-3 pl-10 w-full text-left focus:outline-none focus:border-[#6D28D9] transition-all"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`${
              loading ? "opacity-70 cursor-not-allowed" : ""
            } bg-[#6D28D9] text-white rounded-xl py-3 mt-2 hover:bg-[#7C3AED] transition-all flex justify-center items-center gap-2`}
          >
            {loading ? "جارٍ الدخول..." : "تسجيل الدخول"}
            {!loading && <LogIn size={18} />}
          </motion.button>
        </form>

        {success && (
          <motion.div
            className="mt-4 text-green-600 flex justify-center items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle size={18} />
            تم تسجيل الدخول بنجاح! جارٍ التحويل...
          </motion.div>
        )}

        {errorMsg && (
          <motion.div
            className="mt-4 text-red-500 flex justify-center items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={18} />
            {errorMsg}
          </motion.div>
        )}

        <p className="text-sm text-gray-400 mt-5">
          ليس لديك حساب؟{" "}
          <a href="/signup" className="text-[#6D28D9] hover:underline">
            إنشاء حساب جديد
          </a>
        </p>
      </motion.div>
    </div>
  );
}
