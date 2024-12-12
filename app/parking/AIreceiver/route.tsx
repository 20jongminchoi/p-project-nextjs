import { parkingData } from "../[space]/_server/cache";

export async function POST(request: Request) {
  const { image_url } = await request.json();

  console.log(image_url);
  console.log(parkingData.AI.imageUrl);

  if (!image_url) {
    return new Response("image_url is required", { status: 400 });
  } else {
    if (image_url === "ejs") {
      if (!parkingData.AI.imageUrl) {
        parkingData.AI.lastUpdated = "서버와 연결이 불안정합니다";
      }
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

      parkingData.AI.imageUrl = image_url;
      parkingData.AI.lastUpdated = formattedDate;
    }

    const userAgent = request.headers.get("user-agent");
    if (userAgent && userAgent.includes("Python")) {
      // Python 요청 처리
      return new Response(null, { status: 204 }); // No Content 응답
    } else {
      // 브라우저 요청 처리
      return Response.redirect("/parking/aispace");
    }
  }
}
