import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Cpu,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  BookOpen,
  Apple,
  Store,
  ArrowLeft,
  Grid3X3,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
  Dumbbell: <Dumbbell className="w-8 h-8" />,
  Gamepad2: <Gamepad2 className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Apple: <Apple className="w-8 h-8" />,
};

export default function Categories() {
  const { data: categories } = trpc.category.list.useQuery();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Grid3X3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">جميع الأقسام</h1>
              <p className="text-gray-500 text-sm">8 أقسام رئيسية و24 قسم فرعي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {/* Category Header */}
              <Link to={`/category/${cat.slug}`}>
                <div
                  className="p-6 flex items-center gap-4 text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    {iconMap[cat.icon] || <Store className="w-8 h-8" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{cat.nameAr}</h2>
                    <p className="text-white/80 text-sm mt-1">{cat.description}</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 opacity-60" />
                </div>
              </Link>

              {/* Subcategories */}
              <div className="p-4">
                <SubcategoriesList categoryId={cat.id} categorySlug={cat.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

function SubcategoriesList({ categoryId, categorySlug }: { categoryId: number; categorySlug: string }) {
  const { data: subs } = trpc.category.subcategories.useQuery({ categoryId });

  if (!subs || subs.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 mb-3 px-2">الأقسام الفرعية</p>
      {subs.map((sub) => (
        <Link
          key={sub.id}
          to={`/category/${categorySlug}/${sub.slug}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-amber-50 transition-colors">
            <Store className="w-4 h-4 text-gray-500 group-hover:text-amber-600" />
          </div>
          <span className="text-gray-700 font-medium group-hover:text-amber-600 transition-colors flex-1">
            {sub.nameAr}
          </span>
          <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
        </Link>
      ))}
    </div>
  );
}
