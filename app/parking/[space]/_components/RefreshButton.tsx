"use client";

import { Button } from "@/components/ui/button";
import { ReceiverBody } from "@/lib/utils";

interface Props {
  receiver: string;
}

export const RefreshButton = ({ receiver }: Props) => {
  return (
    <Button
      onClick={async () => {
        await fetch(`/parking/${receiver}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: true } satisfies ReceiverBody),
        });
        window.location.reload();
      }}
    >
      새로고침
    </Button>
  );
};
