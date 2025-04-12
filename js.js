const readline = require('readline-sync');
const produtos = ["Coca", "Fanta", "Pepsi", "Guarana"]

const nome = readline.question('Qual seu nome? ');
console.log('Olá ' + nome + '!');

if (readline.keyInYN('Voce deseja comprar nossos produtos?')) {
    const escolha = readline.keyInSelect(produtos, "Qual voce deseja comprar?");
    if (escolha === -1) {
        console.log('Voce cancelou a compra ' + nome);
    } else {
        console.log("Certo, " + produtos[escolha] + " para " + nome + "!");
    }
} else {
    console.log("saindo...")
}