"use client";

import { Button } from "@/components/ui/button";

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
          body: JSON.stringify({ image_url: "https://picsum.photos/1200/800" }),
        });
        window.location.reload();
      }}
    >
      새로고침
    </Button>
  );
};
