"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { useRouter } from "next/navigation";
import { LogOut, Bell, User, Store } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeHeader() {
  const mystore = () => {
        router.push('/home/my-store')
  }
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session) {
        router.replace("/login");
        return;
      }
      setUserEmail(session.user.email);
    };

    fetchUser();

    

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) router.replace("/login");
        else setUserEmail(session.user.email);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 shadow-xl py-4 px-6 flex justify-between items-center rounded-b-3xl gap-3">
      {/* User Info */}
      <motion.div
        className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <User className="text-white" size={20} />
        <div className="text-white font-medium text-md truncate max-w-xs">
          {userEmail || "جارٍ التحميل..."}
        </div>
      </motion.div>

      <motion.button 
        onClick={mystore}
        className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm hover:bg-white/30 transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Store className="text-white" size={20} />
        <div className="text-white font-medium text-md truncate max-w-xs">
          {"متجري"}
        </div>
      </motion.button>

      {/* Actions */}
      <div className="flex items-center gap-4">
        

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white font-medium px-4 py-2 rounded-2xl shadow-sm hover:bg-white/30 transition-colors"
        >
          تسجيل الخروج
          <LogOut size={18} />
        </motion.button>
      </div>
    </header>
  );
}
