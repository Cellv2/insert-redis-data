import dotenv from 'dotenv';
dotenv.config();

export const CONNECTION_STRING: string = process.env.CONNECTION_STRING || "";
