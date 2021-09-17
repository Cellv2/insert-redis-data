import { createClient } from "redis";
import { CONNECTION_STRING } from './config/secrets'
import dotenv from 'dotenv';
dotenv.config();

const initClient = () => {
    if (!CONNECTION_STRING.length) {
        console.log("No connection string found in .env, using localhost:6379");
        return createClient();
    } else {
        console.log("Using connection string found in .env");
        return createClient({ socket: { url: CONNECTION_STRING } });
    }
}

const main = async () => {
    console.log("hiya!");

    const client = initClient();

    client.on("error", (err) => console.log(`Redis error occurred: ${err}`));

    await client.connect();
    await client.set("testings", "hahathisisatest");
    console.log("key should be set");
    console.log(`the test key's value was ${await client.get("testings")}`);
}

(async () => await main())();


