import { DatabaseErrors } from '../helpers/errors/database-errors'

export class GenericQueries<T> {
    constructor(private model: any) {}

    async create(data: any): Promise<T> {
        try {
        return await this.model.create({ data })
        } catch {
        DatabaseErrors.throwQueryFailed()
        }
    }

    async findMany(filter = {}): Promise<T[]> {
        try {
        return await this.model.findMany({ where: filter })
        } catch {
        DatabaseErrors.throwQueryFailed()
        }
    }

    async findUnique(where: any): Promise<T | null> {
        try {
        return await this.model.findUnique({ where })
        } catch {
        return DatabaseErrors.throwQueryFailed()
        }
    }

    async update(id: string | number, data: any): Promise<T> {
        try {
        return await this.model.update({ where: { id }, data })
        } catch {
        DatabaseErrors.throwQueryFailed()
        }
    }

    async delete(id: string | number): Promise<T> {
        try {
        return await this.model.delete({ where: { id } })
        } catch {
        DatabaseErrors.throwQueryFailed()
        }
    }
}