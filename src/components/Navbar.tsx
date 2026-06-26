import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Cpu,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  BookOpen,
  Apple,
  ChevronDown,
  Store,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Dumbbell: <Dumbbell className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("desinahub_session") || "";

  const { data: categories } = trpc.category.list.useQuery();
  const { data: cartCount } = trpc.cart.count.useQuery({ sessionId });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-1.5 text-sm">
        توصيل مجاني للطلبات فوق 200 ريال | خصم 20% على أول طلب
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                DesinaHub
              </span>
              <span className="text-[10px] text-gray-500 -mt-1">متجرك الإلكتروني</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتجات..."
                className="w-full pr-4 pl-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-right transition-all"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white hover:bg-amber-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <Link
              to="/cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount ? (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتجات..."
                className="w-full pr-4 pl-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 text-right"
              />
              <button
                type="submit"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Categories Menu */}
      <div className="border-t border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-1 py-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors text-sm font-medium"
            >
              الرئيسية
            </Link>
            <Link
              to="/categories"
              className="px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors text-sm font-medium"
            >
              جميع الأقسام
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors text-sm font-medium">
                الأقسام
                <ChevronDown className="w-3 h-3" />
              </button>

              {dropdownOpen && categories && (
                <div className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: cat.color }}
                      >
                        {iconMap[cat.icon] || <Store className="w-4 h-4" />}
                      </div>
                      <span className="text-sm text-gray-700">{cat.nameAr}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="p-4 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              الرئيسية
            </Link>
            <Link
              to="/categories"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              جميع الأقسام
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="px-4 text-xs text-gray-400 mb-2">الأقسام</p>
              {categories?.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    {iconMap[cat.icon] || <Store className="w-4 h-4" />}
                  </div>
                  <span className="text-gray-700">{cat.nameAr}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
