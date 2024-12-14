import { redis } from "@/app/_server/redis";
import { revalidatePath } from "next/cache";
import { cacheKeys } from "@/app/_server/cacheKeys";

export async function POST(request: Request) {
  const { image_url } = await request.json();

  console.log("image_url", image_url);

  if (!image_url) {
    return new Response("image_url is required", { status: 400 });
  } else {
    const now = new Date();
    const options = { timeZone: "Asia/Seoul", hour12: false };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      ...options,
    }).format(now);
    console.log("formattedDate", formattedDate);

    // const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
    //   .toString()
    //   .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
    //   .getHours()
    //   .toString()
    //   .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
    //   .getSeconds()
    //   .toString()
    //   .padStart(2, "0")}`;

    // _parkingData.center.imageUrl = image_url;
    // _parkingData.center.lastUpdated = formattedDate;
    if (image_url === "refresh") {
      await redis.set(cacheKeys.parkingData.center.lastUpdated, formattedDate);
    } else {
      await redis.set(cacheKeys.parkingData.center.imageUrl, image_url);
      await redis.set(cacheKeys.parkingData.center.lastUpdated, formattedDate);
      revalidatePath("/parking/center");
    }

    // const userAgent = request.headers.get("user-agent");
    return new Response(null, { status: 204 }); // No Content 응답
    // if (userAgent && userAgent.includes("Python")) {
    //   // Python 요청 처리
    //   return new Response(null, { status: 204 }); // No Content 응답
    // } else {
    //   // 브라우저 요청 처리
    //   // return Response.redirect("/parking/center");
    // }
  }
}
