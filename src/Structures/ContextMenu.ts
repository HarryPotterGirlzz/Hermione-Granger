import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    type ContextMenuCommandInteraction,
    type ContextMenuCommandType,
    type MessageContextMenuCommandInteraction,
    type UserContextMenuCommandInteraction,
} from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { HasCallback, IStructure } from './Types';

export interface BaseContextMenu<
    T extends ContextMenuCommandInteraction<'cached'> = ContextMenuCommandInteraction<'cached'>
> extends IStructure,
        HasCallback<T> {}

@Structure({ type: StructureType.Command, callback: true })
export abstract class BaseContextMenu<
    T extends ContextMenuCommandInteraction<'cached'> // eslint-disable-line @typescript-eslint/no-unused-vars
> extends ContextMenuCommandBuilder {
    override setType(type: ContextMenuCommandType): never;
    override setType() {
        throw new Error(`The type of a ${this.constructor.name} cannot be changed.`);
    }
}

export class UserContextMenu extends BaseContextMenu<UserContextMenuCommandInteraction<'cached'>> {
    override readonly type = ApplicationCommandType.User;
}

export class MessageContextMenu extends BaseContextMenu<MessageContextMenuCommandInteraction<'cached'>> {
    override readonly type = ApplicationCommandType.Message;
}

export type ContextMenu = UserContextMenu | MessageContextMenu;
