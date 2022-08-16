import { ApplicationCommandType, ComponentType, Events, InteractionType } from 'discord.js';
import { ClientEvent } from '../Structures';

export default new ClientEvent({
    name: Events.InteractionCreate,
    run: async interaction => {
        if (!interaction.inCachedGuild()) return;

        const { client } = interaction;

        if (interaction.type === InteractionType.ApplicationCommand) {
            switch (interaction.commandType) {
                case ApplicationCommandType.ChatInput:
                    return client.commands.getSlashCommand(interaction.commandName, true).run(interaction);
                case ApplicationCommandType.User:
                    return client.commands.getUserContextMenu(interaction.commandName, true).run(interaction);
                case ApplicationCommandType.Message:
                    return client.commands.getMessageContextMenu(interaction.commandName, true).run(interaction);
            }
        } else if (interaction.type === InteractionType.MessageComponent) {
            switch (interaction.componentType) {
                case ComponentType.Button:
                    return client.components.getInteractionButton(interaction.customId, true).run(interaction);
                case ComponentType.SelectMenu:
                    return client.components.getSelectMenu(interaction.customId, true).run(interaction);
            }
        } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            return client.autocompletes.getAutocomplete(interaction.commandName, true).run(interaction);
        } else if (interaction.type === InteractionType.ModalSubmit) {
            return client.modals.getModal(interaction.customId, true).run(interaction);
        }
    },
});
