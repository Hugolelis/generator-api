import { _UUID } from '../../helpers/types/T-UUID'
import crypto from 'crypto';

export function uuidGenerator(): _UUID 
{
    // Gerar 16 bytes aleatórios (128 bits total)
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Ajustar a Versão para 4
    bytes[6] = (bytes[6] & 0x0f) | 0x40;

    // Ajustar a Variante (deve ser 8, 9, A ou B)
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    // Converter os bytes para a string formatada
    const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0'));

    const uuidString = [
        hex.slice(0, 4).join(''),
        hex.slice(4, 6).join(''),
        hex.slice(6, 8).join(''),
        hex.slice(8, 10).join(''),
        hex.slice(10, 16).join('')
    ].join('-');

    return uuidString as _UUID;
}