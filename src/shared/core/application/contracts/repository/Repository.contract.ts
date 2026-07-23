export interface RepositoryContract<T> {
    findById(id: string): Promise<T>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
    update(id: string, entity: T): Promise<void>;
}
