"use client";

import FacePile from "@convex-dev/presence/facepile";
import usePresence from "@convex-dev/presence/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

type Props = {
  roomId: Id<"posts">;
  userId: string;
};

export default function PostPresence({ roomId, userId }: Props) {
  const presenceState = usePresence(api.presence, roomId, userId);

  if (!presenceState || presenceState.length === 0) {
    return null;
  }

  return (
    <main className="flex items-center gap-2">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Viewing now
      </p>

      <div className="text-black">
        <FacePile presenceState={presenceState} />
      </div>
    </main>
  );
}
