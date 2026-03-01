export function countDaysInRange(start: Date, end: Date, day: number | null): number 
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