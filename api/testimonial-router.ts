import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { testimonials } from "@db/schema";
import { eq } from "drizzle-orm";
import { staticTestimonials } from "./static-testimonials";

export const testimonialRouter = createRouter({
  list: publicQuery.query(async () => {
    try {
      const db = getDb();
      const result = await db.select().from(testimonials).orderBy(testimonials.sortOrder);
      return result.length > 0 ? result : staticTestimonials;
    } catch {
      return staticTestimonials;
    }
  }),
  featured: publicQuery.query(async () => {
    try {
      const db = getDb();
      const result = await db.select().from(testimonials).where(eq(testimonials.featured, 1)).orderBy(testimonials.sortOrder);
      return result.length > 0 ? result : staticTestimonials.filter(t => t.featured === 1);
    } catch {
      return staticTestimonials.filter(t => t.featured === 1);
    }
  }),
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      try {
        const db = getDb();
        const result = await db.select().from(testimonials).where(eq(testimonials.id, input.id)).limit(1);
        return result[0] ?? staticTestimonials.find(t => t.id === input.id) ?? null;
      } catch {
        return staticTestimonials.find(t => t.id === input.id) ?? null;
      }
    }),
});
