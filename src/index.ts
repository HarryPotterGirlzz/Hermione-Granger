import { GatewayIntentBits } from 'discord.js';
import { Client } from './Structures';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            TENOR_API_KEY: string;
            MONGO_URI: string;
        }
    }
}

const client = new Client({ intents: GatewayIntentBits.Guilds });

client.build();
