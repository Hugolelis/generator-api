import { BaseErrors } from "./base-errors";

import { generateDate } from "../../core/generators/Date";

export class DateErrors extends BaseErrors 
{
    static ensureGenerator(start: Date, end: Date, day: number | null, qtd: number) 
    {
        if(!start) BaseErrors.throwMissing("start")
        if(!end) BaseErrors.throwMissing("end")

        if(start >= end) throw new BaseErrors(`A data de início (start) não pode ser maior ou igual que a data de fim (end).`, 400);

        const availableDays = DateErrors.countDaysInRange(start, end, day);
        if (qtd > availableDays) {
            throw new Error(
                `Intervalo insuficiente. Você pediu ${qtd} data(s), mas existem apenas ${availableDays} data(s) para o dia da semana selecionado.`
            );
        }

        if(generateDate(start, end, day, qtd) == null) BaseErrors.throwGenerationFailed("Data(s) sorteada(s)")
    }

    static countDaysInRange(start: Date, end: Date, day: number | null): number 
    {
        const s = new Date(start);
        const e = new Date(end);
        
        // Se não houver dia específico, o limite é o total de dias no intervalo
        if (day === null || day === undefined) {
            const diffTime = Math.abs(e.getTime() - s.getTime());
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        }

        let count = 0;
        let current = new Date(s);

        // Percorre o intervalo contando quantas vezes o 'day' aparece
        while (current <= e) {
            if (current.getDay() === day) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    }
}