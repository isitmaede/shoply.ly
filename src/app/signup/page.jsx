"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SupabaseClient"; 
export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const colors = {
    primary: "#6D28D9",
    secondary: "#EC4899",
  };

  const validateForm = () => {
    const newErrors = {};

    // تحقق من اسم المتجر
    if (!formData.storeName.trim()) {
      newErrors.storeName = "اسم المتجر مطلوب";
    } else if (!/^[\u0600-\u06FFa-zA-Z0-9\s-_]{3,20}$/.test(formData.storeName)) {
      newErrors.storeName = "الاسم يجب أن يكون من 3-20 حرفًا بدون رموز غريبة";
    }

    // تحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا";
    }

    // تحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } 

    // تأكيد كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const { email, password } = formData;

      // التسجيل عبر Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            store_name: formData.storeName,
          },
        },
      });

      if (error) throw error;

      console.log("تم التسجيل:", data);
      setSuccess(true);

      // التوجيه إلى صفحة home بعد التسجيل
      router.push("/home");
    } catch (err) {
      setErrors({ general: err.message || "حدث خطأ أثناء التسجيل" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
          انشئ <span className="text-[#6D28D9]">متجرك</span> الآن
        </h1>
        <p className="text-gray-500 mb-6">
          أطلق متجرك الإلكتروني بسهولة وابدأ البيع في دقائق.
        </p>

        <form className="flex flex-col gap-4 text-right" onSubmit={handleSubmit}>
          {/* اسم المتجر */}
          <div className="relative">
            <Store className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              name="storeName"
              placeholder="اسم المتجر"
              value={formData.storeName}
              onChange={handleChange}
              className={`border ${
                errors.storeName ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 pl-10 w-full focus:outline-none focus:border-[#6D28D9] transition-all`}
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="بريدك الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              className={`border ${
                errors.email ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 pl-10 w-full focus:outline-none focus:border-[#6D28D9] transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleChange}
              className={`border ${
                errors.password ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 pl-10 w-full focus:outline-none focus:border-[#6D28D9] transition-all`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 pl-10 w-full focus:outline-none focus:border-[#6D28D9] transition-all`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* زر الإرسال */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-[#6D28D9] hover:bg-[#7C3AED]"
            } text-white rounded-xl py-3 mt-2 transition-all flex justify-center items-center gap-2`}
          >
            {loading ? "جارٍ التسجيل..." : "ابدأ الآن"}
            {!loading && <CheckCircle size={18} />}
          </motion.button>
        </form>

        {/* رسائل الحالة */}
        {errors.general && (
          <motion.div
            className="mt-4 text-red-500 flex justify-center items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={18} />
            {errors.general}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="mt-4 text-green-600 flex justify-center items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle size={18} />
            تم التسجيل بنجاح!
          </motion.div>
        )}

        <p className="text-sm text-gray-400 mt-5">
          لديك حساب؟{" "}
          <a href="/login" className="text-[#6D28D9] hover:underline">
            تسجيل الدخول
          </a>
        </p>
      </motion.div>
    </div>
  );
}
