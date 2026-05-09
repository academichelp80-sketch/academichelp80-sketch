import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogPosts } from "@db/schema";
import { eq, desc } from "drizzle-orm";
import { staticBlogPosts } from "./static-blogs";

export const blogRouter = createRouter({
  list: publicQuery.query(async () => {
    try {
      const db = getDb();
      const result = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
      return result.length > 0 ? result : staticBlogPosts;
    } catch {
      return staticBlogPosts;
    }
  }),
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const db = getDb();
        const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, input.slug)).limit(1);
        return result[0] ?? staticBlogPosts.find(b => b.slug === input.slug) ?? null;
      } catch {
        return staticBlogPosts.find(b => b.slug === input.slug) ?? null;
      }
    }),
});
