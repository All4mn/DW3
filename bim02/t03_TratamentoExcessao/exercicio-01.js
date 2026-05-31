function dividir(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Os valores devem ser números');
    }

    if (b === 0) {
        throw new Error('Não é possível dividir por zero');
    }

    return a / b;
}

const testes = [
    { a: 10, b: 2 },
    { a: 10, b: 0 },
    { a: '10', b: 2 }
];

testes.forEach(({ a, b }) => {
    try {
        console.log(`Dividindo ${a} / ${b}...`);
        const resultado = dividir(a, b);
        console.log(`Resultado: ${resultado}`);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
    }
    console.log('---');
});
