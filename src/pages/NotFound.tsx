import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-amber-600">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all"
          >
            <Home className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <Link
            to="/categories"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            تصفح الأقسام
          </Link>
        </div>
      </div>
    </div>
  );
}
