import { SlashCommand } from '../Structures';

export default new SlashCommand()
    .setName('ping')
    .setDescription('Ping command.')
    .setCallback(interaction => interaction.reply({ content: 'Pong!', ephemeral: true }));
