import { RedisKvPair } from "../types/redis-types";

export const generateRedisKvPair = (depth: number): RedisKvPair => {
    let key = Array.from(new Array(depth), (_, i) => `key${i}`);
    const value = Math.round(Math.random() * 1000).toString();

    // if we do not add some kind of randomness to each key, redis will simply overwrite the key each time with the new value
    return {
        key: `${key.join(":")}_${Math.round(Math.random() * 100)}`,
        value,
    };
};

/**
 *  For the sake of simplicity, we divide the keys equally across the key depth, weighted towards the final key
 *  A depth of 2 with 10 pairs would key 5 sets at key0:value and 5 sets at key0:key1:value
 *  A depth of 3 with 10 pairs would give 3 at key:0:value, 3 at key0:key1:value and 4 at key0:key1:key2:value
 * @returns {RedisKvPair[][]} Array of arrays containing one or more generated key:value pairs
 */
export const generateRedisData = (numOfPairs: number, keyDepth: number) => {
    const depthSplit = Math.floor(numOfPairs / keyDepth);
    const depthSplitArray = [...Array(depthSplit)].fill(depthSplit);

    const modPairsAndDepth = numOfPairs % keyDepth;
    if (modPairsAndDepth !== 0) {
        // adjust the last  array element to ensure that all requested pairs are generated
        depthSplitArray[depthSplitArray.length - 1] =
            depthSplitArray[depthSplitArray.length - 1] + modPairsAndDepth;
    }

    const redisData = depthSplitArray.map((pairsToGen) => {
        let data = [];
        for (let i = 1; i <= pairsToGen; i++) {
            data.push(generateRedisKvPair(i));
        }

        return data;
    });

    return redisData;
};
