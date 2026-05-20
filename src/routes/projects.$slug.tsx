import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import w1 from "@/assets/wedding-1.jpg";
import w2 from "@/assets/wedding-2.jpg";
import w3 from "@/assets/wedding-3.jpg";
import w4 from "@/assets/wedding-4.jpg";

// Auto-load any images dropped into src/assets/projects/{slug}/
const galleryModules = import.meta.glob("@/assets/projects/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const projectsMap: Record<string, { names: string; cover: string; folder: string }> = {
  "muskan-faizan": { names: "Muskan & Faizan", cover: w1, folder: "muskan-faizan" },
  "anamika-shirin": { names: "Anamika & Shirin", cover: w2, folder: "anamika-shirin" },
  "fatima-summed": { names: "Fatima & Summed", cover: w3, folder: "fatima-summed" },
  "irfan-deepa": { names: "Irfan & Deepa", cover: w4, folder: "irfan-deepa" },
};

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectsMap[params.slug];
    if (!project) throw notFound();
    const gallery: string[] = Object.entries(galleryModules)
      .filter(([path]) => path.includes(`/projects/${project.folder}/`))
      .map(([, url]) => url as string)
      .sort();
    return { project, gallery };
  },
  head: ({ params }) => {
    const p = projectsMap[params.slug];
    const title = p ? `${p.names} — CA Productions` : "Project — CA Productions";
    return { meta: [{ title }, { name: "description", content: `Wedding story of ${p?.names ?? ""}` }] };
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-foreground">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-foreground">Project not found</div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project, gallery } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm tracking-wider text-foreground/80 hover:text-foreground">
            <ArrowLeft size={16} /> Back
          </Link>
          <span className="font-serif text-lg sm:text-xl tracking-[0.25em]">
            CA <span className="text-accent">PRODUCTIONS</span>
          </span>
          <span className="w-16" />
        </nav>
      </div>

      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src={project.cover} alt={project.names} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.4em] text-accent">Wedding Story</span>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
            {project.names.split(" & ")[0]} <span className="font-serif-italic text-accent">&</span> {project.names.split(" & ")[1]}
          </h1>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl">
          {gallery.length === 0 ? (
            <p className="text-center text-foreground/60 text-sm tracking-wide">
              Images coming soon. Drop photos into <code className="text-accent">src/assets/projects/{project.folder}/</code>
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.names} ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-auto rounded-2xl object-cover ${i % 3 === 0 ? "sm:col-span-2" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
