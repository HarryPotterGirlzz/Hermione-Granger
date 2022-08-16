import { EmbedBuilder, Events } from 'discord.js';
import { RecurrenceRule, scheduleJob } from 'node-schedule';
import { ClientEvent } from '../Structures';
import { getHermioneGif } from '../Util';

export default new ClientEvent({
    name: Events.ClientReady,
    run: async client => {
        console.log(`Client ready and logged in as ${client.user.tag}.`);

        await client.commands.deployAll();

        console.log('Application commands deployed successfully.');

        const rule = new RecurrenceRule();
        rule.hour = 9;
        rule.minute = rule.second = 0;
        rule.tz = 'UTC';

        scheduleJob(rule, async () => {
            console.log('Sending daily Hermione gifs...');

            const gif = await getHermioneGif();

            const subscribers = await client.subscribers.find({ subscribed: true }).toArray();

            for (const subscriber of subscribers) {
                const user = await client.users.fetch(subscriber.id);

                const embed = new EmbedBuilder().setTitle('Your daily Hermione gif is here ❤️').setImage(gif);

                user.send({ embeds: [embed] }).catch(() => null);
            }
        });
    },
});
