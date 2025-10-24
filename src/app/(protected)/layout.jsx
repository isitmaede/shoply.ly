"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/SupabaseClient"; // تأكد من أن ملف الاتصال موجود


export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true); // أثناء التحقق
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        // تحقق من الجلسة الحالية
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Supabase getSession error:", error);
          // لو حدث خطأ نعيد التوجيه للّوغ إن
          if (mounted) router.replace("/login");
          return;
        }

        const session = data?.session ?? null;
        if (!session) {
          // لا جلسة => توجيه لتسجيل الدخول
          if (mounted) router.replace("/login");
          return;
        }

        // لدينا جلسة — يمكنك هنا فحص صلاحيات المستخدم
        const currentUser = session.user;
       
        const hasStore = !!currentUser.user_metadata?.store_name;

       

        if (mounted) {
          setUser(currentUser);
          setChecking(false);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        if (mounted) router.replace("/login");
      }
    };

    checkSession();

   
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      
      if (!session) {
        router.replace("/login");
      } else {
        
        setUser(session.user);
        setChecking(false);
      }
    });

    return () => {
      mounted = false;
    
      if (sub?.subscription) sub.subscription.unsubscribe();
    };
  }, [router]);

  
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
      
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-10 w-10 text-[#6D28D9]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-gray-600">جارٍ التحقق من الجلسة...</p>
        </div>
      </div>
    );
  }

 
  return <>{children}</>;
}
