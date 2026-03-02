import { BaseErrors } from './base-errors';

import { uuidGenerator } from '../../core/generators/UUID';

import { _UUID } from '../types/T-UUID'

export class UuidErrors extends BaseErrors 
{
    static ensureGenerator(uuid: _UUID) 
    {
        if(!uuid) this.throwGenerationFailed("UUID")
    }

    static ensureValidator(uuid: _UUID) 
    {
        if(!uuid) this.throwMissing("UUID")
    }
}