import { createClient } from "redis";
import { CONNECTION_STRING } from "./config/secrets";
import { addRedisData } from "./services/redis/redis";

// cli:
// should flush db ?

const initClient = () => {
    if (!CONNECTION_STRING.length) {
        console.log("No connection string found in .env, using localhost:6379");
        return createClient();
    } else {
        console.log("Using connection string found in .env");
        return createClient({ socket: { url: CONNECTION_STRING } });
    }
};

const main = async () => {
    console.log("hiya!");

    const client = initClient();

    client.on("error", (err) => console.log(`Redis error occurred: ${err}`));

    await client.connect();

    addRedisData(client, 10, 3);

    const allKeys = await client.keys("*");
    console.log(allKeys);
};

(async () => await main())();
