import { setParkingData } from "../[space]/_server/cache";
import { revalidateTag } from "next/cache";

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
    setParkingData({
      AI: {
        imageUrl: image_url,
        lastUpdated: formattedDate,
      },
    });
    revalidateTag("parkingData");

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
