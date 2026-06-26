import { getDb } from "../api/queries/connection";
import { categories, subcategories, products } from "./schema";

const db = getDb();

const categoriesData = [
  { nameAr: "إلكترونيات", nameEn: "Electronics", slug: "electronics", icon: "Cpu", color: "#3b82f6", description: "أحدث الأجهزة الإلكترونية والتقنية", sortOrder: 1 },
  { nameAr: "أزياء", nameEn: "Fashion", slug: "fashion", icon: "Shirt", color: "#ec4899", description: "ملابس وأزياء للرجال والنساء والأطفال", sortOrder: 2 },
  { nameAr: "المنزل والمطبخ", nameEn: "Home & Kitchen", slug: "home-kitchen", icon: "Home", color: "#f59e0b", description: "أثاث وديكور وأدوات منزلية", sortOrder: 3 },
  { nameAr: "الجمال والعناية", nameEn: "Beauty", slug: "beauty", icon: "Sparkles", color: "#8b5cf6", description: "منتجات التجميل والعناية الشخصية", sortOrder: 4 },
  { nameAr: "رياضة ولياقة", nameEn: "Sports", slug: "sports", icon: "Dumbbell", color: "#10b981", description: "معدات رياضية وملابس رياضية", sortOrder: 5 },
  { nameAr: "ألعاب وأطفال", nameEn: "Toys & Kids", slug: "toys-kids", icon: "Gamepad2", color: "#f97316", description: "ألعاب وهدايا للأطفال", sortOrder: 6 },
  { nameAr: "كتب وقرطاسية", nameEn: "Books", slug: "books", icon: "BookOpen", color: "#6366f1", description: "كتب ومكتبات وقرطاسية", sortOrder: 7 },
  { nameAr: "بقالة وطعام", nameEn: "Grocery", slug: "grocery", icon: "Apple", color: "#ef4444", description: "مواد غذائية ومشروبات", sortOrder: 8 },
];

const subcategoriesData = [
  { categorySlug: "electronics", nameAr: "هواتف ذكية", nameEn: "Smartphones", slug: "smartphones", icon: "Smartphone", sortOrder: 1 },
  { categorySlug: "electronics", nameAr: "لابتوبات", nameEn: "Laptops", slug: "laptops", icon: "Laptop", sortOrder: 2 },
  { categorySlug: "electronics", nameAr: "أجهزة منزلية", nameEn: "Home Appliances", slug: "home-appliances", icon: "Tv", sortOrder: 3 },
  { categorySlug: "fashion", nameAr: "ملابس رجالية", nameEn: "Men's Clothing", slug: "mens-clothing", icon: "User", sortOrder: 1 },
  { categorySlug: "fashion", nameAr: "ملابس نسائية", nameEn: "Women's Clothing", slug: "womens-clothing", icon: "Heart", sortOrder: 2 },
  { categorySlug: "fashion", nameAr: "إكسسوارات", nameEn: "Accessories", slug: "accessories", icon: "Glasses", sortOrder: 3 },
  { categorySlug: "home-kitchen", nameAr: "أثاث", nameEn: "Furniture", slug: "furniture", icon: "Sofa", sortOrder: 1 },
  { categorySlug: "home-kitchen", nameAr: "أدوات مطبخ", nameEn: "Kitchen Tools", slug: "kitchen-tools", icon: "ChefHat", sortOrder: 2 },
  { categorySlug: "home-kitchen", nameAr: "ديكور", nameEn: "Decor", slug: "decor", icon: "Lamp", sortOrder: 3 },
  { categorySlug: "beauty", nameAr: "عطور", nameEn: "Perfumes", slug: "perfumes", icon: "Droplets", sortOrder: 1 },
  { categorySlug: "beauty", nameAr: "مكياج", nameEn: "Makeup", slug: "makeup", icon: "Paintbrush", sortOrder: 2 },
  { categorySlug: "beauty", nameAr: "عناية بالشعر", nameEn: "Hair Care", slug: "hair-care", icon: "Scissors", sortOrder: 3 },
  { categorySlug: "sports", nameAr: "معدات رياضية", nameEn: "Equipment", slug: "equipment", icon: "CircleDot", sortOrder: 1 },
  { categorySlug: "sports", nameAr: "ملابس رياضية", nameEn: "Sportswear", slug: "sportswear", icon: "Flag", sortOrder: 2 },
  { categorySlug: "sports", nameAr: "مكملات غذائية", nameEn: "Supplements", slug: "supplements", icon: "Pill", sortOrder: 3 },
  { categorySlug: "toys-kids", nameAr: "ألعاب تعليمية", nameEn: "Educational", slug: "educational", icon: "Lightbulb", sortOrder: 1 },
  { categorySlug: "toys-kids", nameAr: "ألعاب إلكترونية", nameEn: "Electronic Toys", slug: "electronic-toys", icon: "Battery", sortOrder: 2 },
  { categorySlug: "toys-kids", nameAr: "هدايا أطفال", nameEn: "Gifts", slug: "gifts", icon: "Gift", sortOrder: 3 },
  { categorySlug: "books", nameAr: "كتب علمية", nameEn: "Science", slug: "science", icon: "FlaskConical", sortOrder: 1 },
  { categorySlug: "books", nameAr: "روايات", nameEn: "Novels", slug: "novels", icon: "Feather", sortOrder: 2 },
  { categorySlug: "books", nameAr: "قرطاسية", nameEn: "Stationery", slug: "stationery", icon: "Pen", sortOrder: 3 },
  { categorySlug: "grocery", nameAr: "مشروبات", nameEn: "Beverages", slug: "beverages", icon: "Coffee", sortOrder: 1 },
  { categorySlug: "grocery", nameAr: "مأكولات جاهزة", nameEn: "Ready Meals", slug: "ready-meals", icon: "Soup", sortOrder: 2 },
  { categorySlug: "grocery", nameAr: "حلويات وكعك", nameEn: "Sweets", slug: "sweets", icon: "Cookie", sortOrder: 3 },
];

const productsData = [
  { categorySlug: "electronics", subcategorySlug: "smartphones", nameAr: "آيفون 15 برو ماكس", nameEn: "iPhone 15 Pro Max", slug: "iphone-15-pro-max", description: "أحدث هاتف من آبل مع معالج A17 Pro وشاشة 6.7 بوصة", price: "4599.00", oldPrice: "4999.00", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop", stock: 15, rating: "4.8", reviewsCount: 120, isFeatured: 1 },
  { categorySlug: "electronics", subcategorySlug: "smartphones", nameAr: "سامسونج جالكسي S24", nameEn: "Samsung Galaxy S24", slug: "samsung-galaxy-s24", description: "هاتف ذكي بشاشة AMOLED وكاميرا 200 ميجابكسل", price: "3299.00", oldPrice: "3699.00", image: "https://images.unsplash.com/photo-1610945265078-386f35d2281a?w=400&h=400&fit=crop", stock: 20, rating: "4.7", reviewsCount: 85, isFeatured: 1 },
  { categorySlug: "electronics", subcategorySlug: "smartphones", nameAr: "شاومي 14 الترا", nameEn: "Xiaomi 14 Ultra", slug: "xiaomi-14-ultra", description: "هاتف فاخر بكاميرا لايكا وبطارية 5000mAh", price: "2899.00", oldPrice: "3299.00", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", stock: 10, rating: "4.6", reviewsCount: 64, isFeatured: 0 },
  { categorySlug: "electronics", subcategorySlug: "laptops", nameAr: "ماك بوك برو 16", nameEn: "MacBook Pro 16", slug: "macbook-pro-16", description: "لابتوب احترافي مع معالج M3 Pro وشاشة Retina", price: "7499.00", oldPrice: "8299.00", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", stock: 8, rating: "4.9", reviewsCount: 200, isFeatured: 1 },
  { categorySlug: "electronics", subcategorySlug: "laptops", nameAr: "ديل إكس بي إس 15", nameEn: "Dell XPS 15", slug: "dell-xps-15", description: "لابتوب رفيع وخفيف مع شاشة 4K تعمل باللمس", price: "5899.00", oldPrice: "6499.00", image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=400&h=400&fit=crop", stock: 12, rating: "4.7", reviewsCount: 95, isFeatured: 0 },
  { categorySlug: "electronics", subcategorySlug: "laptops", nameAr: "لينوفو ثينك باد", nameEn: "Lenovo ThinkPad X1", slug: "lenovo-thinkpad-x1", description: "لابتوب أعمال فاخر بمعالج Intel Core i7", price: "5299.00", oldPrice: "5799.00", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop", stock: 7, rating: "4.6", reviewsCount: 78, isFeatured: 0 },
  { categorySlug: "electronics", subcategorySlug: "home-appliances", nameAr: "تلفزيون سمارت 65 بوصة", nameEn: "65\" Smart TV", slug: "smart-tv-65", description: "تلفزيون ذكي بدقة 4K مع نظام أندرويد", price: "2599.00", oldPrice: "3099.00", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", stock: 6, rating: "4.5", reviewsCount: 45, isFeatured: 0 },
  { categorySlug: "electronics", subcategorySlug: "home-appliances", nameAr: "مكيف سبليت 18000", nameEn: "18000 BTU Split AC", slug: "split-ac-18000", description: "مكيف هواء splits مع تقنية توفير الطاقة", price: "1899.00", oldPrice: "2199.00", image: "https://images.unsplash.com/photo-1631545308772-81a0e0a3a6eb?w=400&h=400&fit=crop", stock: 9, rating: "4.4", reviewsCount: 32, isFeatured: 0 },
  { categorySlug: "electronics", subcategorySlug: "home-appliances", nameAr: "غسالة أوتوماتيك", nameEn: "Automatic Washer", slug: "automatic-washer", description: "غسالة فول أوتوماتيك 8 كجم مع مجفف", price: "2199.00", oldPrice: "2599.00", image: "https://images.unsplash.com/photo-1626806775351-538068a21838?w=400&h=400&fit=crop", stock: 5, rating: "4.6", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "mens-clothing", nameAr: "قميص كلاسيكي أبيض", nameEn: "Classic White Shirt", slug: "classic-white-shirt", description: "قميص رسمي 100% قطن، مناسب للمناسبات", price: "149.00", oldPrice: "199.00", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", stock: 50, rating: "4.5", reviewsCount: 120, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "mens-clothing", nameAr: "جينز كلاسيكي", nameEn: "Classic Jeans", slug: "classic-jeans", description: "بنطلون جينز عالي الجودة بقصة كلاسيكية", price: "199.00", oldPrice: "249.00", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&h=400&fit=crop", stock: 40, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "mens-clothing", nameAr: "بدلة رسمية", nameEn: "Formal Suit", slug: "formal-suit", description: "بدلة رسمية أنيقة للمناسبات والعمل", price: "599.00", oldPrice: "799.00", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop", stock: 15, rating: "4.7", reviewsCount: 45, isFeatured: 1 },
  { categorySlug: "fashion", subcategorySlug: "womens-clothing", nameAr: "فستان سهرة", nameEn: "Evening Dress", slug: "evening-dress", description: "فستان أنيق للسهرات والمناسبات الخاصة", price: "349.00", oldPrice: "449.00", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop", stock: 20, rating: "4.6", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "womens-clothing", nameAr: "بلوزة حريرية", nameEn: "Silk Blouse", slug: "silk-blouse", description: "بلوزة فاخرة من الحرير الطبيعي", price: "179.00", oldPrice: "229.00", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop", stock: 30, rating: "4.5", reviewsCount: 78, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "womens-clothing", nameAr: "عباية فاخرة", nameEn: "Luxury Abaya", slug: "luxury-abaya", description: "عباية أنيقة بتصميم عصري وفاخر", price: "289.00", oldPrice: "369.00", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop", stock: 25, rating: "4.8", reviewsCount: 112, isFeatured: 1 },
  { categorySlug: "fashion", subcategorySlug: "accessories", nameAr: "ساعة يد فاخرة", nameEn: "Luxury Watch", slug: "luxury-watch", description: "ساعة يد أنيقة بحركة سويسرية", price: "899.00", oldPrice: "1199.00", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", stock: 10, rating: "4.7", reviewsCount: 34, isFeatured: 1 },
  { categorySlug: "fashion", subcategorySlug: "accessories", nameAr: "نظارة شمسية", nameEn: "Sunglasses", slug: "sunglasses", description: "نظارة شمسية بولارايزد من ماركة عالمية", price: "249.00", oldPrice: "349.00", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", stock: 35, rating: "4.3", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "fashion", subcategorySlug: "accessories", nameAr: "حقيبة جلدية", nameEn: "Leather Bag", slug: "leather-bag", description: "حقيبة يد من الجلد الطبيعي الفاخر", price: "459.00", oldPrice: "599.00", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", stock: 18, rating: "4.6", reviewsCount: 43, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "furniture", nameAr: "كنبة ثلاثية", nameEn: "3-Seater Sofa", slug: "3-seater-sofa", description: "كنبة مريحة بتصميم عصري وقماش فاخر", price: "1899.00", oldPrice: "2299.00", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop", stock: 5, rating: "4.6", reviewsCount: 38, isFeatured: 1 },
  { categorySlug: "home-kitchen", subcategorySlug: "furniture", nameAr: "طاولة طعام", nameEn: "Dining Table", slug: "dining-table", description: "طاولة طعام خشبية بـ 6 كراسي", price: "1299.00", oldPrice: "1599.00", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop", stock: 3, rating: "4.5", reviewsCount: 22, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "furniture", nameAr: "سرير ماستر", nameEn: "Master Bed", slug: "master-bed", description: "سرير كينج سايز مع مرتبة طبية", price: "2499.00", oldPrice: "2999.00", image: "https://images.unsplash.com/photo-1505693416388-b0346efee535?w=400&h=400&fit=crop", stock: 4, rating: "4.7", reviewsCount: 29, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "kitchen-tools", nameAr: "خلاط كهربائي", nameEn: "Electric Blender", slug: "electric-blender", description: "خلاط متعدد السرعات بقدرة 1000 واط", price: "249.00", oldPrice: "329.00", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop", stock: 25, rating: "4.4", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "kitchen-tools", nameAr: "مقلاة هوائية", nameEn: "Air Fryer", slug: "air-fryer", description: "مقلاة هوائية بدون زيت سعة 5.5 لتر", price: "349.00", oldPrice: "449.00", image: "https://images.unsplash.com/photo-1626147116986-4601771470a6?w=400&h=400&fit=crop", stock: 18, rating: "4.6", reviewsCount: 89, isFeatured: 1 },
  { categorySlug: "home-kitchen", subcategorySlug: "kitchen-tools", nameAr: "طقم أواني طهي", nameEn: "Cookware Set", slug: "cookware-set", description: "طقم أواني طهي غير لاصقة 12 قطعة", price: "399.00", oldPrice: "549.00", image: "https://images.unsplash.com/photo-1584992236310-6eddd47e51f5?w=400&h=400&fit=crop", stock: 12, rating: "4.5", reviewsCount: 45, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "decor", nameAr: "ساعة حائط فنية", nameEn: "Art Wall Clock", slug: "art-wall-clock", description: "ساعة حائط بتصميم فني عصري", price: "89.00", oldPrice: "129.00", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop", stock: 40, rating: "4.3", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "decor", nameAr: "مرآة ديكور", nameEn: "Decor Mirror", slug: "decor-mirror", description: "مرآة جدارية بتصميم أنيق", price: "159.00", oldPrice: "199.00", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop", stock: 20, rating: "4.5", reviewsCount: 34, isFeatured: 0 },
  { categorySlug: "home-kitchen", subcategorySlug: "decor", nameAr: "إضاءة ليد", nameEn: "LED Lighting", slug: "led-lighting", description: "مصابيح ليد ديكور بألوان متعددة", price: "129.00", oldPrice: "179.00", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=400&fit=crop", stock: 30, rating: "4.4", reviewsCount: 78, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "perfumes", nameAr: "عطر عود فاخر", nameEn: "Luxury Oud Perfume", slug: "luxury-oud", description: "عطر شرقي فاخر بخلاصة العود", price: "459.00", oldPrice: "599.00", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", stock: 15, rating: "4.8", reviewsCount: 89, isFeatured: 1 },
  { categorySlug: "beauty", subcategorySlug: "perfumes", nameAr: "عطر فرنش", nameEn: "French Perfume", slug: "french-perfume", description: "عطر فرنسي أصيل برائحة زهرية", price: "349.00", oldPrice: "449.00", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop", stock: 20, rating: "4.6", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "perfumes", nameAr: "عطر مسك", nameEn: "Musk Perfume", slug: "musk-perfume", description: "عطر مسك فاخر بثبات 24 ساعة", price: "289.00", oldPrice: "369.00", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop", stock: 25, rating: "4.7", reviewsCount: 112, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "makeup", nameAr: "باليت ظلال عيون", nameEn: "Eyeshadow Palette", slug: "eyeshadow-palette", description: "باليت 40 لون ظلال عيون بألوان مائية", price: "129.00", oldPrice: "179.00", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", stock: 30, rating: "4.5", reviewsCount: 145, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "makeup", nameAr: "أحمر شفاه فاخر", nameEn: "Luxury Lipstick", slug: "luxury-lipstick", description: "أحمر شفاه طويل الأمد بترطيب عالي", price: "89.00", oldPrice: "129.00", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", stock: 50, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "makeup", nameAr: "ماسكرا مائية", nameEn: "Waterproof Mascara", slug: "waterproof-mascara", description: "ماسكرا مقاومة للماء بحجم XL", price: "69.00", oldPrice: "99.00", image: "https://images.unsplash.com/photo-1631214524115-6f8eb1beb6c5?w=400&h=400&fit=crop", stock: 40, rating: "4.3", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "hair-care", nameAr: "مجفف شعر احترافي", nameEn: "Professional Hair Dryer", slug: "hair-dryer", description: "مجفف شعر بقوة 2200 واط مع أيونات", price: "199.00", oldPrice: "269.00", image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop", stock: 20, rating: "4.5", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "hair-care", nameAr: "شامبو طبيعي", nameEn: "Natural Shampoo", slug: "natural-shampoo", description: "شامبو عشبي طبيعي لجميع أنواع الشعر", price: "49.00", oldPrice: "69.00", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", stock: 60, rating: "4.4", reviewsCount: 123, isFeatured: 0 },
  { categorySlug: "beauty", subcategorySlug: "hair-care", nameAr: "مكواة تمليس", nameEn: "Hair Straightener", slug: "hair-straightener", description: "مكواة تمليس شعر بالسيراميك", price: "149.00", oldPrice: "199.00", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop", stock: 15, rating: "4.6", reviewsCount: 45, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "equipment", nameAr: "طقم دمبلز", nameEn: "Dumbbells Set", slug: "dumbbells-set", description: "طقم دمبلز قابل للتعديل 2.5-24 كجم", price: "349.00", oldPrice: "449.00", image: "https://images.unsplash.com/photo-1632167764165-74a3d685e9f4?w=400&h=400&fit=crop", stock: 10, rating: "4.6", reviewsCount: 34, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "equipment", nameAr: "سير جري كهربائي", nameEn: "Treadmill", slug: "treadmill", description: "سير جري منزلي مع شاشة LCD", price: "1899.00", oldPrice: "2299.00", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop", stock: 4, rating: "4.5", reviewsCount: 28, isFeatured: 1 },
  { categorySlug: "sports", subcategorySlug: "equipment", nameAr: "كرة يوجا", nameEn: "Yoga Ball", slug: "yoga-ball", description: "كرة يوجا مقاومة للانفجار 65 سم", price: "49.00", oldPrice: "79.00", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=400&h=400&fit=crop", stock: 25, rating: "4.3", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "sportswear", nameAr: "حذاء رياضي", nameEn: "Running Shoes", slug: "running-shoes", description: "حذاء رياضي مريح للجري والمشي", price: "299.00", oldPrice: "399.00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", stock: 30, rating: "4.6", reviewsCount: 178, isFeatured: 1 },
  { categorySlug: "sports", subcategorySlug: "sportswear", nameAr: "طقم رياضي", nameEn: "Sports Set", slug: "sports-set", description: "طقم رياضي كامل للرجال", price: "179.00", oldPrice: "249.00", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&h=400&fit=crop", stock: 20, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "sportswear", nameAr: "حقيبة رياضية", nameEn: "Gym Bag", slug: "gym-bag", description: "حقيبة رياضية بسعة 40 لتر", price: "99.00", oldPrice: "149.00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", stock: 35, rating: "4.5", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "supplements", nameAr: "واي بروتين", nameEn: "Whey Protein", slug: "whey-protein", description: "بروتين مصل اللبن بنكهة الشوكولاتة 2 كجم", price: "189.00", oldPrice: "249.00", image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=400&fit=crop", stock: 40, rating: "4.5", reviewsCount: 234, isFeatured: 1 },
  { categorySlug: "sports", subcategorySlug: "supplements", nameAr: "كرياتين مونوهيدرات", nameEn: "Creatine", slug: "creatine", description: "كرياتين نقي 100% 500 جرام", price: "99.00", oldPrice: "149.00", image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop", stock: 30, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "sports", subcategorySlug: "supplements", nameAr: "فيتامينات متعددة", nameEn: "Multivitamins", slug: "multivitamins", description: "فيتامينات ومعادن شاملة 120 كبسولة", price: "79.00", oldPrice: "119.00", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop", stock: 50, rating: "4.3", reviewsCount: 156, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "educational", nameAr: "لعبة تركيب روبوت", nameEn: "Robot Building Kit", slug: "robot-kit", description: "مجموعة تركيب روبوت تعليمية 237 قطعة", price: "229.00", oldPrice: "299.00", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop", stock: 15, rating: "4.7", reviewsCount: 45, isFeatured: 1 },
  { categorySlug: "toys-kids", subcategorySlug: "educational", nameAr: "لعبة أحجية خشبية", nameEn: "Wooden Puzzle", slug: "wooden-puzzle", description: "أحجية خشبية تعليمية للأطفال 3-6 سنوات", price: "59.00", oldPrice: "89.00", image: "https://images.unsplash.com/photo-1596502390327-8b6c9e12ce97?w=400&h=400&fit=crop", stock: 40, rating: "4.4", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "educational", nameAr: "لوحة رسم تفاعلية", nameEn: "Interactive Drawing Board", slug: "drawing-board", description: "لوحة رسم ذكية بشاشة LCD", price: "89.00", oldPrice: "129.00", image: "https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?w=400&h=400&fit=crop", stock: 25, rating: "4.5", reviewsCount: 34, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "electronic-toys", nameAr: "سيارة ريموت كنترول", nameEn: "RC Car", slug: "rc-car", description: "سيارة تحكم عن بعد بسرعة 30 كم/س", price: "179.00", oldPrice: "249.00", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop", stock: 12, rating: "4.6", reviewsCount: 56, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "electronic-toys", nameAr: "طائرة درون", nameEn: "Drone", slug: "drone", description: "درون صغير بكاميرا HD", price: "349.00", oldPrice: "449.00", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop", stock: 8, rating: "4.5", reviewsCount: 34, isFeatured: 1 },
  { categorySlug: "toys-kids", subcategorySlug: "electronic-toys", nameAr: "جهاز ألعاب محمول", nameEn: "Handheld Game", slug: "handheld-game", description: "جهاز ألعاب محمول بـ 500 لعبة كلاسيكية", price: "129.00", oldPrice: "179.00", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=400&h=400&fit=crop", stock: 20, rating: "4.3", reviewsCount: 78, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "gifts", nameAr: "دمية دب عملاقة", nameEn: "Giant Teddy Bear", slug: "giant-teddy", description: "دب محشو عملاق 120 سم", price: "149.00", oldPrice: "199.00", image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=400&h=400&fit=crop", stock: 18, rating: "4.7", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "gifts", nameAr: "مجموعة قصص", nameEn: "Story Book Set", slug: "story-book-set", description: "مجموعة 10 قصص مصورة للأطفال", price: "79.00", oldPrice: "109.00", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop", stock: 30, rating: "4.5", reviewsCount: 45, isFeatured: 0 },
  { categorySlug: "toys-kids", subcategorySlug: "gifts", nameAr: "لعبة مجسمات", nameEn: "Action Figures", slug: "action-figures", description: "مجسمات شخصيات خارقة مجموعة 6 قطع", price: "99.00", oldPrice: "139.00", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=400&fit=crop", stock: 22, rating: "4.4", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "science", nameAr: "كتاب الفيزياء الكونية", nameEn: "Cosmic Physics", slug: "cosmic-physics", description: "رحلة مذهلة في أعماق الكون", price: "69.00", oldPrice: "99.00", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", stock: 35, rating: "4.6", reviewsCount: 23, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "science", nameAr: "علم النفس الإيجابي", nameEn: "Positive Psychology", slug: "positive-psychology", description: "أسرار السعادة والنجاح في الحياة", price: "59.00", oldPrice: "79.00", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop", stock: 25, rating: "4.5", reviewsCount: 34, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "science", nameAr: "تاريخ العلوم", nameEn: "History of Science", slug: "history-science", description: "من أرسطو إلى أينشتاين", price: "79.00", oldPrice: "109.00", image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=400&fit=crop", stock: 20, rating: "4.7", reviewsCount: 18, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "novels", nameAr: "رواية الخيميائي", nameEn: "The Alchemist", slug: "the-alchemist", description: "رواية باولو كويلو الخالدة", price: "49.00", oldPrice: "69.00", image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop", stock: 40, rating: "4.8", reviewsCount: 567, isFeatured: 1 },
  { categorySlug: "books", subcategorySlug: "novels", nameAr: "مئة عام من العزلة", nameEn: "100 Years of Solitude", slug: "100-years-solitude", description: "رواية غابرييل غارسيا ماركلز", price: "59.00", oldPrice: "79.00", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop", stock: 30, rating: "4.7", reviewsCount: 234, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "novels", nameAr: "جريمة في قطار الشرق", nameEn: "Murder on Orient Express", slug: "murder-orient", description: "رواية أجاثا كريستي المثيرة", price: "39.00", oldPrice: "59.00", image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=400&fit=crop", stock: 45, rating: "4.6", reviewsCount: 178, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "stationery", nameAr: "طقم أقلام فاخر", nameEn: "Luxury Pen Set", slug: "luxury-pen-set", description: "طقم أقلام حبر فاخرة 5 قطع", price: "89.00", oldPrice: "129.00", image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=400&fit=crop", stock: 20, rating: "4.5", reviewsCount: 45, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "stationery", nameAr: "دفتر يوميات جلد", nameEn: "Leather Journal", slug: "leather-journal", description: "دفتر يوميات بغلاف جلدي فاخر", price: "59.00", oldPrice: "89.00", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop", stock: 30, rating: "4.4", reviewsCount: 67, isFeatured: 0 },
  { categorySlug: "books", subcategorySlug: "stationery", nameAr: "منظم مكتبي خشبي", nameEn: "Wooden Desk Organizer", slug: "desk-organizer", description: "منظم مكتبي خشبي أنيق", price: "79.00", oldPrice: "109.00", image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=400&h=400&fit=crop", stock: 15, rating: "4.3", reviewsCount: 34, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "beverages", nameAr: "قهوة عربية فاخرة", nameEn: "Arabic Coffee", slug: "arabic-coffee", description: "قهوة عربية خلطة خاصة 500 جرام", price: "69.00", oldPrice: "89.00", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop", stock: 50, rating: "4.7", reviewsCount: 189, isFeatured: 1 },
  { categorySlug: "grocery", subcategorySlug: "beverages", nameAr: "شاي أخضر عضوي", nameEn: "Organic Green Tea", slug: "green-tea", description: "شاي أخضر عضوي 100 كيس", price: "29.00", oldPrice: "39.00", image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=400&fit=crop", stock: 60, rating: "4.5", reviewsCount: 145, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "beverages", nameAr: "عصير طبيعي مشكل", nameEn: "Natural Juice Pack", slug: "natural-juice", description: "طقم عصائر طبيعية 6 علب", price: "39.00", oldPrice: "49.00", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop", stock: 40, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "ready-meals", nameAr: "أرز برياني جاهز", nameEn: "Ready Biryani", slug: "ready-biryani", description: "أرز برياني هندي جاهز بطريقة تقليدية", price: "25.00", oldPrice: "35.00", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=400&fit=crop", stock: 80, rating: "4.3", reviewsCount: 234, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "ready-meals", nameAr: "شوربة عدس", nameEn: "Lentil Soup", slug: "lentil-soup", description: "شوربة عدس تركية جاهزة", price: "15.00", oldPrice: "20.00", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop", stock: 70, rating: "4.2", reviewsCount: 156, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "ready-meals", nameAr: "باستا Alfredo", nameEn: "Alfredo Pasta", slug: "alfredo-pasta", description: "باستا الفريدو الإيطالية الجاهزة", price: "22.00", oldPrice: "29.00", image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=400&h=400&fit=crop", stock: 60, rating: "4.4", reviewsCount: 89, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "sweets", nameAr: "شوكولاتة فاخرة", nameEn: "Luxury Chocolate", slug: "luxury-chocolate", description: "شوكولاتة بلجيكية فاخرة 250 جرام", price: "59.00", oldPrice: "79.00", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop", stock: 45, rating: "4.8", reviewsCount: 312, isFeatured: 1 },
  { categorySlug: "grocery", subcategorySlug: "sweets", nameAr: "تمر خلاص فاخر", nameEn: "Khalas Dates", slug: "khalas-dates", description: "تمر خلاص الإماراتي الفاخر 1 كجم", price: "49.00", oldPrice: "69.00", image: "https://images.unsplash.com/photo-1596380862374-ad7fa9407822?w=400&h=400&fit=crop", stock: 55, rating: "4.7", reviewsCount: 267, isFeatured: 0 },
  { categorySlug: "grocery", subcategorySlug: "sweets", nameAr: "بقلاوة تركية", nameEn: "Turkish Baklava", slug: "turkish-baklava", description: "بقلاوة تركية فاخرة بالفستق", price: "69.00", oldPrice: "89.00", image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=400&fit=crop", stock: 35, rating: "4.6", reviewsCount: 178, isFeatured: 0 },
];

async function seed() {
  console.log("Seeding database...");

  // Insert categories
  for (const cat of categoriesData) {
    await db.insert(categories).values(cat).onDuplicateKeyUpdate({ set: cat });
  }
  console.log("Categories seeded!");

  // Get all categories for mapping
  const allCategories = await db.select().from(categories);
  const catMap = new Map(allCategories.map((c) => [c.slug, c.id]));

  // Insert subcategories
  for (const sub of subcategoriesData) {
    const categoryId = catMap.get(sub.categorySlug);
    if (categoryId) {
      await db.insert(subcategories)
        .values({
          categoryId,
          nameAr: sub.nameAr,
          nameEn: sub.nameEn,
          slug: sub.slug,
          icon: sub.icon,
          sortOrder: sub.sortOrder,
        })
        .onDuplicateKeyUpdate({
          set: {
            nameAr: sub.nameAr,
            nameEn: sub.nameEn,
            categoryId,
            sortOrder: sub.sortOrder,
          },
        });
    }
  }
  console.log("Subcategories seeded!");

  // Get all subcategories for mapping
  const allSubcategories = await db.select().from(subcategories);
  const subMap = new Map(allSubcategories.map((s) => [s.slug, s.id]));

  // Insert products in batches
  for (let i = 0; i < productsData.length; i++) {
    const prod = productsData[i];
    const categoryId = catMap.get(prod.categorySlug);
    const subcategoryId = subMap.get(prod.subcategorySlug);
    if (categoryId && subcategoryId) {
      await db.insert(products)
        .values({
          categoryId,
          subcategoryId,
          nameAr: prod.nameAr,
          nameEn: prod.nameEn,
          slug: prod.slug,
          description: prod.description,
          price: prod.price,
          oldPrice: prod.oldPrice,
          image: prod.image,
          stock: prod.stock,
          rating: prod.rating,
          reviewsCount: prod.reviewsCount,
          isFeatured: prod.isFeatured,
        })
        .onDuplicateKeyUpdate({
          set: {
            nameAr: prod.nameAr,
            nameEn: prod.nameEn,
            categoryId,
            subcategoryId,
            price: prod.price,
            oldPrice: prod.oldPrice,
            image: prod.image,
            stock: prod.stock,
            rating: prod.rating,
            reviewsCount: prod.reviewsCount,
            isFeatured: prod.isFeatured,
          },
        });
    }
  }
  console.log("Products seeded!");
  console.log("Seed completed successfully!");
}

seed().then(() => {
  console.log("Done");
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
