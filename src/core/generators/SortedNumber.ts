import { _sortedNumber } from "../../helpers/types/T-SortedNumber";

export function sortedNumberGenerator(min: number, max: number, qtd: number): _sortedNumber {
    const pool: number[] = []
    for (let i = min; i <= max; i++) {
        pool.push(i)
    }

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]]
    }

    const result = pool.slice(0, qtd).sort((a, b) => a - b)

    return qtd === 1 ? result[0] : result;
}