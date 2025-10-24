import React from 'react'

export default function Homefooter() {
  return (
    <footer class="bg-gray-900 text-white mt-16">
  <div class="container mx-auto px-4 py-12 lg:py-16">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">

      <div class="col-span-2 lg:col-span-2">
        <h3 class="text-3xl font-extrabold mb-4 tracking-tighter">
          <span class="bg-gradient-to-r from-pink-500 to-violet-400 bg-clip-text text-transparent">
            Shoply.ly
          </span>
        </h3>
        <p class="text-gray-400 text-sm max-w-sm leading-relaxed">
         Shopyly يحول صفحتك إلى متجر إلكتروني متكامل في دقائق، بتصميم أنيق وإشعارات فورية لطلباتك.
        </p>
      </div>

      <div class="col-span-1">
        
      </div>

      <div class="col-span-1">
        <p class="font-bold text-lg mb-4 text-violet-400">المعلومات القانونية</p>
        <nav class="flex flex-col space-y-3 text-sm">
          <a href="/privacy-policy" class="text-gray-400 hover:text-white transition duration-300 transform hover:translate-x-1">
            سياسة الخصوصية
          </a>
          <a href="/terms-of-service" class="text-gray-400 hover:text-white transition duration-300 transform hover:translate-x-1">
            شروط الخدمة
          </a>
         
          
        </nav>
      </div>

    </div>

    <div class="mt-12 pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:items-center">
      <p class="text-sm text-gray-500 mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Shoply.ly. جميع الحقوق محفوظة.
      </p>

      
    </div>
  </div>
</footer>
  )
}
