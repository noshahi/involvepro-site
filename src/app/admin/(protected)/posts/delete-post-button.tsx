"use client";

import { useTransition } from "react";
import { deletePostAction } from "./actions";

export default function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Archive this post? It will be hidden from the public site.")) {
          startTransition(() => deletePostAction(id));
        }
      }}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      Archive
    </button>
  );
}
