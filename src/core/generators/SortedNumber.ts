import { _sortedNumber } from "../../helpers/types/T-SortedNumber";

export function sortedNumberGenerator(min: number, max: number, qtd: number): _sortedNumber {
    const result:_sortedNumber = []

    for (let i = 0; i < qtd; i++) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        result.push(num);
    }

    return qtd === 1 ? result[0] : result;
}