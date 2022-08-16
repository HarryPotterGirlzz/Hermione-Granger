import type { ClientEvents } from 'discord.js';

interface ClientEventData<K extends keyof ClientEvents> {
    name: K;
    run: (...args: ClientEvents[K]) => void;
}

export class ClientEvent<K extends keyof ClientEvents = keyof ClientEvents> {
    name;
    run;

    constructor(data: ClientEventData<K>) {
        this.name = data.name;
        this.run = data.run;
    }
}
