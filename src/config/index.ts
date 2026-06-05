import dotenv from 'dotenv';
import path from 'path';
import { env } from 'process';

dotenv.config({
    quiet: true,
    path: path.join(process.cwd(), ".env")
});

const config = {
    port: env.PORT,
}

export default config;