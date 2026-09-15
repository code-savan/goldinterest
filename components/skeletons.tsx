function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-black/[0.07] ${className}`} />;
}

function Card({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-black/[0.06] ${className}`} />;
}

export function SkeletonHero() {
  return (
    <section className="h-[100dvh] min-h-[620px] bg-[#0A0A0A] flex items-center">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[520px] bg-white/[0.92] p-6 lg:p-8 space-y-4">
          <Bar className="h-3 w-40" />
          <Bar className="h-10 w-3/4" />
          <Bar className="h-10 w-1/2" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-5/6" />
          <div className="flex gap-2.5 pt-2">
            <Bar className="h-11 w-36" />
            <Bar className="h-11 w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonProductCard() {
  return (
    <div>
      <Card className="aspect-[3/4] !rounded-none" />
      <div className="pt-3 space-y-2">
        <Bar className="h-4 w-4/5" />
        <Bar className="h-4 w-2/5" />
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonShop() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="pb-8 border-b border-black/[0.07] space-y-3">
        <Bar className="h-3 w-24" />
        <Bar className="h-11 w-64" />
        <Bar className="h-4 w-full max-w-[560px]" />
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mt-8 lg:mt-10">
        <div className="hidden lg:block w-[300px] shrink-0 space-y-4">
          <Bar className="h-4 w-24" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-3/4" />
          <Bar className="h-4 w-full" />
        </div>
        <div className="flex-1 min-w-0">
          <SkeletonProductGrid count={6} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
      <Bar className="h-3 w-64" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 mt-4">
        <div className="space-y-3">
          <Card className="aspect-[3/4] lg:aspect-[4/5] !rounded-none" />
          <div className="flex gap-3">
            <Card className="w-20 h-20 !rounded-none" />
            <Card className="w-20 h-20 !rounded-none" />
          </div>
        </div>
        <div className="space-y-4 lg:pt-2">
          <Bar className="h-3 w-40" />
          <Bar className="h-8 w-3/4" />
          <Bar className="h-6 w-32" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-5/6" />
          <Bar className="h-10 w-full" />
          <Bar className="h-12 w-full" />
          <Bar className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCart() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-8 py-10">
      <Bar className="h-8 w-48" />
      <Bar className="h-4 w-72 mt-2" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 mt-6">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3 p-4 border border-black/[0.07] bg-white rounded-2xl">
              <Card className="w-20 h-24 shrink-0 !rounded-lg" />
              <div className="flex-1 space-y-2 py-1">
                <Bar className="h-4 w-3/4" />
                <Bar className="h-3 w-1/2" />
                <Bar className="h-8 w-32" />
              </div>
              <Bar className="h-5 w-16 self-center" />
            </div>
          ))}
        </div>
        <div className="border border-black/[0.07] bg-white rounded-2xl p-6 h-fit space-y-3">
          <Bar className="h-4 w-32" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-full" />
          <Bar className="h-5 w-full" />
          <Bar className="h-12 w-full mt-2" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonCheckout() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
      <Bar className="h-3 w-40" />
      <Bar className="h-9 w-56 mt-3" />
      <Bar className="h-4 w-80 mt-2" />
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 mt-6">
        <div className="bg-white border border-black/[0.07] rounded-2xl p-5 lg:p-8 space-y-3">
          <Bar className="h-4 w-48" />
          <Bar className="h-12 w-full" />
          <Bar className="h-12 w-full" />
          <Bar className="h-12 w-full" />
          <div className="grid sm:grid-cols-2 gap-3">
            <Bar className="h-12 w-full" />
            <Bar className="h-12 w-full" />
          </div>
          <Bar className="h-12 w-full" />
          <Bar className="h-[52px] w-full mt-2" />
        </div>
        <div className="border border-black/[0.07] bg-[#F6F5F2] rounded-2xl p-6 space-y-3 h-fit">
          <Bar className="h-4 w-40" />
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-3 py-2">
              <Card className="w-16 h-20 !rounded-lg" />
              <div className="flex-1 space-y-2">
                <Bar className="h-4 w-4/5" />
                <Bar className="h-3 w-2/5" />
              </div>
            </div>
          ))}
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAdminTable({ rows = 6 }: { rows?: number }) {
  return (
    <div>
      <Bar className="h-9 w-56" />
      <Bar className="h-4 w-80 mt-2 mb-6" />
      <div className="bg-white border border-black/[0.07] rounded-2xl divide-y divide-black/[0.06]">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <Card className="w-12 h-14 shrink-0 !rounded-lg" />
            <div className="flex-1 space-y-2">
              <Bar className="h-4 w-2/5" />
              <Bar className="h-3 w-1/4" />
            </div>
            <Bar className="h-8 w-16" />
            <Bar className="h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonHome() {
  return (
    <div className="bg-[#FCFCF9]">
      <SkeletonHero />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20">
        <Bar className="h-3 w-40" />
        <Bar className="h-10 w-96 mt-4 max-w-full" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="aspect-[4/5.2] !rounded-none" />
          ))}
        </div>
      </div>
      <div className="bg-[#F6F5F2] border-y border-black/[0.07] py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <Bar className="h-3 w-48" />
          <Bar className="h-10 w-80 mt-4" />
          <div className="mt-12">
            <SkeletonProductGrid count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
