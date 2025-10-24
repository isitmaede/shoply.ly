"use client";

import { useState, useCallback, useMemo } from "react";
import { ShoppingCart, Plus, Search, Filter, X, Zap, CheckCircle, Upload, Heart, ChevronDown, Tag, Pencil } from "lucide-react";
import { Tajawal } from "next/font/google";

// استخدام خط Tajawal فقط للتركيز على التصميم العربي الحديث
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["200", "400", "700", "800"] });

// بيانات المنتجات الأولية
const initialProducts = [
  { id: 1, name: "هاتف ذكي X20 Pro", price: 799.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x7J6h-YQ6x3r1A8fM5QY4tq9o7V8H9yP0Q&s", status: "InStock", description: "منتج متطور بمواصفات عالية وأداء فائق، يناسب جميع الاستخدامات الاحترافية." },
  { id: 2, name: "عطر الأزهار الشرقية", price: 129.5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5r8FqH7p4w6z_3t-gX9i_3I7b7Qv1n2QY6g&s", status: "OutOfStock", description: "رائحة فريدة ومميزة تدوم طوال اليوم، لمسة أناقة لا مثيل لها." },
  { id: 3, name: "منظم أدوات عمل", price: 89.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6J3_w7lW_4Q6wX2iF5eGv4h8H8D8E9y0QYg&s", status: "InStock", description: "أداة عملية تساعد على تنظيم مساحة العمل وزيادة الإنتاجية." },
  { id: 4, name: "إكسسوار أنيق", price: 249.99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Y6lE8e9Q_b4GZ8lq5Lq0X0x2qF0j7rG5x8A&s", status: "LimitedStock", description: "قطعة مميزة تضفي طابعاً خاصاً على إطلالتك اليومية." },
];

// ---------------------------
// مكون Modal (لإعادة الاستخدام)
// ---------------------------
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn" onClick={onClose}></div>
      <div
        className="relative bg-white rounded-2xl sm:rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-full max-w-sm sm:max-w-lg overflow-hidden transform transition-all duration-300 p-4 sm:p-6 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 transition-colors z-50 p-2 bg-white/70 rounded-full backdrop-blur-sm shadow-md"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        {title && <h2 className="text-gray-900 text-xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center border-b pb-3 sm:pb-4">{title}</h2>}
        {children}

        <style jsx>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        `}</style>
      </div>
    </div>
  );
};

// ---------------------------
// المكون الرئيسي: UniversalStore
// ---------------------------
export default function UniversalStore() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: null, preview: "" });

  // Admin Flag (يمكن ربطها بـ Auth مستقبلاً)
  const isAdmin = true;

  // استخدام useMemo لتحسين أداء الفلترة
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      let matchesPrice = true;
      // الفلترة هنا لتناسب نطاقات سعر عامة للمتجر الافتراضي
      if (priceFilter === "Low") matchesPrice = p.price < 150;
      else if (priceFilter === "High") matchesPrice = p.price >= 150;
      return matchesSearch && matchesPrice;
    });
  }, [products, search, priceFilter]);

  // دالة الطلب عبر واتساب (استخدام useCallback لتجنب إعادة الإنشاء)
  const handleOrder = useCallback((product) => {
    if (product.status !== "InStock") return;
    const message = `مرحباً! أود طلب المنتج: *${product.name}* بسعر *${product.price.toFixed(2)}$*. أرجو تأكيد توفره.`;
    // رقم افتراضي
    window.open(`https://wa.me/966501234567?text=${encodeURIComponent(message)}`, "_blank");
    setModalOpen(false);
  }, []);

  // دالة إضافة منتج
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.preview) return;

    const newId = products.length + 1;
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description || "منتج جديد تم إضافته مؤخراً.",
      image: newProduct.preview,
      status: "InStock",
    };

    setProducts(prev => [...prev, productToAdd]);
    setNewProduct({ name: "", price: "", description: "", image: null, preview: "" });
    setAddModalOpen(false);
    // إشعار لطيف للمستخدم
    alert(`تم إضافة المنتج: ${productToAdd.name} بنجاح!`);
  };

  // دالة تغيير فلتر السعر
  const handlePriceFilter = useCallback((filter) => {
    setPriceFilter(prev => (prev === filter ? "All" : filter));
  }, []);

  // دالة معاينة الصورة
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewProduct(prev => ({
        ...prev,
        image: file,
        preview: url,
      }));
    }
  };

  // ---------------------------
  // تصميم بطاقة المنتج
  // ---------------------------
  const ProductCard = ({ product }) => {
    const isOutOfStock = product.status === "OutOfStock";

    return (
      <div
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative transform transition hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl duration-500 group border-4 ${
          isOutOfStock ? "border-gray-200 opacity-60 grayscale" : "border-transparent hover:border-indigo-100"
        } cursor-pointer`}
        onClick={() => {
          setSelectedProduct(product);
          setModalOpen(true);
        }}
      >
        {/* شارة الحالة */}
        {(product.status !== "InStock") && (
          <span
            className={`absolute top-3 right-3 z-10 text-xs font-extrabold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg ${
              product.status === "OutOfStock" ? "bg-red-500 text-white" : "bg-amber-400 text-gray-900"
            } flex items-center`}
          >
            {product.status === "OutOfStock" ? <X className="w-3 h-3 ml-1" /> : <Zap className="w-3 h-3 ml-1" />}
            {product.status === "OutOfStock" ? "نفد المخزون" : "كمية محدودة"}
          </span>
        )}

        {/* زر الإعجاب (تحسين تفاعلي) */}
        <button className="absolute top-3 left-3 z-10 p-1 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 transition-colors shadow-lg">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
        </button>

        <div className="relative w-full h-40 sm:h-64 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 sm:p-5 text-right">
          <h2 className={`${tajawal.className} text-gray-900 font-bold text-lg sm:text-xl mb-1 truncate`}>{product.name}</h2>
          <p className={`${tajawal.className} text-indigo-600 font-extrabold text-2xl sm:text-3xl mb-3 sm:mb-4`}>
            {product.price.toFixed(2)} د.ل
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // منع فتح المودال عند الضغط على الزر
              setSelectedProduct(product);
              setModalOpen(true);
            }}
            disabled={isOutOfStock}
            className={`w-full py-2 sm:py-3 rounded-xl font-extrabold text-sm sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center transform hover:scale-[1.02] ${
              !isOutOfStock
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50"
                : "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
            }`}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            {!isOutOfStock ? "اطلب الآن" : "غير متاح"}
          </button>
        </div>
      </div>
    );
  };

  // ---------------------------
  // واجهة المستخدم (Return JSX)
  // ---------------------------
  return (
    <div className={`${tajawal.className} min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50`}>
      {/* شريط البحث والفلاتر العلوي */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 sticky top-0 bg-white/95 backdrop-blur-md z-40 shadow-lg rounded-b-2xl sm:rounded-b-3xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">

          {/* حقل البحث الأنيق */}
          <div className="flex w-full sm:w-2/3 items-center border border-gray-200 rounded-full px-3 sm:px-5 py-2 sm:py-3 bg-white shadow-inner transition-all duration-300 focus-within:ring-4 focus-within:ring-indigo-200/50">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن اسم المنتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mr-3 text-right w-full outline-none text-gray-800 bg-transparent placeholder-gray-500 text-sm sm:text-lg"
            />
          </div>

          {/* أزرار الفلترة الأنيقة */}
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <FilterButton
              label="سعر أقل من 150$"
              filterKey="Low"
              currentFilter={priceFilter}
              onClick={handlePriceFilter}
              icon={ChevronDown}
            />
            <FilterButton
              label="سعر 150$ فأكثر"
              filterKey="High"
              currentFilter={priceFilter}
              onClick={handlePriceFilter}
              icon={ChevronDown}
            />
          </div>
        </div>
      </div>

      {/* شبكة عرض المنتجات */}
      <div className="container mx-auto px-2 sm:px-4 pt-6 sm:pt-10 pb-16 sm:pb-20">
        

        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-10 sm:py-16 text-center bg-white/80 rounded-3xl shadow-lg border border-gray-200">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400 mx-auto mb-4" />
              <p className="text-lg sm:text-2xl font-bold text-gray-700">عذراً، لا توجد نتائج مطابقة لبحثك.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setPriceFilter("All");
                }}
                className="mt-4 sm:mt-6 text-indigo-600 hover:text-indigo-800 font-extrabold text-base sm:text-lg transition flex items-center justify-center mx-auto"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 ml-1" /> مسح البحث والفلاتر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* زر إضافة عائم (للمسؤول) */}
      {isAdmin && (
        <button
          onClick={() => setAddModalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 ring-2 sm:ring-4 ring-white/50"
        >
          <Plus className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        
      )}

      {isAdmin && (
        <button
          onClick={() => setAddModalOpen(true)}
          className="fixed bottom-23 right-4 sm:bottom-6 sm:right-6 bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl shadow-purple-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 ring-2 sm:ring-4 ring-white/50"
        >
          <Pencil className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        
      )}

      {/* مودال تفاصيل المنتج (باستخدام المكون المعاد استخدامه) */}
      <Modal isOpen={modalOpen && !!selectedProduct} onClose={() => setModalOpen(false)}>
        {selectedProduct && <ProductDetailModalContent product={selectedProduct} handleOrder={handleOrder} />}
      </Modal>

      {/* مودال إضافة المنتج (باستخدام المكون المعاد استخدامه) */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="إضافة منتج جديد">
        <AddProductModalContent
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleFileChange={handleFileChange}
          handleAddProduct={handleAddProduct}
        />
      </Modal>

    </div>
  );
}

// ---------------------------
// مكونات فرعية لتحسين التنظيم
// ---------------------------

// مكون زر الفلتر
const FilterButton = ({ label, filterKey, currentFilter, onClick, icon: Icon }) => (
  <button
    onClick={() => onClick(filterKey)}
    className={`flex items-center text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-extrabold transition-all duration-300 shadow-lg transform hover:scale-[1.03] active:scale-[0.98] ${
      currentFilter === filterKey ? "bg-indigo-600 text-white shadow-indigo-400/50" : "bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-100"
    }`}
  >
    <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform ${currentFilter === filterKey ? "rotate-180" : "rotate-0"}`} /> {label}
  </button>
);

// محتوى مودال تفاصيل المنتج
const ProductDetailModalContent = ({ product, handleOrder }) => (
  <div className="text-right">
    <div className="w-full h-56 sm:h-80 overflow-hidden rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-xl">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
    </div>

    <h2 className="text-gray-900 text-2xl sm:text-4xl font-extrabold mb-1">{product.name}</h2>
    <p className="text-indigo-600 text-3xl sm:text-5xl font-black mb-4 sm:mb-6 border-b pb-3 sm:pb-4">د.ل{product.price.toFixed(2)}</p>

    <p className="text-gray-700 text-sm sm:text-lg mb-4 sm:mb-6">{product.description}</p>

    <div className="flex items-center mb-6 sm:mb-8">
        <span className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full flex items-center ${
            product.status === "InStock" ? "bg-green-100 text-green-700" :
            product.status === "LimitedStock" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
        }`}>
            {product.status === "InStock" ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1" /> :
             product.status === "LimitedStock" ? <Zap className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1" /> :
             <X className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1" />}
            {product.status === "InStock" ? "متوفر في المخزون" :
             product.status === "LimitedStock" ? "كمية قليلة" :
             "نفد المخزون"}
        </span>
    </div>

    <button
      onClick={() => handleOrder(product)}
      disabled={product.status !== "InStock"}
      className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-lg sm:text-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center ${
        product.status === "InStock"
          ? "bg-green-600 hover:bg-green-700 text-white shadow-green-500/50"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
    >
      <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
      طلب المنتج عبر واتساب
    </button>
  </div>
);

// محتوى مودال إضافة المنتج
const AddProductModalContent = ({ newProduct, setNewProduct, handleFileChange, handleAddProduct }) => (
    <form onSubmit={handleAddProduct} className="space-y-4 sm:space-y-6 text-right">
        {/* حقل اسم المنتج */}
        <input
            type="text"
            placeholder="اسم المنتج (مطلوب)"
            required
            value={newProduct.name}
            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-shadow shadow-sm hover:shadow-md text-sm sm:text-base"
        />

        {/* حقل الوصف */}
        <textarea
            placeholder="وصف مختصر للمنتج ليظهر في صفحة التفاصيل"
            value={newProduct.description}
            onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-shadow shadow-sm hover:shadow-md h-20 sm:h-24 resize-none text-sm sm:text-base"
        />

        {/* حقل السعر */}
        <div className="relative">
            <input
                type="number"
                placeholder="السعر (مطلوب)"
                required
                step="0.01"
                min="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                className="w-full p-3 sm:p-4 pl-10 sm:pl-12 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-shadow shadow-sm hover:shadow-md text-sm sm:text-base"
            />
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-extrabold text-base sm:text-lg">$</span>
        </div>

        {/* تحميل الصورة ومعاينتها */}
        <div>
            <label className="block text-gray-700 mb-2 sm:mb-3 font-extrabold flex items-center text-sm sm:text-base">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-indigo-500" /> صورة المنتج (مطلوبة)
            </label>
            <input
                type="file"
                accept="image/*"
                required={!newProduct.preview}
                onChange={handleFileChange}
                // تعديل لتناسب أحجام الهواتف
                className="w-full text-xs sm:text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition cursor-pointer"
            />
            {newProduct.preview && (
                <div className="relative mt-3 sm:mt-4">
                    <img src={newProduct.preview} alt="Preview" className="w-full h-32 sm:h-48 object-cover rounded-lg sm:rounded-xl shadow-lg border-4 border-white" />
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">معاينة</span>
                </div>
            )}
        </div>

        <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-lg sm:text-xl shadow-xl shadow-indigo-500/50 mt-6 sm:mt-8 transition-transform transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center"
        >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 ml-2 inline" /> حفظ المنتج في المتجر
        </button>
    </form>
);