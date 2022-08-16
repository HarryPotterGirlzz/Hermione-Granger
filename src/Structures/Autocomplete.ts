import type { AutocompleteInteraction } from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { HasCallback, HasName, IStructure } from './Types';

export interface Autocomplete extends IStructure, HasName, HasCallback<AutocompleteInteraction<'cached'>> {}

@Structure({ type: StructureType.Autocomplete, callback: true })
export class Autocomplete {
    setName(name: string) {
        this.name = name;

        return this;
    }
}
