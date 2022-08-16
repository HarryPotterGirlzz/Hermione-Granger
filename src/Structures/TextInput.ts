import { TextInputBuilder } from 'discord.js';
import { Structure, StructureType } from './Structures';
import type { IStructure } from './Types';

export interface TextInput extends IStructure {}

@Structure({ type: StructureType.Component, callback: false })
export class TextInput extends TextInputBuilder {}
