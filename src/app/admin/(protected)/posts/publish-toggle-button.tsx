"use client";

import { useTransition } from "react";
import { togglePublishAction } from "./actions";

export default function PublishToggleButton({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  const isPublished = status === "published";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => togglePublishAction(id, !isPublished))}
      className="text-brand-green hover:underline disabled:opacity-50"
    >
      {isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
