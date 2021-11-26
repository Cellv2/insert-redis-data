import { RedisClientType } from "redis/dist/lib/client";
import { RedisModules } from "redis/dist/lib/commands";
import { RedisLuaScripts } from "redis/dist/lib/lua-script";
import { generateRedisData } from "../../utils/redis-data";

export const addRedisData = (
    client: RedisClientType<RedisModules, RedisLuaScripts>,
    numOfPairs: number,
    keyDepth: number
) => {
    const dataToSet = generateRedisData(numOfPairs, keyDepth);
    dataToSet.forEach((depthSet) => {
        depthSet.forEach(async (kvPair) => {
            client.set(kvPair.key, kvPair.value);
        });
    });
};
