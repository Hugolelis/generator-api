export function cpfValidator(CPF: string)
{
    // Remove caracteres especiais (pontos e traços)
    const cleanCPF = CPF.replace(/\D/g, '');

    // Validações básicas: deve ter 11 dígitos e não pode ser sequência repetida
    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    const digits = cleanCPF.split('').map(Number);

    // Cálculo do primeiro dígito verificador (D1)
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
        sum1 += digits[i] * (10 - i);
    }
    let d1 = 11 - (sum1 % 11);
    if (d1 >= 10) d1 = 0;

    // Cálculo do segundo dígito verificador (D2)
    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
        sum2 += digits[i] * (11 - i);
    }
    let d2 = 11 - (sum2 % 11);
    if (d2 >= 10) d2 = 0;

    return digits[9] === d1 && digits[10] === d2;
}