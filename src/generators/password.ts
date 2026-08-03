import { randomInt } from "crypto";

export function passwordGenerator(qtdCaractere: number, upper: boolean, lower: boolean, number: boolean, specCaractere: boolean): string 
{
    const charSets = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        number: "0123456789",
        special: "!@#$%^&*()_+~`|}{[]:;?><,.-="
    };

    let passwordArray: string[] = [];
    let availableChars = "";

    // Garante um de cada tipo selecionado

    if(upper) 
    {
        passwordArray.push(charSets.upper[randomInt(0, charSets.upper.length)]);
        availableChars += charSets.upper;
    }
    if(lower) 
        {
        passwordArray.push(charSets.lower[randomInt(0, charSets.lower.length)]);
        availableChars += charSets.lower;
    }
    if(number) 
    {
        passwordArray.push(charSets.number[randomInt(0, charSets.number.length)]);
        availableChars += charSets.number;
    }
    if(specCaractere) 
    {
        passwordArray.push(charSets.special[randomInt(0, charSets.special.length)]);
        availableChars += charSets.special;
    }

    // loops para geração

    for (let i = passwordArray.length; i < qtdCaractere; i++) 
    {
        passwordArray.push(availableChars[randomInt(0, availableChars.length)]);
    }

    for (let i = passwordArray.length - 1; i > 0; i--) 
    {
        const j = randomInt(0, i + 1);
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}