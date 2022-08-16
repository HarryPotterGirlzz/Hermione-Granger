import {
    type ActionRowBuilder,
    ModalBuilder,
    type ModalSubmitInteraction,
    normalizeArray,
    type RestOrArray,
    ModalActionRowComponentBuilder,
} from 'discord.js';
import { ModalActionRow } from './ActionRow';
import { Structure, StructureType } from './Structures';
import type { TextInput } from './TextInput';
import type { HasCallback, IStructure } from './Types';

export interface Modal extends IStructure, HasCallback<ModalSubmitInteraction<'cached'>> {}

@Structure({ type: StructureType.Modal, callback: true })
export class Modal extends ModalBuilder {
    declare components: ModalActionRow[];

    override addComponents(...components: RestOrArray<ActionRowBuilder<ModalActionRowComponentBuilder>>): never;
    override addComponents() {
        throw new Error('addComponents() is not supported on Modal. Use addTextInputComponents() instead.');
    }

    override setComponents(...components: RestOrArray<ActionRowBuilder<ModalActionRowComponentBuilder>>): never;
    override setComponents() {
        throw new Error('setComponents() is not supported on Modal. Use setTextInputComponents() instead.');
    }

    addModalComponents(...modalComponents: RestOrArray<ModalComponent>): this {
        modalComponents = normalizeArray(modalComponents);

        if (this.components.length + modalComponents.length > 5)
            throw new Error('A Modal cannot have more than five components.');

        return super.addComponents(modalComponents.map(component => new ModalActionRow(component)));
    }

    setModalComponents(...modalComponents: RestOrArray<ModalComponent>): this {
        modalComponents = normalizeArray(modalComponents);

        if (modalComponents.length > 5) throw new Error('A Modal cannot have more than five components.');

        return super.setComponents(modalComponents.map(component => new ModalActionRow(component)));
    }
}

export type ModalComponent = TextInput;
