import { EmptyState } from "@/components/admin/ui";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Media</h1>
        <p className="text-sm text-text-muted">Media library and uploads.</p>
      </div>
      <EmptyState
        title="Media uploads not yet configured"
        description="File uploads require a storage provider (Vercel Blob or Cloudinary). The MediaAsset model exists in the database, but upload UI is planned for Phase 7B once storage is configured."
      />
    </div>
  );
}
