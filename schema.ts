import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  tagline: text("tagline").notNull(),
  emoji: varchar("emoji", { length: 16 }).notNull(),
  gradientFrom: varchar("gradient_from", { length: 24 }).notNull(),
  gradientTo: varchar("gradient_to", { length: 24 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  categorySlug: varchar("category_slug", { length: 80 }).notNull(),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  rating: integer("rating").notNull().default(0), // stored x10 (e.g. 48 = 4.8)
  reviewCount: integer("review_count").notNull().default(0),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  emoji: varchar("emoji", { length: 16 }).notNull(),
  gradientFrom: varchar("gradient_from", { length: 24 }).notNull(),
  gradientTo: varchar("gradient_to", { length: 24 }).notNull(),
  badge: varchar("badge", { length: 40 }),
  ageRange: varchar("age_range", { length: 40 }).notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  stock: integer("stock").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  bestseller: boolean("bestseller").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productSlug: varchar("product_slug", { length: 120 }).notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 40 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 80 }).notNull(),
  province: varchar("province", { length: 80 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull(),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull(),
  total: integer("total").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
};

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
