import {
    type APIButtonComponentWithCustomId,
    type APIButtonComponentWithURL,
    ButtonBuilder,
    type ButtonInteraction,
    ButtonStyle,
} from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { HasCallback, IStructure } from './Types';

export interface InteractionButton extends IStructure, HasCallback<ButtonInteraction<'cached'>> {}

@Structure({ type: StructureType.Component, callback: true })
export class InteractionButton extends ButtonBuilder {
    declare readonly data: APIButtonComponentWithCustomId;

    override setStyle(style: Exclude<ButtonStyle, ButtonStyle.Link>): this;
    override setStyle(style: ButtonStyle) {
        if (style === ButtonStyle.Link) throw new Error('The style of a normal Button cannot be Link.');

        return super.setStyle(style);
    }

    /** @deprecated The URL of a normal Button cannot be set. Use LinkButton instead. */
    override setURL(url: string): never;
    override setURL() {
        throw new Error('The URL of a normal Button cannot be set.');
    }
}

export interface LinkButton extends IStructure {}

@Structure({ type: StructureType.Component, callback: false })
export class LinkButton extends ButtonBuilder {
    declare readonly data: APIButtonComponentWithURL;

    constructor() {
        super();

        super.setStyle(ButtonStyle.Link);
    }

    /** @deprecated The style of a LinkButton cannot be changed. Use Button instead. */
    override setStyle(style: ButtonStyle): never;
    override setStyle() {
        throw new Error('The style of a LinkButton cannot be changed.');
    }

    /** @deprecated The customId of a LinkButton cannot be set. Use Button instead. */
    override setCustomId(customId: string): never;
    override setCustomId() {
        throw new Error('The customId of a LinkButton cannot be set.');
    }
}

export type Button = InteractionButton | LinkButton;
