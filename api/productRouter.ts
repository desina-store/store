import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products, categories, subcategories } from "@db/schema";
import { eq, and, like } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const allProducts = await db.select().from(products).where(eq(products.isActive, 1));
    return allProducts;
  }),

  featured: publicQuery.query(async () => {
    const db = getDb();
    const featuredProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.isActive, 1), eq(products.isFeatured, 1)));
    return featuredProducts;
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const product = await db
        .select()
        .from(products)
        .where(eq(products.slug, input.slug))
        .limit(1);

      if (!product[0]) return null;

      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.id, product[0].categoryId))
        .limit(1);

      const subcategory = product[0].subcategoryId
        ? await db
            .select()
            .from(subcategories)
            .where(eq(subcategories.id, product[0].subcategoryId))
            .limit(1)
        : [];

      // Get related products
      const related = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.categoryId, product[0].categoryId),
            eq(products.isActive, 1)
          )
        )
        .limit(4);

      return {
        ...product[0],
        category: category[0] || null,
        subcategory: subcategory[0] || null,
        relatedProducts: related.filter((r) => r.id !== product[0].id).slice(0, 3),
      };
    }),

  byCategory: publicQuery
    .input(z.object({ categorySlug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const category = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, input.categorySlug))
        .limit(1);

      if (!category[0]) return [];

      return db
        .select()
        .from(products)
        .where(and(eq(products.categoryId, category[0].id), eq(products.isActive, 1)));
    }),

  bySubcategory: publicQuery
    .input(z.object({ subcategorySlug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const subcategory = await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.slug, input.subcategorySlug))
        .limit(1);

      if (!subcategory[0]) return [];

      return db
        .select()
        .from(products)
        .where(and(eq(products.subcategoryId, subcategory[0].id), eq(products.isActive, 1)));
    }),

  search: publicQuery
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(products)
        .where(like(products.nameAr, `%${input.query}%`));
    }),
});
