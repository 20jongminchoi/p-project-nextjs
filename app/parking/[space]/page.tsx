import { cacheKeys } from "@/app/_server/cacheKeys";
import { RefreshButton } from "./_components/RefreshButton";
import { redis } from "@/app/_server/redis";

export default async function Page({
  params,
}: {
  params: Promise<{ space: string }>;
}) {
  const space = (await params).space === "aispace" ? "AI" : "center";
  const lastUpdated: string =
    (await redis.get(cacheKeys.parkingData[space].lastUpdated)) ??
    "주차 가능 여부를 보려면 새로고침 하세요";
  const imageUrl: string | null =
    (await redis.get(cacheKeys.parkingData[space].imageUrl)) ?? null;
  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-2">최근 새로고침 시간: {lastUpdated}</p>
      <RefreshButton receiver={space + "receiver"} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl ?? "https://placehold.co/960x540/png"}
        alt="parking-image"
        width="960"
        height="540"
        className="mt-12"
      />
    </div>
  );
}

export const revalidate = 0;
