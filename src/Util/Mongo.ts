import type { Collection, WithId } from 'mongodb';

export interface DatabaseUser {
    id: string;
    subscribed: boolean;
}

export async function findUserOrCreate(
    collection: Collection<DatabaseUser>,
    id: string
): Promise<WithId<DatabaseUser>> {
    let user = await collection.findOne({ id });

    if (!user) {
        const inserted = await collection.insertOne({ id, subscribed: false });

        user = (await collection.findOne({ _id: inserted.insertedId })) as WithId<DatabaseUser>;
    }

    return user;
}
