import { Link } from "react-router";
import { Store, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">توصيل سريع</h4>
                <p className="text-xs text-gray-400">توصيل خلال 24-48 ساعة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">دفع آمن</h4>
                <p className="text-xs text-gray-400">طرق دفع متعددة وآمنة</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">جودة مضمونة</h4>
                <p className="text-xs text-gray-400">منتجات أصلية 100%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">إرجاع سهل</h4>
                <p className="text-xs text-gray-400">إرجاع خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DesinaHub</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              متجرك الإلكتروني الشامل لجميع احتياجاتك. نقدم منتجات عالية الجودة بأسعار مميزة مع توصيل سريع.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>9200-12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>support@desinahub.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-amber-500 transition-colors">جميع الأقسام</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-500 transition-colors">سلة المشتريات</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">الأقسام</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/electronics" className="hover:text-amber-500 transition-colors">إلكترونيات</Link></li>
              <li><Link to="/category/fashion" className="hover:text-amber-500 transition-colors">أزياء</Link></li>
              <li><Link to="/category/home-kitchen" className="hover:text-amber-500 transition-colors">المنزل والمطبخ</Link></li>
              <li><Link to="/category/beauty" className="hover:text-amber-500 transition-colors">الجمال والعناية</Link></li>
              <li><Link to="/category/sports" className="hover:text-amber-500 transition-colors">رياضة ولياقة</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">النشرة البريدية</h3>
            <p className="text-sm text-gray-400 mb-3">اشترك للحصول على أحدث العروض والخصومات</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-right"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-700 transition-colors">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} DesinaHub
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>سياسة الخصوصية</span>
            <span>شروط الاستخدام</span>
            <span>سياسة الإرجاع</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
