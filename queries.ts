import "server-only";
import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";
import { and, desc, eq, ne } from "drizzle-orm";

export async function getCategories() {
  return db.select().from(categories).orderBy(categories.sortOrder);
}

export async function getAllProducts() {
  return db.select().from(products).orderBy(desc(products.featured), products.id);
}

export async function getFeaturedProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(desc(products.rating));
}

export async function getBestsellers() {
  return db
    .select()
    .from(products)
    .where(eq(products.bestseller, true))
    .orderBy(desc(products.reviewCount));
}

export async function getProductBySlug(slug: string) {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getProductsByCategory(categorySlug: string, excludeSlug?: string) {
  return db
    .select()
    .from(products)
    .where(
      excludeSlug
        ? and(eq(products.categorySlug, categorySlug), ne(products.slug, excludeSlug))
        : eq(products.categorySlug, categorySlug),
    )
    .limit(8);
}

export async function getReviewsForProduct(slug: string) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productSlug, slug))
    .orderBy(desc(reviews.createdAt));
}

export async function getCategoryBySlug(slug: string) {
  const rows = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return rows[0] ?? null;
}
