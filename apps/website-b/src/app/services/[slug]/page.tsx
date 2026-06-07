import { notFound } from 'next/navigation';

import HatchCta from '@/components/sections/hatch-cta';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import HatchServiceDetail from '@/components/sections/hatch-service-detail-hero';
import HatchWhatsIncluded from '@/components/sections/hatch-whats-included';
import { getAllServiceSlugs, getService } from '@/lib/get-service';
import { getAllProjects } from '@/lib/project-work';

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getService(slug);
  if (!data) notFound();

  const { frontmatter } = data;
  const projects = getAllProjects();

  return (
    <>
      <HatchServiceDetail
        title={frontmatter.title}
        description={frontmatter.description}
        price={frontmatter.price}
        priceMeta={frontmatter.priceMeta}
        primaryCtaLabel={frontmatter.primaryCtaLabel}
        primaryCtaHref={frontmatter.primaryCtaHref}
        secondaryCtaLabel={frontmatter.secondaryCtaLabel}
        secondaryCtaHref={frontmatter.secondaryCtaHref}
      />
      <HatchWhatsIncluded hideHeader />
      <HatchSelectedProjects projects={projects} limit={3} hideHeader />
      <HatchCta />
    </>
  );
}
