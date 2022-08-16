import { EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../Structures';
import { getHermioneGif } from '../Util';

export default new SlashCommand()
    .setName('randomgif')
    .setDescription('Sends a random Hermione gif.')
    .setCallback(async interaction => {
        const gif = await getHermioneGif();

        const embed = new EmbedBuilder()
            .setTitle('Here you go ❤️')
            .setImage(gif)
            .setFooter({ text: 'Use /subscribe to receive daily Hermione gifs in your DMs.' });

        interaction.reply({ embeds: [embed], ephemeral: true });
    });
