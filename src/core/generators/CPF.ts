export function cpfGenerator(): string {
    const rnd = (n: number) => Math.floor(Math.random() * n);
    const mod = (dividendo: number, divisor: number) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

    const n = Array.from({ length: 9 }, () => rnd(9));

    // Primeiro dígito verificador
    let d1 = n.reduce((acc, val, i) => acc + (val * (10 - i)), 0);
    d1 = 11 - mod(d1, 11);
    if (d1 >= 10) d1 = 0;

    // Segundo dígito verificador
    let d2 = d1 * 2 + n.reduce((acc, val, i) => acc + (val * (11 - i)), 0);
    d2 = 11 - mod(d2, 11);
    if (d2 >= 10) d2 = 0;

    const cpf = `${n.join('')}${d1}${d2}`;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
