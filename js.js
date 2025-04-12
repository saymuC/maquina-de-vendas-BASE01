const readline = require('readline-sync');
const produtos1 = ["Coca", "Fanta", "Pepsi", "Guarana"];
const produtos2 = ["Militos", "Cheetos", "Doritos", "Fandangos"];
const produtos3 = ["Barra de Chocolate", "Barra de proteina", "Barrinha de cereal", "Barrinha de Flocos"];
const categoria = ["Refrigerante em lata", "Salgadinhos", "Barrinhas"];

const nome = readline.question('Qual seu nome? ');
console.log('Olá ' + nome + '!');

if (readline.keyInYN('Voce deseja comprar algum de nossos produtos?')) {
    const escolha = readline.keyInSelect(categoria, 'Escolha uma dessas categorias!');
    if (escolha === -1) {
        console.log('Voce cancelou a compra ' + nome, '!');
    } else if (escolha >= 0) {
        const escolha1 = [produtos1, produtos2, produtos3];
        const produtos_escolhidos = escolha1[escolha];
        const escolha_final = readline.keyInSelect(produtos_escolhidos, "Qual voce deseja comprar?");
        if (escolha_final === -1) {
            console.log('Voce cancelou a compra ' + nome, '!');
            return;
        }
        readline.keyInYN('Voce escolheu ' + produtos_escolhidos[escolha_final], 'deseja continuar?');
        console.log('obrigado plea compra ' + nome + "!");
    }
} else {
    console.log('Valor invalido. Fechando programa...')
}