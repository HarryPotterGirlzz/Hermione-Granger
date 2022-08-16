import { env } from 'node:process';
import { Client as BaseClient, type ClientApplication, type ClientOptions, type ClientUser } from 'discord.js';
import { type Collection, type Db, MongoClient } from 'mongodb';
import { AutocompleteManager, CommandManager, ComponentManager, EventManager, ModalManager } from './Managers';
import type { DatabaseUser } from '../Util';

interface ClientConfig {
    token: string;
    tenorApiKey: string;
    mongoUri: string;
}

declare module 'discord.js' {
    interface Client {
        commands: CommandManager;
        components: ComponentManager;
        autocompletes: AutocompleteManager;
        modals: ModalManager;
        events: EventManager;

        mongoClient: MongoClient;
        database: Db;

        get config(): ClientConfig;
        get subscribers(): Collection<DatabaseUser>;
    }
}

export class Client extends BaseClient {
    declare application: ClientApplication;
    declare user: ClientUser;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new CommandManager(this);
        this.components = new ComponentManager(this);
        this.autocompletes = new AutocompleteManager(this);
        this.modals = new ModalManager(this);
        this.events = new EventManager(this);

        this.mongoClient = new MongoClient(this.config.mongoUri);
        this.database = this.mongoClient.db('HarryPotterGirlzz');
    }

    async build() {
        await Promise.all([
            this.commands.registerAll(),
            this.components.registerAll(),
            this.autocompletes.registerAll(),
            this.modals.registerAll(),
            this.events.registerAll(),
        ]);

        await this.login(this.config.token);
    }

    override get config(): ClientConfig {
        return {
            token: env.DISCORD_TOKEN,
            tenorApiKey: env.TENOR_API_KEY,
            mongoUri: env.MONGO_URI,
        };
    }

    override get subscribers(): Collection<DatabaseUser> {
        return this.database.collection<DatabaseUser>('hermione-subscribers');
    }
}
