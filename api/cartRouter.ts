import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { cartItems, products } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const cartRouter = createRouter({
  get: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.sessionId, input.sessionId));

      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const product = await db
            .select()
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1);
          return { ...item, product: product[0] || null };
        })
      );

      const total = itemsWithProducts.reduce(
        (sum, item) => sum + (item.product ? parseFloat(item.product.price.toString()) * item.quantity : 0),
        0
      );

      return { items: itemsWithProducts, total };
    }),

  add: publicQuery
    .input(
      z.object({
        sessionId: z.string(),
        productId: z.number(),
        quantity: z.number().min(1).default(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if item already in cart
      const existing = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.sessionId, input.sessionId),
            eq(cartItems.productId, input.productId)
          )
        )
        .limit(1);

      if (existing[0]) {
        // Update quantity
        await db
          .update(cartItems)
          .set({ quantity: existing[0].quantity + input.quantity })
          .where(eq(cartItems.id, existing[0].id));
        return { success: true, action: "updated" };
      }

      // Insert new item
      await db.insert(cartItems).values({
        sessionId: input.sessionId,
        productId: input.productId,
        quantity: input.quantity,
      });

      return { success: true, action: "added" };
    }),

  updateQuantity: publicQuery
    .input(
      z.object({
        itemId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(cartItems)
        .set({ quantity: input.quantity })
        .where(eq(cartItems.id, input.itemId));
      return { success: true };
    }),

  remove: publicQuery
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cartItems).where(eq(cartItems.id, input.itemId));
      return { success: true };
    }),

  clear: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cartItems).where(eq(cartItems.sessionId, input.sessionId));
      return { success: true };
    }),

  count: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.sessionId, input.sessionId));
      return items.reduce((sum, item) => sum + item.quantity, 0);
    }),
});
