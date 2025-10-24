"use client";

import { useState, useEffect, useMemo } from "react";
import { X, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight, Store, Phone, ListChecks, Loader2 } from "lucide-react";
import { supabase } from "@/lib/SupabaseClient";

import { useRouter } from "next/navigation";




export default function CreateStorePage() {
  const router = useRouter()
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storename: "",
    slogan: "",
    whatsapp: "",
    email: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const totalSteps = 3;
  const steps = [
    { id: 1, title: "المعلومات العامة", icon: Store },
    { id: 2, title: "تفاصيل التواصل", icon: Phone },
    { id: 3, title: "تأكيد وإنشاء", icon: ListChecks },
  ];

  // جلب userId عند تحميل الصفحة
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Auth error:", error);
        setNotification({ type: 'error', message: "حدث خطأ أثناء التحقق من المستخدم." });
        return;
      }
      if (!data.user) {
        setNotification({ type: 'error', message: "يجب تسجيل الدخول لإنشاء متجر." });
        return;
      }
      setUserId(data.user.id);
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setNotification(null);
  };

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return form.storename.trim() !== "" && form.slogan.trim() !== "";
      case 2:
        const whatsappRegex = /^\+?[0-9\s-]{8,}$/;
        return form.city.trim() !== "" && whatsappRegex.test(form.whatsapp.trim());
      default:
        return true;
    }
  }, [step, form]);

  const handleNext = () => {
    if (isStepValid) setStep(step + 1);
    else setNotification({ type: 'error', message: "الرجاء ملء جميع الحقول المطلوبة بشكل صحيح قبل المتابعة." });
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!userId) {
      setNotification({ type: 'error', message: "المستخدم غير مسجّل دخول." });
      return;
    }

    if (!isStepValid) {
      setNotification({ type: 'error', message: "الرجاء مراجعة جميع الحقول المطلوبة." });
      return;
    }

    setLoading(true);
    setNotification(null);

    const { error } = await supabase
      .from("stores")
      .insert([{ ...form, user_id: userId, created_at: new Date().toISOString() }]);

    setLoading(false);

    if (!error) {
      setNotification({ type: 'success', message: "تم إعداد متجرك بنجاح." });
      router.push('/home/my-store')
    } else {
      setNotification({ type: 'error', message: `فشل الإعداد: ${error.message || "حدث خطأ في قاعدة البيانات."}` });
      console.error("Supabase Error:", error);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-600 font-bold text-lg">يجب تسجيل الدخول لإنشاء متجر.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b pb-2">معالج إعداد المتجر</h1>
        <p className="text-gray-500 mb-8">خطوات سريعة لإنشاء متجرك الإلكتروني. البيانات الأساسية مطلوبة.</p>

        {/* شريط التقدم */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((s) => {
              const isActive = s.id === step;
              const isCompleted = s.id < step;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isCompleted ? 'bg-indigo-600 text-white shadow-md' : isActive ? 'bg-indigo-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <p className={`text-xs mt-2 font-semibold ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>{s.title}</p>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-500 ease-in-out" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        {notification && (
          <div className={`p-4 rounded-xl mb-6 flex items-start font-medium border-2 ${notification.type === 'success' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700'}`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5 ml-3 mt-1 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 ml-3 mt-1 flex-shrink-0" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        )}

        {/* محتوى الخطوة */}
        <div className="min-h-[250px] p-4 border border-gray-200 rounded-2xl mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-5">{steps.find(s => s.id === step)?.title}</h3>
          
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <input type="text" name="storename" placeholder="اسم المتجر (مطلوب)" value={form.storename} onChange={handleChange} className="p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" required />
              <input type="text" name="slogan" placeholder="وصف قصير / السلوجان (مطلوب)" value={form.slogan} onChange={handleChange} className="p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" required />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <input type="tel" name="whatsapp" placeholder="رقم واتساب للتواصل (مطلوب، مثال: +96650XXXXXX)" value={form.whatsapp} onChange={handleChange} className="p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" required />
              <input type="email" name="email" placeholder="البريد الإلكتروني (اختياري)" value={form.email} onChange={handleChange} className="p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" />
              <input type="text" name="city" placeholder="المدينة / العنوان الرئيسي (مطلوب)" value={form.city} onChange={handleChange} className="p-4 border border-gray-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" required />
            </div>
          )}

          {step === 3 && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-200">
              <h4 className="text-lg font-bold text-indigo-700 mb-3">تأكد من البيانات قبل الإنشاء</h4>
              <p className="border-b pb-2"><strong>اسم المتجر:</strong> {form.storename}</p>
              <p className="border-b pb-2"><strong>Slogan:</strong> {form.slogan}</p>
              <p className="border-b pb-2"><strong>واتساب:</strong> {form.whatsapp}</p>
              <p className="border-b pb-2"><strong>البريد الإلكتروني:</strong> {form.email || 'غير محدد'}</p>
              <p className="border-b pb-2"><strong>المدينة:</strong> {form.city}</p>
            </div>
          )}
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={handleBack} disabled={loading} className="flex items-center px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors disabled:opacity-50">
              <ChevronRight className="w-5 h-5 mr-2" /> العودة
            </button>
          )}

          {step < totalSteps && (
            <button onClick={handleNext} disabled={loading || !isStepValid} className={`flex items-center px-6 py-3 rounded-xl ml-auto font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:shadow-none ${isStepValid ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-400/50" : "bg-indigo-300 text-white cursor-not-allowed"}`}>
              التالي <ChevronLeft className="w-5 h-5 ml-2" />
            </button>
          )}

          {step === totalSteps && (
            <button onClick={handleSubmit} disabled={loading || !isStepValid} className="w-full px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors shadow-lg shadow-green-400/50 disabled:opacity-50 disabled:shadow-none flex items-center justify-center">
              {loading ? <><Loader2 className="w-5 h-5 ml-2 animate-spin" /> جاري الإنشاء...</> : "إنشاء المتجر الآن"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
