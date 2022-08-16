import type { BaseInteraction } from 'discord.js';
import type {
    SlashCommand,
    ContextMenu,
    SelectMenu,
    Autocomplete,
    Modal,
    TextInput,
    Button,
    ActionRow,
    StructureType,
} from '.';

export interface HasName {
    name: string;

    setName(name: string): this;
}

export type Callback<T extends BaseInteraction<'cached'>> = (interaction: T) => void;

export interface HasCallback<T extends BaseInteraction<'cached'>> {
    run: Callback<T>;

    setCallback(cb: Callback<T>): this;
}

export interface IStructure {
    structureType: StructureType;
}

export type AnyCommandStructure = SlashCommand | ContextMenu;

export type AnyComponentStructure = ActionRow | Button | SelectMenu | TextInput;

export type AnyAutocompleteStructure = Autocomplete;

export type AnyModalStructure = Modal;

export type AnyStructure = AnyCommandStructure | AnyComponentStructure | AnyAutocompleteStructure | AnyModalStructure;
