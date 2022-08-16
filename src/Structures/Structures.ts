import { ApplicationCommandType, ComponentType, isJSONEncodable } from 'discord.js';
import type { ActionRow } from './ActionRow';
import type { Button, InteractionButton, LinkButton } from './Button';
import type { ContextMenu, MessageContextMenu, UserContextMenu } from './ContextMenu';
import type { SelectMenu } from './SelectMenu';
import type { SlashCommand } from './SlashCommand';
import type { TextInput } from './TextInput';
import type {
    AnyAutocompleteStructure,
    AnyCommandStructure,
    AnyComponentStructure,
    AnyModalStructure,
    AnyStructure,
    Callback,
} from './Types';

export const enum StructureType {
    Command = 'Command',
    Component = 'Component',
    Autocomplete = 'Autocomplete',
    Modal = 'Modal',
}

interface StructureData {
    type: StructureType;
    callback: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Structure(data: StructureData): ClassDecorator;
export function Structure({ type, callback }: StructureData) {
    return (target: any) => {
        return class extends target {
            constructor(...args: any[]) {
                super(...args);

                this.structureType = type;

                if (callback) {
                    this.setCallback = function (cb: Callback<any>) {
                        this.run = cb;

                        return this;
                    };
                }
            }
        };
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export class StructuresUtil {
    private static getType(structure: AnyStructure): number {
        if (!isJSONEncodable(structure) || typeof structure.toJSON !== 'function') return -1;

        const json = structure.toJSON();

        return 'type' in json ? (json.type as number) : -1;
    }

    static isCommand(structure: AnyStructure): structure is AnyCommandStructure {
        return structure.structureType === StructureType.Command;
    }

    static isSlashCommand(structure: AnyStructure): structure is SlashCommand {
        return (
            StructuresUtil.isCommand(structure) &&
            StructuresUtil.getType(structure) === ApplicationCommandType.ChatInput
        );
    }

    static isContextMenu(structure: AnyStructure): structure is ContextMenu {
        return (
            StructuresUtil.isCommand(structure) &&
            [ApplicationCommandType.User, ApplicationCommandType.Message].includes(StructuresUtil.getType(structure))
        );
    }

    static isUserContextMenu(structure: AnyStructure): structure is UserContextMenu {
        return StructuresUtil.isCommand(structure) && StructuresUtil.getType(structure) === ApplicationCommandType.User;
    }

    static isMessageContextMenu(structure: AnyStructure): structure is MessageContextMenu {
        return (
            StructuresUtil.isCommand(structure) && StructuresUtil.getType(structure) === ApplicationCommandType.Message
        );
    }

    static isComponent(structure: AnyStructure): structure is AnyComponentStructure {
        return structure.structureType === StructureType.Component;
    }

    static isActionRow(structure: AnyStructure): structure is ActionRow {
        return StructuresUtil.isComponent(structure) && StructuresUtil.getType(structure) === ComponentType.ActionRow;
    }

    static isButton(structure: AnyStructure): structure is Button {
        return StructuresUtil.isComponent(structure) && StructuresUtil.getType(structure) === ComponentType.Button;
    }

    static isInteractionButton(structure: AnyStructure): structure is InteractionButton {
        return StructuresUtil.isButton(structure) && 'custom_id' in structure.data;
    }

    static isLinkButton(structure: AnyStructure): structure is LinkButton {
        return StructuresUtil.isButton(structure) && 'url' in structure.data;
    }

    static isSelectMenu(structure: AnyStructure): structure is SelectMenu {
        return StructuresUtil.isComponent(structure) && StructuresUtil.getType(structure) === ComponentType.SelectMenu;
    }

    static isTextInput(structure: AnyStructure): structure is TextInput {
        return StructuresUtil.isComponent(structure) && StructuresUtil.getType(structure) === ComponentType.TextInput;
    }

    static isAutocomplete(structure: AnyStructure): structure is AnyAutocompleteStructure {
        return structure.structureType === StructureType.Autocomplete;
    }

    static isModal(structure: AnyStructure): structure is AnyModalStructure {
        return structure.structureType === StructureType.Modal;
    }
}
