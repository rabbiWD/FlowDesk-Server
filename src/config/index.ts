import dotenv from 'dotenv';
import path from 'path';
import { env } from 'process';

dotenv.config({
    quiet: true,
    path: path.join(process.cwd(), ".env")
});

const config = {
    port: env.PORT,
    database_url: env.DATABASE_URL as string,
    node_env: env.NODE_ENV as string,
    jwt_secret: env.JWT_SECRET as string,
    refresh_secret: env.REFRESH_SECRET as string
}

export default config;