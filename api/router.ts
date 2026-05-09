import { localAuthRouter } from "./local-auth-router";
import { serviceRouter } from "./service-router";
import { testimonialRouter } from "./testimonial-router";
import { blogRouter } from "./blog-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: localAuthRouter,
  service: serviceRouter,
  testimonial: testimonialRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
