export class GenericQueries<T> {
    constructor(private model: any) {}

    async create(data: any): Promise<T> {
        return await this.model.create({ data });
    }

    async findMany(filter = {}): Promise<T[]> {
        return await this.model.findMany({ 
            where: filter 
        });
    }

    async staticfindUnique(where: any): Promise<T | null> {
        return await this.model.findUnique({ where });
    }

    async update(id: string, data: any): Promise<T> {
        return await this.model.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<T> {
        return await this.model.delete({ 
            where: { id } 
        });
    }
}