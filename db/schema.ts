import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Local Users (username/password auth)
export const localUsers = mysqlTable("localUsers", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type LocalUser = typeof localUsers.$inferSelect;
export type InsertLocalUser = typeof localUsers.$inferInsert;

// ── Services ────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleHi: varchar("titleHi", { length: 255 }),
  shortDescEn: text("shortDescEn").notNull(),
  shortDescHi: text("shortDescHi"),
  fullDescEn: text("fullDescEn").notNull(),
  fullDescHi: text("fullDescHi"),
  icon: varchar("icon", { length: 50 }),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// ── Blog Posts ───────────────────────────────────────────────
export const blogPosts = mysqlTable("blogPosts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleHi: varchar("titleHi", { length: 255 }),
  excerptEn: text("excerptEn").notNull(),
  excerptHi: text("excerptHi"),
  contentEn: text("contentEn").notNull(),
  contentHi: text("contentHi"),
  category: varchar("category", { length: 100 }),
  image: varchar("image", { length: 500 }),
  tags: text("tags"),
  readTime: int("readTime").default(5),
  published: int("published").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

// ── Testimonials ──────────────────────────────────────────────
export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  designation: varchar("designation", { length: 255 }),
  university: varchar("university", { length: 255 }),
  contentEn: text("contentEn").notNull(),
  contentHi: text("contentHi"),
  rating: int("rating").default(5),
  avatar: varchar("avatar", { length: 500 }),
  featured: int("featured").default(0),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// ── Inquiries (WhatsApp submissions) ──────────────────────────
export const inquiries = mysqlTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  title: text("title").notNull(),
  objectives: text("objectives"),
  methodology: text("methodology"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;

// ── Payments ──────────────────────────────────────────────────
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  userName: varchar("userName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  amount: varchar("amount", { length: 50 }).notNull(),
  upiTransactionId: varchar("upiTransactionId", { length: 255 }),
  upiId: varchar("upiId", { length: 255 }).default("Mejustrana@ybl"),
  service: varchar("service", { length: 255 }),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

// ── Legacy tables (for backward compatibility) ────────────────

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

export const profileBio = mysqlTable("profileBio", {
  id: int("id").default(1).primaryKey(),
  zhText: text("zhText").notNull(),
  enText: text("enText").notNull(),
  email: varchar("email", { length: 320 }),
  instagram: varchar("instagram", { length: 500 }),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProfileBio = typeof profileBio.$inferSelect;
export type InsertProfileBio = typeof profileBio.$inferInsert;

export const cvEntries = mysqlTable("cvEntries", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 50 }).notNull(),
  zhTitle: varchar("zhTitle", { length: 255 }).notNull(),
  zhSubtitle: varchar("zhSubtitle", { length: 255 }),
  enTitle: varchar("enTitle", { length: 255 }).notNull(),
  enSubtitle: varchar("enSubtitle", { length: 255 }),
  year: varchar("year", { length: 50 }).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type CvEntry = typeof cvEntries.$inferSelect;
export type InsertCvEntry = typeof cvEntries.$inferInsert;

export const siteSettings = mysqlTable("siteSettings", {
  id: int("id").default(1).primaryKey(),
  avatarImage: varchar("avatarImage", { length: 500 }).default("/images/portrait.jpg"),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  year: varchar("year", { length: 10 }).notNull(),
  image: varchar("image", { length: 500 }).notNull(),
  sortOrder: int("sortOrder").default(0),
  zhTitle: varchar("zhTitle", { length: 255 }).notNull(),
  zhSubtitle: varchar("zhSubtitle", { length: 255 }).notNull(),
  zhCollection: varchar("zhCollection", { length: 255 }).notNull(),
  zhContent: text("zhContent").notNull(),
  zhDetailContent: text("zhDetailContent").notNull(),
  enTitle: varchar("enTitle", { length: 255 }).notNull(),
  enSubtitle: varchar("enSubtitle", { length: 255 }).notNull(),
  enCollection: varchar("enCollection", { length: 255 }).notNull(),
  enContent: text("enContent").notNull(),
  enDetailContent: text("enDetailContent").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
