import { BaseErrors } from "./base-errors";

import { generateDate } from "../../core/generators/Date";

import { countDaysInRange } from "../utils/count_days_Range";

export class DateErrors extends BaseErrors 
{
    static ensureGenerator(start: Date, end: Date, day: number | null, qtd: number) 
    {
        if(!start) BaseErrors.throwMissing("start")
        if(!end) BaseErrors.throwMissing("end")

        if(start >= end) throw new BaseErrors(`A data de início (start) não pode ser maior ou igual que a data de fim (end).`, 400);

        const availableDays = countDaysInRange(start, end, day);
        if (qtd > availableDays) {
            throw new Error(
                `Intervalo insuficiente. Você pediu ${qtd} data(s), mas existem apenas ${availableDays} data(s) para o dia da semana selecionado.`
            );
        }

        if(generateDate(start, end, day, qtd) == null) BaseErrors.throwGenerationFailed("Data(s) sorteada(s)")
    }
}