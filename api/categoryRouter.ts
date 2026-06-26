import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { categories, subcategories, products } from "@db/schema";
import { eq } from "drizzle-orm";

export const categoryRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    const allCategories = await db.select().from(categories).where(eq(categories.isActive, 1));
    return allCategories;
  }),

  bySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const category = await db.select().from(categories).where(eq(categories.slug, input.slug)).limit(1);
      if (!category[0]) return null;

      const subs = await db.select().from(subcategories).where(eq(subcategories.categoryId, category[0].id));
      const prods = await db.select().from(products).where(eq(products.categoryId, category[0].id));

      return { ...category[0], subcategories: subs, products: prods };
    }),

  subcategories: publicQuery
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.select().from(subcategories).where(eq(subcategories.categoryId, input.categoryId));
    }),
});
