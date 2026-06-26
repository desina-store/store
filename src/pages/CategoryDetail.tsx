import { useParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Store,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

export default function CategoryDetail() {
  const { slug, subSlug } = useParams<{ slug: string; subSlug?: string }>();
  const [sortBy, setSortBy] = useState("default");

  const { data: category } = trpc.category.bySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  const { data: productsByCat } = trpc.product.byCategory.useQuery(
    { categorySlug: slug || "" },
    { enabled: !!slug && !subSlug }
  );

  const { data: productsBySub } = trpc.product.bySubcategory.useQuery(
    { subcategorySlug: subSlug || "" },
    { enabled: !!subSlug }
  );

  const products = subSlug ? productsBySub : productsByCat;

  const sortedProducts = products
    ? [...products].sort((a, b) => {
        if (sortBy === "price-low") return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === "price-high") return parseFloat(b.price) - parseFloat(a.price);
        if (sortBy === "rating") return parseFloat(b.rating || "0") - parseFloat(a.rating || "0");
        return 0;
      })
    : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Category Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-amber-600 transition-colors">الرئيسية</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/categories" className="hover:text-amber-600 transition-colors">الأقسام</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-amber-600 font-medium">{category.nameAr}</span>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: category.color }}
            >
              <Store className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{category.nameAr}</h1>
              <p className="text-gray-500 mt-1">{products?.length || 0} منتج</p>
            </div>
          </div>

          {/* Subcategories */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                to={`/category/${slug}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  !subSlug
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                الكل
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/category/${slug}/${sub.slug}`}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    subSlug === sub.slug
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sub.nameAr}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            {sortedProducts.length} منتج
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="default">الافتراضي</option>
              <option value="price-low">السعر: من الأقل</option>
              <option value="price-high">السعر: من الأعلى</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-400">لا توجد منتجات في هذا القسم حالياً</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
