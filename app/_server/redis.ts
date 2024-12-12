import { Redis } from "@upstash/redis";

/**
 * @see https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
 */

const redisClientSingleton = () => {
  return Redis.fromEnv();
};

declare const globalThis: {
  redisGlobal: ReturnType<typeof redisClientSingleton>;
} & typeof global;

export const redis = globalThis.redisGlobal ?? redisClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.redisGlobal = redis;
}
