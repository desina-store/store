import { useParams, Link } from "react-router";
import { useState } from "react";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);

  const sessionId = localStorage.getItem("desinahub_session") || "";

  const { data: product, isLoading } = trpc.product.bySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  const utils = trpc.useUtils();

  const addToCart = trpc.cart.add.useMutation({
    onSuccess: () => {
      utils.cart.count.invalidate({ sessionId });
      utils.cart.get.invalidate({ sessionId });
      toast.success("تمت الإضافة إلى السلة!");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المنتج غير موجود</h1>
          <Link to="/" className="text-amber-600 hover:underline">
            العودة للرئيسية
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((parseFloat(product.oldPrice) - parseFloat(product.price)) /
          parseFloat(product.oldPrice)) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">الرئيسية</Link>
            <ChevronRight className="w-4 h-4" />
            {product.category && (
              <>
                <Link
                  to={`/category/${product.category.slug}`}
                  className="hover:text-amber-600 transition-colors"
                >
                  {product.category.nameAr}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-amber-600 font-medium">{product.nameAr}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.nameAr}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.nameAr}</h1>
              <p className="text-gray-500">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(product.rating || "0"))
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewsCount} تقييم)
              </span>
            </div>

            {/* Price */}
            <div className="bg-amber-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-amber-600">
                  {parseFloat(product.price).toFixed(2)} ر.س
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {parseFloat(product.oldPrice).toFixed(2)} ر.س
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    وفر {discount}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Check className="w-4 h-4" />
                <span>متوفر في المخزن ({product.stock} قطعة)</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">الكمية</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  addToCart.mutate({ sessionId, productId: product.id, quantity })
                }
                disabled={addToCart.isPending}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                إضافة إلى السلة
              </button>
              <button className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <Truck className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">توصيل سريع</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">جودة مضمونة</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-gray-600">إرجاع سهل</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {product.relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
