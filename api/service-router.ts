import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { services } from "@db/schema";
import { eq } from "drizzle-orm";

export const serviceRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(services).orderBy(services.sortOrder);
  }),
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db.select().from(services).where(eq(services.slug, input.slug)).limit(1);
      return result[0] ?? null;
    }),
});
