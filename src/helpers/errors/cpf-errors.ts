import { BaseErrors } from "./base-errors";

export class CpfErrors extends BaseErrors
{
    static ensureGenerator(CPF: string)
    {
        if(!CPF) this.throwGenerationFailed("CPF")
    }

    static ensureValidator(CPF: string)
    {

    }
}