import { SelectMenuBuilder, type SelectMenuInteraction } from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { HasCallback, IStructure } from './Types';

export interface SelectMenu extends IStructure, HasCallback<SelectMenuInteraction<'cached'>> {}

@Structure({ type: StructureType.Component, callback: true })
export class SelectMenu extends SelectMenuBuilder {}
