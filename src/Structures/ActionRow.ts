import { ActionRowBuilder, type ModalActionRowComponentBuilder, type RestOrArray } from 'discord.js';
import type { ModalComponent } from './Modal';
import { Structure, StructureType } from './Structures';
import type { IStructure } from './Types';

export interface ModalActionRow extends IStructure {}

@Structure({ type: StructureType.Component, callback: false })
export class ModalActionRow extends ActionRowBuilder<ModalActionRowComponentBuilder> {
    declare readonly components: ModalComponent[];

    constructor(component?: ModalActionRowComponentBuilder) {
        super(component ? { components: [component] } : {});
    }

    override addComponents(...components: RestOrArray<ModalActionRowComponentBuilder>): never;
    override addComponents() {
        throw new Error('addComponents() is not supported on ModalActionRow. Use setComponent() instead.');
    }

    override setComponents(...components: RestOrArray<ModalActionRowComponentBuilder>): never;
    override setComponents() {
        throw new Error('setComponents() is not supported on ModalActionRow. Use setComponent() instead.');
    }

    setComponent(component: ModalComponent): this {
        return super.setComponents(component);
    }

    get component(): ModalComponent {
        if (!this.components.length) throw new Error('No component has been set on this ModalActionRow.');

        return this.components[0];
    }
}

export type ActionRow = ModalActionRow;
