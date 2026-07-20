import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState, StatusBadge } from "@/components/admin/ui";
import DeletePostButton from "./delete-post-button";
import PublishToggleButton from "./publish-toggle-button";

const STATUSES = ["draft", "in_review", "scheduled", "published", "archived"];

function seoGaps(post: {
  metaTitle: string | null;
  metaDescription: string | null;
  directAnswer: string;
  faqs: unknown;
  relatedServices: string[];
}) {
  const gaps: string[] = [];
  if (!post.metaTitle) gaps.push("meta title");
  if (!post.metaDescription) gaps.push("meta description");
  if (!post.directAnswer) gaps.push("direct answer");
  if (!Array.isArray(post.faqs) || post.faqs.length === 0) gaps.push("FAQ");
  if (!post.relatedServices || post.relatedServices.length === 0) gaps.push("related services");
  return gaps;
}

export default async function PostsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; category?: string }>;
}) {
  const { q, status, category } = await searchParams;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <DbSetupNotice feature="the blog manager" />
      </div>
    );
  }

  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        status: status ? (status as never) : undefined,
        category: category ? category : undefined,
        OR: q
          ? [{ title: { contains: q, mode: "insensitive" } }, { slug: { contains: q, mode: "insensitive" } }]
          : undefined,
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.blogPost.findMany({ select: { category: true }, distinct: ["category"] }),
  ]);

  const hasFilters = Boolean(q || status || category);

  return (
    <div className="space-y-6">
      <PageHeader />

      <form className="flex flex-wrap gap-3">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by title or slug…"
          className="w-full max-w-xs rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <select
          name="category"
          defaultValue={category ?? ""}
          className="rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.category} value={c.category}>
              {c.category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md border border-border-soft px-4 py-2 text-sm font-medium text-[var(--brand-navy)] hover:bg-canvas-soft"
        >
          Filter
        </button>
        {hasFilters && (
          <Link
            href="/admin/posts"
            className="rounded-md px-4 py-2 text-sm font-medium text-text-muted hover:bg-canvas-soft"
          >
            Clear
          </Link>
        )}
      </form>

      {posts.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No posts match your filters" : "No posts yet"}
          description={hasFilters ? "Try a different search term or clear the filters." : "Create your first post to get started."}
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-soft bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border-soft bg-canvas-soft text-xs uppercase text-text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">SEO</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const gaps = seoGaps(post);
                return (
                  <tr key={post.id} className="border-b border-border-soft last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-[var(--brand-navy)]">
                      {post.title}
                      <p className="mt-0.5 font-normal text-xs text-text-muted">/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{post.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-4 py-3">
                      {gaps.length === 0 ? (
                        <span className="inline-flex items-center rounded-full bg-brand-green-soft px-2.5 py-0.5 text-xs font-medium text-brand-green-deep">
                          Complete
                        </span>
                      ) : (
                        <span
                          title={`Missing: ${gaps.join(", ")}`}
                          className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700"
                        >
                          {gaps.length} missing
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-wrap justify-end gap-3">
                        <Link href={`/admin/posts/${post.id}`} className="text-brand-green hover:underline">
                          Edit
                        </Link>
                        {post.status !== "archived" && (
                          <PublishToggleButton id={post.id} status={post.status} />
                        )}
                        <DeletePostButton id={post.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Blog Posts</h1>
        <p className="text-sm text-text-muted">Manage insights content.</p>
      </div>
      <Link
        href="/admin/posts/new"
        className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-deep"
      >
        New Post
      </Link>
    </div>
  );
}
