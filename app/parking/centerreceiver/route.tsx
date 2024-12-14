import { redis } from "@/app/_server/redis";
import { revalidatePath } from "next/cache";
import { cacheKeys } from "@/app/_server/cacheKeys";
import { getNow, receiverBodySchema } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json().then(receiverBodySchema.parseAsync);

    const formattedDate = getNow();

    if ("refresh" in body) {
      await redis.set(cacheKeys.parkingData.center.lastUpdated, formattedDate);
    } else {
      await redis.set(cacheKeys.parkingData.center.imageUrl, body.image_url);
      await redis.set(cacheKeys.parkingData.center.lastUpdated, formattedDate);
    }

    revalidatePath("/parking/[space]", "page");
    return new Response(null, { status: 204 });
  } catch (_) {
    return new Response("Invalid Request", { status: 400 });
  }
}
