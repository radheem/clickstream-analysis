import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectGallery } from '@/components/project-gallery';
import HatchCta from '@/components/sections/hatch-cta';
import { Button } from '@/components/ui/button';
import { getAllProjects, getProjectBySlug } from '@/lib/project-work';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

function MetaCard({
  label,
  value,
  iconSrc,
}: {
  label: string;
  value: string;
  iconSrc: string;
}) {
  return (
    <div className="sm:border-border/40 sm:border-l sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
      <Image
        src={iconSrc}
        alt=""
        width={28}
        height={28}
        aria-hidden
        className="mb-4 opacity-85 dark:invert"
      />
      <div className="text-[10px] font-semibold tracking-[0.28em] text-[var(--hatch-cta)]">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}

function DeliverablesCard({ items }: { items: string[] }) {
  return (
    <section className="border-border/40 border-t pt-10">
      <div className="flex flex-col gap-3">
        <Image
          src="/icons/pricing/project.svg"
          alt=""
          width={32}
          height={32}
          priority={false}
          className="opacity-70"
        />
        <h3 className="text-sm font-semibold">Deliverables</h3>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
        {items.map((t) => (
          <div key={t} className="text-muted-foreground flex gap-2.5 text-sm">
            <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--hatch-cta)]" />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project?.slug) return notFound();

  const heroImage = project.heroImage ?? project.coverImage;
  const liveUrl = project.liveUrl as string | undefined;

  const deliverables = (project.deliverables ?? []) as string[];
  const gallery = project.gallery;

  return (
    <main className="bg-background">
      <div className="container pt-6 pb-16 sm:pt-8">
        <div className="mx-auto w-full">
          <Button
            asChild
            variant="outline"
            className="mb-6 h-7 w-auto rounded-full px-3 text-xs"
          >
            <Link href="/work">
              <ArrowLeft className="mr-1 size-3.5" />
              Back
            </Link>
          </Button>
          <div className="ring-border/35 relative aspect-video w-full overflow-hidden rounded-2xl ring-1">
            <Image
              src={heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 960px, 92vw"
              priority
            />
          </div>

          <div className="mt-12 flex items-start justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
            </div>

            {liveUrl ? (
              <Button
                asChild
                variant="outline"
                className="h-9 w-auto rounded-full px-4 text-sm"
              >
                <Link href={liveUrl} target="_blank" rel="noreferrer">
                  View live <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            ) : null}
          </div>

          <p className="text-muted-foreground mt-4 text-sm leading-[1.6] sm:text-base">
            {project.description}
          </p>

          <div className="border-border/40 mt-10 grid gap-10 border-t pt-10 sm:grid-cols-3 sm:gap-0">
            <MetaCard
              iconSrc="/icons/meta/role.svg"
              label={project.roleLabel ?? 'ROLE'}
              value={project.roleValue ?? 'Product Designer'}
            />
            <MetaCard
              iconSrc="/icons/meta/timeline.svg"
              label={project.timelineLabel ?? 'TIMELINE'}
              value={project.timelineValue ?? '6 weeks'}
            />
            <MetaCard
              iconSrc="/icons/meta/services.svg"
              label={project.servicesLabel ?? 'SERVICES'}
              value={project.servicesValue ?? 'SaaS, Dashboard'}
            />
          </div>

          <div className="border-border/40 mt-10 grid gap-10 border-t pt-10 sm:grid-cols-2 sm:gap-12">
            <div>
              <h2 className="font-display text-2xl">
                {project.challengeTitle ?? 'The Challenge'}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-[1.7] sm:text-base">
                {project.challengeBody}
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl">
                {project.solutionTitle ?? 'Our Solution'}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-[1.7] sm:text-base">
                {project.solutionBody}
              </p>
            </div>
          </div>

          {deliverables.length > 0 ? (
            <div className="mt-10">
              <DeliverablesCard items={deliverables} />
            </div>
          ) : null}

          {gallery && gallery.length > 0 ? (
            <ProjectGallery gallery={gallery} />
          ) : null}
        </div>
      </div>
      <HatchCta />
    </main>
  );
}
