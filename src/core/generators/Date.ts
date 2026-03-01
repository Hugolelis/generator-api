import { _date } from "../../helpers/types/T-Date";

export function generateDate(start: Date, end: Date, day: number | null, qtd: number): _date {
    const results: string[] = [];

    // Transforma input em Date
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    while (results.length < qtd) {
        // Gera um timestamp aleatório no intervalo
        const randomTime = Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;
        const date = new Date(randomTime);

        // Calcula quanto falta para chegar no dia da semana escolhido (0-6)
        if(day != undefined) 
        {
            const diff = (day - date.getDay() + 7) % 7;
            date.setDate(date.getDate() + diff);
        } 

        // Formata data corretamente
        const formatedDate = date.toISOString().split('T')[0]
        
        if(!results.includes(formatedDate)) results.push(formatedDate);
    }

    // Organiza em ordem cronológica
    results.sort();

    return qtd === 1 ? results[0] : results;
}

