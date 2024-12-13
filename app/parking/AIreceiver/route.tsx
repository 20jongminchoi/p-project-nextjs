import { redis } from "@/app/_server/redis";
import { revalidatePath } from "next/cache";
import { cacheKeys } from "@/app/_server/cacheKeys";

export async function POST(request: Request) {
  const { image_url } = await request.json();

  console.log(image_url);

  if (!image_url) {
    return new Response("image_url is required", { status: 400 });
  } else {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    // _parkingData.AI.imageUrl = image_url;
    // _parkingData.AI.lastUpdated = formattedDate;
    // setParkingData({
    //   AI: {
    //     imageUrl: image_url,
    //     lastUpdated: formattedDate,
    //   },
    // });
    if(image_url === "refresh") {
      await redis.set(cacheKeys.parkingData.AI.lastUpdated, formattedDate);
    }else{
      await redis.set(cacheKeys.parkingData.AI.imageUrl, image_url);
      await redis.set(cacheKeys.parkingData.AI.lastUpdated, formattedDate);
      revalidatePath("/parking/aispace");

    // const userAgent = request.headers.get("user-agent");
    return new Response(null, { status: 204 }); // No Content 응답
    // if (userAgent && userAgent.includes("Python")) {
    //   // Python 요청 처리
    //   return new Response(null, { status: 204 }); // No Content 응답
    // } else {
    //   // 브라우저 요청 처리
    // }
  }
}
