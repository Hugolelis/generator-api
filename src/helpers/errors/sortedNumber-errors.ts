import { BaseErrors } from "./base-errors";

import { sortedNumberGenerator } from "../../core/generators/SortedNumber";

export class SortedNumberErrors extends BaseErrors 
{
    static ensureGenerator(min: number, max: number, qtd: number) 
    {
        if(min > max) throw new BaseErrors("O valor mínimo (min) não pode ser maior ao máximo (max).", 400)
        if(min < 0 || max <= 0 || qtd <= 0) throw new BaseErrors("Os valores passados devem ser números naturais.", 400)
            
        const maxQtd = 20
        if(qtd > maxQtd) throw new BaseErrors(`O máximo de número sorteados simultaneamente é ${maxQtd}.`, 400)
            
        const rangeDisponivel = (max - min) + 1;
        if(qtd > rangeDisponivel) throw new BaseErrors(`Impossível sortear ${qtd} números únicos em um intervalo de apenas ${rangeDisponivel} números.`, 400)        

        if(sortedNumberGenerator(min, max, qtd) == null) return this.throwGenerationFailed("número sorteado(s)")
    }
}