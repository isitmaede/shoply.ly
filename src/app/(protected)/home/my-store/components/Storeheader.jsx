"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Phone, Info } from "lucide-react"; 
import { Poppins , Tajawal } from "next/font/google";
import { supabase } from "@/lib/SupabaseClient";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400"] });

export default function Header() {
    useEffect(() => {
  async function fetchData() {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) return console.log("User error:", userError);
    if (!userData.user) return console.log("No user session");

    const userId = userData.user.id;
    console.log("User ID:", userId);

    const { data: storeData, error: storeError } = await supabase
      .from('stores')
      .select('storename , city , whatsapp')
      .eq('user_id', userId)
      .single();

    if (storeError) return console.log("Store error:", storeError);

    console.log("Store data:", storeData);
    setStorename(storeData.storename);
    Setphone(storeData.whatsapp)
    Setcity(storeData.city)
  }

  fetchData();
}, []);
  
  const [subheader , Setsubheader] = useState('')
  const [phone, Setphone] = useState('')
  const [city , Setcity] = useState('')
  const [storeName , setStorename] = useState('shoply.ly')
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
      <div>
        <h1 className="bg-gradient-to-r from-pink-500 via-fuchsia-600 text-white text-center ">{subheader}</h1>
      </div>
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className={`${tajawal.className} text-3xl font-extrabold tracking-tighter transition duration-300 ease-in-out hover:scale-[1.03]`}
                >
                  <span className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-violet-800 bg-clip-text text-transparent">
                     {storeName}
                  </span>
                </Link>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 sm:space-x-5">

                {/* Shopping Cart */}
                <button
                  onClick={() => setCartModalOpen(true)}
                  className="group text-gray-700 hover:text-pink-500 transition-colors duration-300 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white leading-none ring-2 ring-white">
                    0
                  </span>
                </button>

                {/* Phone */}
                <button
                  onClick={() => setPhoneModalOpen(true)}
                  className="flex items-center text-gray-700 hover:text-violet-700 transition-colors duration-300"
                  aria-label="Contact via WhatsApp"
                >
                  <Phone className="w-6 h-6" />
                </button>

                {/* Info */}
                <button
                  onClick={() => setInfoModalOpen(true)}
                  className="flex items-center text-gray-700 hover:text-violet-700 transition-colors duration-300"
                  aria-label="Store Info"
                >
                  <Info className="w-6 h-6" />
                </button>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}

      {/* Cart Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setCartModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 animate-fadeIn">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">سلة التسوق</h2>
            <p className="text-gray-700 mb-4">لا يوجد منتجات بعد.</p>
            <button
              onClick={() => setCartModalOpen(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Phone Modal */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setPhoneModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 animate-fadeIn">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">تواصل معنا</h2>
            <p className="text-gray-700 mb-4">يمكنك الاتصال أو إرسال رسالة عبر واتساب.</p>
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              className="w-full block text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-200 mb-2"
            >
              فتح واتساب
            </a>
            <button
              onClick={() => setPhoneModalOpen(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {infoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setInfoModalOpen(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 animate-fadeIn">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">معلومات المتجر</h2>
            <p className="text-gray-700 mb-2">{`العنوان : ${city}`}</p>
            <p className="text-gray-700 mb-4">{`المدينة : ${city}`}</p>
            <button
              onClick={() => setInfoModalOpen(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </>
  );
}
