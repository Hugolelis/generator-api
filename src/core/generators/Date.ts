import { _date } from "../../helpers/types/T-Date";

export function generateDate(start: Date, end: Date, day: number, qtd: number): _date {
    const results: Date[] = [];
    const startTime = start.getTime();
    const endTime = end.getTime();

    while (results.length < qtd) {
        // Gera um timestamp aleatório no intervalo
        const randomTime = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
        const date = new Date(randomTime);

        // Calcula quanto falta para chegar no dia da semana escolhido (0-6)
        const diff = (day - date.getDay() + 7) % 7;
        date.setDate(date.getDate() + diff);
    }

    return qtd === 1 ? results[0] : results;
}

