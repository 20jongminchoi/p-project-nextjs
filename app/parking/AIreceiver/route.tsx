import { redis } from "@/app/_server/redis";
import { revalidatePath } from "next/cache";
import { cacheKeys } from "@/app/_server/cacheKeys";
import { getNow, receiverBodySchema } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json().then(receiverBodySchema.parseAsync);
    if(body.secret_key !== process.env.SECRET_KEY) {
      return new Response("Invalid Request", { status: 400 });
    }

    const formattedDate = getNow();

    await redis.set(cacheKeys.parkingData.AI.imageUrl, body.image_url);
    await redis.set(cacheKeys.parkingData.AI.lastUpdated, formattedDate);
    await redis.set(cacheKeys.parkingData.AI.confidence, body.confidence);

    revalidatePath("/parking/[space]", "page");
    return new Response(null, { status: 204 });
  } catch (_) {
    return new Response("Invalid Request", { status: 400 });
  }
}
