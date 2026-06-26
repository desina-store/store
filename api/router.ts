import { createRouter, publicQuery } from "./middleware";
import { categoryRouter } from "./categoryRouter";
import { productRouter } from "./productRouter";
import { cartRouter } from "./cartRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  category: categoryRouter,
  product: productRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
