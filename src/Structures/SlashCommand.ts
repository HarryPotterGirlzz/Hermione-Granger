import {
    ApplicationCommandType,
    type ChatInputCommandInteraction,
    type RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
} from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { HasCallback, IStructure } from './Types';

declare module 'discord.js' {
    interface SlashCommandSubcommandsOnlyBuilder extends HasCallback<ChatInputCommandInteraction<'cached'>> {}
}

export interface SlashCommand extends IStructure, HasCallback<ChatInputCommandInteraction<'cached'>> {}

@Structure({ type: StructureType.Command, callback: true })
export class SlashCommand extends SlashCommandBuilder {
    override toJSON(): RESTPostAPIApplicationCommandsJSONBody {
        return { type: ApplicationCommandType.ChatInput, ...super.toJSON() };
    }
}
