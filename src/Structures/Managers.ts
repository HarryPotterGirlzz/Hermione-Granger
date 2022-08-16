import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Collection, Routes, type Client } from 'discord.js';
import type { ActionRow } from './ActionRow';
import type { Button, InteractionButton, LinkButton } from './Button';
import type { ClientEvent } from './ClientEvent';
import type { ContextMenu, MessageContextMenu, UserContextMenu } from './ContextMenu';
import type { SelectMenu } from './SelectMenu';
import type { SlashCommand } from './SlashCommand';
import { StructuresUtil } from './Structures';
import type { TextInput } from './TextInput';
import type {
    AnyAutocompleteStructure,
    AnyCommandStructure,
    AnyComponentStructure,
    AnyModalStructure,
    AnyStructure,
} from './Types';

interface BaseManagerData<T> {
    path: string;
    validator: (structure: T) => boolean;
    validatorErrorMsg: (key: string) => string;
}

abstract class BaseManager<T> {
    protected readonly path: string;
    protected readonly validator: (structure: T) => boolean;
    protected readonly validatorErrorMsg: (key: string) => string;

    constructor(public readonly client: Client, data: BaseManagerData<T>) {
        this.path = data.path;
        this.validator = data.validator;
        this.validatorErrorMsg = data.validatorErrorMsg;
    }

    abstract register(structure: T): void;

    registerAll() {
        if (!existsSync(this.path)) return;

        const files = readdirSync(this.path);

        for (const file of files) {
            const structure = require(join(this.path, file)).default;

            this.register(structure);
        }
    }
}

interface CachedManagerGetOptions<T extends AnyStructure> {
    key: string;
    required?: boolean;
    validator?: (structure: T) => boolean;
    validatorErrorMsg?: (key: string) => string;
}

abstract class CachedManager<T extends AnyStructure> extends BaseManager<T> {
    readonly cache = new Collection<string, T>();

    protected _get(options: CachedManagerGetOptions<T> & { required: true }): T;
    protected _get(options: CachedManagerGetOptions<T>): T | null;
    protected _get({
        key,
        required,
        validator = this.validator,
        validatorErrorMsg = this.validatorErrorMsg,
    }: CachedManagerGetOptions<T>) {
        const structure = this.cache.get(key);

        if (!structure) {
            if (required) throw new Error(`Structure "${key}" not found.`);

            return null;
        }

        if (!validator(structure)) throw new Error(validatorErrorMsg(key));

        return structure;
    }

    protected _register(key: string, structure: T) {
        if (!this.validator(structure)) throw new Error(this.validatorErrorMsg(key));

        this.cache.set(key, structure);
    }
}

export class CommandManager extends CachedManager<AnyCommandStructure> {
    constructor(client: Client) {
        super(client, {
            path: join(__dirname, '..', 'Commands'),
            validator: StructuresUtil.isCommand,
            validatorErrorMsg: key => `Structure "${key}" is not a command.`,
        });
    }

    register(structure: AnyCommandStructure) {
        const key = structure.name;

        if (!key) throw new Error('Command has no name set.');

        this._register(key, structure);
    }

    async deployAll() {
        const { client } = this;

        if (!client.isReady()) throw new Error('Cannot deploy commands until the client is ready.');

        const applicationId = client.application.id;

        const route = Routes.applicationCommands(applicationId);
        const body = this.cache.map(command => command.toJSON());

        await this.client.rest.put(route, { body });
    }

    getCommand(key: string, required: true): AnyCommandStructure;
    getCommand(key: string, required?: boolean): AnyCommandStructure | null;
    getCommand(key: string, required = false) {
        return this._get({ key, required });
    }

    getSlashCommand(key: string, required: true): SlashCommand;
    getSlashCommand(key: string, required?: boolean): SlashCommand | null;
    getSlashCommand(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isSlashCommand,
            validatorErrorMsg: key => `Command "${key}" is not a slash command.`,
        });
    }

    getContextMenu(key: string, required: true): ContextMenu;
    getContextMenu(key: string, required?: boolean): ContextMenu | null;
    getContextMenu(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isContextMenu,
            validatorErrorMsg: key => `Command "${key}" is not a context menu.`,
        });
    }

    getUserContextMenu(key: string, required: true): UserContextMenu;
    getUserContextMenu(key: string, required?: boolean): UserContextMenu | null;
    getUserContextMenu(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isUserContextMenu,
            validatorErrorMsg: key => `Command "${key}" is not a user context menu.`,
        });
    }

    getMessageContextMenu(key: string, required: true): MessageContextMenu;
    getMessageContextMenu(key: string, required?: boolean): MessageContextMenu | null;
    getMessageContextMenu(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isMessageContextMenu,
            validatorErrorMsg: key => `Command "${key}" is not a message context menu.`,
        });
    }
}

export class ComponentManager extends CachedManager<AnyComponentStructure> {
    constructor(client: Client) {
        super(client, {
            path: join(__dirname, '..', 'Components'),
            validator: StructuresUtil.isComponent,
            validatorErrorMsg: key => `Structure "${key}" is not a component.`,
        });
    }

    register(structure: AnyComponentStructure) {
        const { data } = structure;

        let key: string | undefined;

        if ('custom_id' in data && data.custom_id) key = data.custom_id;
        else if ('url' in data && data.url) key = data.url;

        if (!key) throw new Error('Component has no custom_id or url set.');

        return this._register(key, structure);
    }

    getComponent(key: string, required: true): AnyComponentStructure;
    getComponent(key: string, required?: boolean): AnyComponentStructure | null;
    getComponent(key: string, required = false) {
        return this._get({ key, required });
    }

    getActionRow(key: string, required: true): ActionRow;
    getActionRow(key: string, required?: boolean): ActionRow | null;
    getActionRow(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isActionRow,
            validatorErrorMsg: key => `Component "${key}" is not an action row.`,
        });
    }

    getButton(key: string, required: true): Button;
    getButton(key: string, required?: boolean): Button | null;
    getButton(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isButton,
            validatorErrorMsg: key => `Component "${key}" is not a button.`,
        });
    }

    getInteractionButton(key: string, required: true): InteractionButton;
    getInteractionButton(key: string, required?: boolean): InteractionButton | null;
    getInteractionButton(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isInteractionButton,
            validatorErrorMsg: key => `Component "${key}" is not an interaction button.`,
        });
    }

    getLinkButton(key: string, required: true): LinkButton;
    getLinkButton(key: string, required?: boolean): LinkButton | null;
    getLinkButton(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isLinkButton,
            validatorErrorMsg: key => `Component "${key}" is not a link button.`,
        });
    }

    getSelectMenu(key: string, required: true): SelectMenu;
    getSelectMenu(key: string, required?: boolean): SelectMenu | null;
    getSelectMenu(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isSelectMenu,
            validatorErrorMsg: key => `Component "${key}" is not a select menu.`,
        });
    }

    getTextInput(key: string, required: true): TextInput;
    getTextInput(key: string, required?: boolean): TextInput | null;
    getTextInput(key: string, required = false) {
        return this._get({
            key,
            required,
            validator: StructuresUtil.isTextInput,
            validatorErrorMsg: key => `Component "${key}" is not a text input.`,
        });
    }
}

export class AutocompleteManager extends CachedManager<AnyAutocompleteStructure> {
    constructor(client: Client) {
        super(client, {
            path: join(__dirname, '..', 'Autocompletes'),
            validator: StructuresUtil.isAutocomplete,
            validatorErrorMsg: key => `Structure "${key}" is not an autocomplete.`,
        });
    }

    register(structure: AnyAutocompleteStructure) {
        const key = structure.name;

        if (!key) throw new Error('Autocomplete has no name set.');

        this._register(key, structure);
    }

    getAutocomplete(key: string, required: true): AnyAutocompleteStructure;
    getAutocomplete(key: string, required?: boolean): AnyAutocompleteStructure | null;
    getAutocomplete(key: string, required = false) {
        return this._get({ key, required });
    }
}

export class ModalManager extends CachedManager<AnyModalStructure> {
    constructor(client: Client) {
        super(client, {
            path: join(__dirname, '..', 'Modals'),
            validator: StructuresUtil.isModal,
            validatorErrorMsg: key => `Structure "${key}" is not a modal.`,
        });
    }

    register(structure: AnyModalStructure) {
        const key = structure.data.custom_id;

        if (!key) throw new Error('Modal has no custom_id set.');

        this._register(key, structure);
    }

    getModal(key: string, required: true): AnyModalStructure;
    getModal(key: string, required?: boolean): AnyModalStructure | null;
    getModal(key: string, required = false) {
        return this._get({ key, required });
    }
}

export class EventManager extends BaseManager<ClientEvent> {
    constructor(client: Client) {
        super(client, {
            path: join(__dirname, '..', 'Events'),
            validator: structure => typeof structure.name === 'string' && typeof structure.run === 'function',
            validatorErrorMsg: key => `Structure "${key}" is not an event.`,
        });
    }

    register(structure: ClientEvent) {
        const { name, run } = structure;

        if (!this.validator(structure)) throw new Error(this.validatorErrorMsg(name));

        this.client.on(name, run);
    }
}
