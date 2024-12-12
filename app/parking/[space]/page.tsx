import { RefreshButton } from "./_components/RefreshButton";
import { parkingData } from "./_server/cache";

export default async function Page({
  params,
}: {
  params: Promise<{ space: string }>;
}) {
  const space = (await params).space === "aispace" ? "AI" : "center";

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mb-2">
        최근 새로고침 시간: {parkingData[space].lastUpdated}
      </p>
      <RefreshButton receiver={space + "receiver"} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getParkingData()[space].imageUrl ?? "https://placehold.co/960x540/png"}
        alt="parking-image"
        width="960"
        height="540"
        className="mt-12"
      />
    </div>
  );
}

export const revalidate = 0;
