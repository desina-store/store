import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Package,
} from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  const sessionId = localStorage.getItem("desinahub_session") || "";
  const utils = trpc.useUtils();

  const { data: cart, isLoading } = trpc.cart.get.useQuery({ sessionId });

  const updateQuantity = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.count.invalidate({ sessionId });
    },
  });

  const removeItem = trpc.cart.remove.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.count.invalidate({ sessionId });
      toast.success("تم الحذف من السلة");
    },
  });

  const clearCart = trpc.cart.clear.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.count.invalidate({ sessionId });
      toast.success("تم إفراغ السلة");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4" />
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">السلة فارغة</h2>
            <p className="text-gray-500 mb-6">ابدأ تسوقك الآن واكتشف منتجات رائعة</p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              تصفح المنتجات
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            سلة المشتريات
            <span className="text-lg font-normal text-gray-500">
              ({cart.items.length} منتج)
            </span>
          </h1>
          <button
            onClick={() => clearCart.mutate({ sessionId })}
            className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            إفراغ السلة
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4"
              >
                <Link
                  to={`/product/${item.product?.slug || ""}`}
                  className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0"
                >
                  {item.product && (
                    <img
                      src={item.product.image}
                      alt={item.product.nameAr}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product?.slug || ""}`}>
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-amber-600 transition-colors truncate">
                      {item.product?.nameAr}
                    </h3>
                  </Link>
                  <p className="text-amber-600 font-bold mb-3">
                    {item.product ? parseFloat(item.product.price).toFixed(2) : "0.00"} ر.س
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity.mutate({
                            itemId: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity.mutate({
                            itemId: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem.mutate({ itemId: item.id })}
                      className="w-8 h-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-left">
                  <p className="font-bold text-gray-900">
                    {item.product
                      ? (parseFloat(item.product.price) * item.quantity).toFixed(2)
                      : "0.00"}{" "}
                    ر.س
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">ملخص الطلب</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المجموع الفرعي</span>
                  <span className="font-medium">{cart.total.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الشحن</span>
                  <span className="text-green-600 font-medium">
                    {cart.total > 200 ? "مجاني" : "29.00 ر.س"}
                  </span>
                </div>
                {cart.total > 200 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">خصم الشحن</span>
                    <span className="text-green-600 font-medium">-29.00 ر.س</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">الإجمالي</span>
                    <span className="font-bold text-amber-600 text-xl">
                      {cart.total > 200 ? cart.total.toFixed(2) : (cart.total + 29).toFixed(2)} ر.س
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.info("سيتم توجيهك لصفحة الدفع قريباً")}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
              >
                إتمام الطلب
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Package className="w-4 h-4" />
                <span>توصيل خلال 24-48 ساعة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
