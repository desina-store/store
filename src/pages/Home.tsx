import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Cpu,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Dumbbell,
  Gamepad2,
  BookOpen,
  Apple,
  Store,
  ArrowLeft,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Home: <HomeIcon className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Dumbbell: <Dumbbell className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
};

export default function Home() {
  const { data: categories } = trpc.category.list.useQuery();
  const { data: featuredProducts } = trpc.product.featured.useQuery();
  const { data: allProducts } = trpc.product.list.useQuery();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(245,158,11,0.3),_transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                تسوق بذكاء، وفر أكثر
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                اكتشف عالماً من
                <span className="bg-gradient-to-l from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}التسوق الرائع
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                DesinaHub وجهتك الأولى للتسوق الإلكتروني. آلاف المنتجات بأسعار مميزة، توصيل سريع، وجودة مضمونة.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/categories"
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 text-center"
                >
                  تسوق الآن
                </Link>
                <Link
                  to="/categories"
                  className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all text-center"
                >
                  تصفح الأقسام
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20">
                  <TrendingUp className="w-8 h-8 text-amber-400 mb-3" />
                  <p className="text-white font-bold text-2xl">+50,000</p>
                  <p className="text-gray-400 text-sm">منتج متنوع</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                  <Clock className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-white font-bold text-2xl">24-48h</p>
                  <p className="text-gray-400 text-sm">توصيل سريع</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <Store className="w-8 h-8 text-purple-400 mb-3" />
                  <p className="text-white font-bold text-2xl">+100,000</p>
                  <p className="text-gray-400 text-sm">عميل سعيد</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                  <Zap className="w-8 h-8 text-green-400 mb-3" />
                  <p className="text-white font-bold text-2xl">8 أقسام</p>
                  <p className="text-gray-400 text-sm">تشمل كل احتياجاتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">تسوق حسب القسم</h2>
              <p className="text-gray-500">اكتشف مجموعتنا المتنوعة من المنتجات</p>
            </div>
            <Link
              to="/categories"
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-amber-200 transition-all hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: cat.color }}
                >
                  {iconMap[cat.icon] || <Store className="w-6 h-6" />}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-amber-600 transition-colors">
                  {cat.nameAr}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                  <Zap className="w-3 h-3" />
                  منتجات مميزة
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">اخترنا لك</h2>
              </div>
              <Link
                to="/categories"
                className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      {allProducts && allProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">أحدث المنتجات</h2>
                <p className="text-gray-500">تصفح أحدث الإضافات إلى متجرنا</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {allProducts.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
