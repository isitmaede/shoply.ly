"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tag, Zap, ChevronLeft, CheckCircle, Lock } from "lucide-react"; // تم إضافة Lock
// **ملاحظة:** تم إزالة استيراد "next/navigation" وتم استخدام window.location.href في دالة handleSelect كحل بديل مؤقت.

// قائمة القوالب الجديدة مع بيانات مُحسّنة للمعاينة
const templates = [
  {
    id: 1,
    name: "قالب الأناقة (Fashion)",
    tagline: "تصميم نظيف ومشرق للماركات الفاخرة والأزياء الراقية.",
    feature: "واجهات عرض واسعة، تركيز على الصور بجودة عالية، وميزات تصفح سلسة.",
    icon: Tag,
    previewColor: "#EC4899", // وردي للواجهة الفاتحة
    borderColor: "border-purple-600",
    bgClass: "bg-white text-gray-800 shadow-2xl shadow-purple-200/50",
    buttonColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/30",
    checkColor: "text-purple-500",
    isPaid: false, // تم الإضافة: لتحديد حالة القالب
  },
  {
    id: 2,
    name: "قالب التقنية (Tech)",
    tagline: "هيكل قوي وداكن يناسب الأجهزة الإلكترونية والمنتجات الحديثة.",
    feature: "بطاقات منتجات بارزة، أقسام مقارنة واضحة، وتجربة شراء سريعة.",
    icon: Lock, // تغيير الأيقونة إلى القفل
    previewColor: "#059669", // أخضر للواجهة الداكنة
    borderColor: "border-gray-400", // لون حدود رمادي
    bgClass: "bg-gray-900 text-white shadow-2xl shadow-gray-900/50 opacity-70", // إضافة شفافيه خفيفة
    buttonColor: "bg-gray-500 cursor-not-allowed shadow-gray-500/30", // لون زر معطل
    checkColor: "text-gray-400", // لون علامات صح رمادي
    isPaid: true, // تم التحديث: القالب مدفوع
  },
];

// مكون لعرض محاكاة واجهة القالب
const TemplatePreview = ({ color }) => {
  const isDark = color === "#059669";
  const barBg = isDark ? "bg-gray-700" : "bg-gray-200";
  const elementBg = isDark ? "bg-gray-600" : "bg-gray-300";
  const btnBg = isDark ? "bg-green-500" : "bg-purple-500";

  return (
    <div className={`w-full h-32 p-1 rounded-lg border-2 border-dashed transition-all duration-300 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
      <div className={`w-full h-full rounded-md shadow-inner overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* شريط التصفح العلوي */}
        <div className={`h-2.5 flex items-center justify-between px-1 ${barBg}`}>
          <div className={`w-4 h-1 rounded-sm ${elementBg}`}></div>
          <div className={`w-10 h-1 rounded-sm ${elementBg}`}></div>
        </div>
        {/* جسم المعاينة */}
        <div className="p-1.5 flex flex-col gap-1">
          {/* شريط المنتج الرئيسي */}
          <div className={`w-full h-3 rounded-md ${btnBg}`}></div>
          {/* بطاقة المنتج */}
          <div className="flex gap-1.5 mt-1">
            <div className={`w-1/3 h-10 rounded-sm ${elementBg}`}></div>
            <div className="w-2/3 flex flex-col gap-1">
              <div className={`w-full h-2 rounded-sm ${elementBg}`}></div>
              <div className={`w-1/2 h-2 rounded-sm ${elementBg}`}></div>
              <div className={`w-3/4 h-2 rounded-sm ${elementBg}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// مكون علامة صح صغيرة
const Checkmark = ({ color }) => (
  <CheckCircle className={`w-5 h-5 flex-shrink-0 ${color}`} />
);

// أيقونة القالب
const CardIcon = ({ Icon, className }) => (
  <div className={`p-4 rounded-xl ${className}`}>
    <Icon size={28} strokeWidth={2.5} />
  </div>
);

export default function TemplatesBody() {

  const handleSelect = (templateId, isPaid) => {
    if (isPaid) {
        // إذا كان مدفوعاً، يمكن توجيهه لصفحة الترقية أو إظهار رسالة
        alert("هذا القالب يتطلب ترقية الحساب.");
        return; 
    }
    // توجيه المستخدم لصفحة إنشاء المتجر باستخدام window.location.href
    if (typeof window !== 'undefined') {
      window.location.href = `/home/create-store`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-inter">
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-4 leading-tight"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        اختر مسار انطلاق متجرك
      </motion.h2>
      <motion.p
        className="text-center text-gray-600 mb-16 text-xl max-w-2xl mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        تصميمان احترافيان ومُحسَّنان بالكامل، يضمنان أفضل تجربة تسوق لعملائك.
      </motion.p>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl gap-12 w-full">
          {templates.map((tpl, index) => {
            const isDark = index % 2 !== 0;
            const primaryColorClass = tpl.borderColor;
            const hoverProps = tpl.isPaid ? {} : { // تطبيق خاصية whileHover فقط على القالب المجاني
              whileHover: { scale: 1.02, y: -5, rotate: isDark ? 0.5 : -0.5 }
            };

            return (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, x: isDark ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                {...hoverProps} // تطبيق خصائص الحركة المشروطة
                className={`rounded-3xl p-8 transition-all duration-500 transform border-4 ${tpl.bgClass} ${primaryColorClass} ${tpl.isPaid ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ '--primary-color': tpl.previewColor }}
                onClick={() => handleSelect(tpl.id, tpl.isPaid)} // تمرير حالة الدفع
              >
                {/* المعاينة المصغرة (Mockup) */}
                <div className="mb-8">
                  <TemplatePreview color={tpl.previewColor} />
                </div>

                {/* رأس القالب */}
                <div className="flex items-center justify-between mb-4">
                  <CardIcon
                    Icon={tpl.icon}
                    // تغيير لون خلفية أيقونة المدفوع إلى رمادي باهت
                    className={tpl.isPaid ? "bg-gray-500/20 text-gray-400" : "bg-purple-500/20 text-purple-600"}
                  />
                  <span
                    className={`text-base font-bold p-2 px-4 rounded-full ${isDark && !tpl.isPaid ? "bg-green-700 text-green-200" : tpl.isPaid ? "bg-red-700 text-red-200" : "bg-purple-700 text-purple-200"}`}
                  >
                    {tpl.isPaid ? "مدفوع (Premium)" : `${tpl.tagline.split(' ')[0]} ${tpl.tagline.split(' ')[1]}`}
                  </span>
                </div>

                {/* عنوان ووصف */}
                <h3 className="text-4xl font-extrabold mb-2 leading-snug">{tpl.name}</h3>
                <p className={`mb-6 text-lg font-medium ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  {tpl.feature}
                </p>

                {/* مميزات مفصلة */}
                <div className="space-y-3 mb-8 border-t border-dashed pt-6" style={{ borderColor: isDark ? '#374151' : '#E5E7EB' }}>
                  {[
                    "جاهز لـ SEO ومتوافق مع محركات البحث",
                    "دعم كامل للغة العربية (RTL)",
                    "مكتبة خطوط حديثة وجذابة",
                    "أداء سريع وتقليل وقت التحميل",
                  ].map((text, i) => (
                    <div className="flex items-center" key={i}>
                      {/* تغيير لون علامات صح للقالب المدفوع إلى رمادي */}
                      <Checkmark color={tpl.isPaid ? "text-gray-500" : "text-purple-600"} />
                      <span className={`mr-3 ${isDark ? "text-gray-400" : "text-gray-700"} font-medium`}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* زر الاختيار */}
                <motion.button
                  whileTap={!tpl.isPaid ? { scale: 0.95 } : {}} // تطبيق حركة الضغط فقط على الزر غير المدفوع
                  disabled={tpl.isPaid} // تعطيل الزر
                  className={`w-full text-white py-3.5 rounded-xl font-extrabold text-lg transition-colors shadow-xl flex items-center justify-center ${tpl.buttonColor} ${tpl.isPaid ? 'opacity-80' : 'hover:shadow-2xl'}`}
                >
                  {tpl.isPaid ? (
                    <>
                      <Lock size={20} className="ml-2" /> {/* أيقونة القفل داخل الزر */}
                      <span>ترقية للاستخدام</span>
                    </>
                  ) : (
                    <>
                      <span className="ml-2">
                        اختيار قالب {tpl.name.split(" ")[2]}
                      </span>
                      <ChevronLeft size={20} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}