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
        window.location.reload();
      }}
    >
      새로고침
    </Button>
  );
};
