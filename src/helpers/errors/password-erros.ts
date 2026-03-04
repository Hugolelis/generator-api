import { BaseErrors } from "./base-errors";

import { passwordGenerator } from "../../core/generators/password";

export class PasswordErrors extends BaseErrors
{
    static ensureGenerator(qtdCaractere: number, upper: boolean, lower: boolean, number: boolean, specCaractere: boolean)
    {
        if(qtdCaractere < 6) throw new BaseErrors("A quantidade de caracteres deve ser maior ou igual a 6.", 400)
        if(qtdCaractere > 20) throw new BaseErrors("A quantidade de caracteres deve ser menor ou igual a 20.", 400)

        if(!upper && !lower && !number && !specCaractere) 
            throw new BaseErrors("Ao menos uma das opções (upper, lower, number, specCaractere) deve estar selecionada.", 400)

        if(passwordGenerator(qtdCaractere, upper, lower, number, specCaractere) == null) this.throwGenerationFailed('password')
    }
}