import type { RepositoryContract } from "../Repository.contract";

export class FakeRepository<
    T extends {
        id: string;
    },
> implements RepositoryContract<T> {
    protected readonly items: T[] = [];

    async findById(id: string): Promise<T> {
        const item = this.items.find((item) => item.id === id);
        if (!item) {
            throw new Error(`Item with id ${id} not found`);
        }
        return item;
    }

    async save(entity: T): Promise<void> {
        this.items.push(entity);
        return;
    }

    async delete(id: string): Promise<void> {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.items.splice(index, 1);
        return;
    }

    async update(id: string, entity: T): Promise<void> {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.items[index] = entity;
        return;
    }
}
