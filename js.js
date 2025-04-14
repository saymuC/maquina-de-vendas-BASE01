const readline = require('readline-sync');
const fs = require('fs');
const produtos1 = ["Coca", "Fanta", "Pepsi", "Guarana"];
const produtos2 = ["Militos", "Cheetos", "Doritos", "Fandangos"];
const produtos3 = ["Barra de Chocolate", "Barra de proteina", "Barrinha de cereal", "Barrinha de Flocos"];
const produtos4 = ["Leite", "Achocolatado", "Agua com gas", "Suco de limao", "Energetico"]
const categoria = ["Refrigerante em lata", "Salgadinhos", "Barrinhas", "Bebidas"];

console.clear();

const nome = readline.question('Qual seu nome? ');
console.clear();
console.log('Olá ' + nome + '!');

if (readline.keyInYN('Voce deseja comprar algum de nossos produtos?')) {
    console.clear();
    const escolha = readline.keyInSelect(categoria, 'Escolha uma dessas categorias!');
    const categoria_escolha = categoria[escolha]
    if (escolha === -1) {
        console.clear();
        console.log('Voce cancelou a compra ' + nome, '!');
    } else if (escolha >= 0) {
        console.clear();
        const escolha1 = [produtos1, produtos2, produtos3, produtos4];
        const produtos_escolhidos = escolha1[escolha];
        const escolha_final = readline.keyInSelect(produtos_escolhidos, "Qual voce deseja comprar?");
        if (escolha_final === -1) {
            console.clear();
            console.log('Voce cancelou a compra ' + nome, '!');
            return;
        }
        console.clear();
        const continuar = readline.keyInYN('Voce escolheu ' + produtos_escolhidos[escolha_final] + ' deseja continuar?');
        if (continuar === false) {
            console.clear();
            console.log('Reinicie o programa e escolha outro produto!');
            return;
        }
        console.clear();
        const quantidade = readline.questionInt('Voce deseja quantos?');
        if (quantidade <= 0) {
            console.clear();
            console.log('Voce inseriu um valor inválido. Saindo...');
            return;
        }
        console.clear();
        console.log('Voce comprou ' + quantidade + ' ' + produtos_escolhidos[escolha_final] + ' obrigado pela compra ' + nome + '!');
        
        const historico_De_Compra = {
            nome: nome,
            produto: produtos_escolhidos[escolha_final],
            categoria: categoria_escolha,
            quantidade: quantidade,
            data: new Date().toISOString()
        };
        let historico = [];
        if (fs.existsSync('historico.json')) {
            const dados = fs.readFileSync('historico.json');
            try {
                historico = JSON.parse(dados);
                if (!Array.isArray(historico)){
                    historico = [];
                }
            } catch(e) {
                historico = [];
            }
        }  
        historico.push(historico_De_Compra); 
        fs.writeFileSync('historico.json', JSON.stringify(historico, null, 2))     
    }
} else {
    console.log('Compra cancelada e/ou valor inválido. Fechando programa...');
}
