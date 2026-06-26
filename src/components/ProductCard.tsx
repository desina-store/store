import { Link } from "react-router";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: number;
    nameAr: string;
    slug: string;
    price: string;
    oldPrice: string | null;
    image: string;
    rating: string | null;
    reviewsCount: number | null;
    categoryId: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const sessionId = localStorage.getItem("desinahub_session") || "";
  const utils = trpc.useUtils();

  const addToCart = trpc.cart.add.useMutation({
    onSuccess: () => {
      utils.cart.count.invalidate({ sessionId });
      utils.cart.get.invalidate({ sessionId });
      toast.success("تمت الإضافة إلى السلة!");
    },
    onError: () => {
      toast.error("حدث خطأ، يرجى المحاولة مرة أخرى");
    },
  });

  const discount = product.oldPrice
    ? Math.round(
        ((parseFloat(product.oldPrice) - parseFloat(product.price)) /
          parseFloat(product.oldPrice)) *
          100
      )
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.nameAr}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-amber-600 transition-colors text-sm leading-relaxed">
            {product.nameAr}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(parseFloat(product.rating || "0"))
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewsCount || 0})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-amber-600">{parseFloat(product.price).toFixed(2)} ر.س</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {parseFloat(product.oldPrice).toFixed(2)} ر.س
              </span>
            )}
          </div>
          <button
            onClick={() =>
              addToCart.mutate({ sessionId, productId: product.id, quantity: 1 })
            }
            disabled={addToCart.isPending}
            className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
