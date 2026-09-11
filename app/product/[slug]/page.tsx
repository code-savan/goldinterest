import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetailClient } from "@/components/product-detail-client";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const related = getRelatedProducts(product, 3);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B] flex gap-2 items-center">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <span className="text-black">{product.category}</span>
        <span>/</span>
        <span className="text-black truncate">{product.name}</span>
      </div>

      <ProductDetailClient product={product} />

      {/* You Might Also Like — declustered 3 cols */}
      <section className="mt-20 lg:mt-24 border-t border-[#E8E6E1] pt-12 lg:pt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-[24px] leading-none font-light">
            You Might <span className="italic">Also Like</span>
          </h2>
          <a href="/shop" className="text-[11px] tracking-[0.16em] uppercase underline underline-offset-4 hidden sm:inline">
            Shop More →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-10">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
