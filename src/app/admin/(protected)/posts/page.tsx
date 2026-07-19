import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice, EmptyState, StatusBadge } from "@/components/admin/ui";
import DeletePostButton from "./delete-post-button";

export default async function PostsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <PageHeader />
        <DbSetupNotice feature="the blog manager" />
      </div>
    );
  }

  const posts = await prisma.blogPost.findMany({
    where: {
      status: status ? (status as never) : undefined,
      title: q ? { contains: q, mode: "insensitive" } : undefined,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <PageHeader />

      <form className="flex flex-wrap gap-3">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search by title…"
          className="w-full max-w-xs rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="rounded-md border border-border-soft px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">All statuses</option>
          {["draft", "in_review", "scheduled", "published", "archived"].map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md border border-border-soft px-4 py-2 text-sm font-medium text-[var(--brand-navy)] hover:bg-canvas-soft"
        >
          Filter
        </button>
      </form>

      {posts.length === 0 ? (
        <EmptyState title="No posts yet" description="Create your first post to get started." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border-soft bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border-soft bg-canvas-soft text-xs uppercase text-text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border-soft last:border-0">
                  <td className="px-4 py-3 font-medium text-[var(--brand-navy)]">{post.title}</td>
                  <td className="px-4 py-3 text-text-muted">{post.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/posts/${post.id}`} className="text-brand-green hover:underline">
                        Edit
                      </Link>
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
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
