const readline = require('readline-sync');
const fs = require('fs');
const { json } = require('stream/consumers');

const menus = [
    'Adicionar tarefas',
    'Listar tarefas',
    'Marcar tarefa como resolvida',
    'Remover tarefa',
    'Salvar tarefa',
    'Carregar tarefas'
];

let tarefas = [];
console.clear();
const user = readline.question('Qual seu nome? ');
console.clear();
console.log('Bem-vindo ao menu de tarefas, ' + user + '!');

function limpar() {
    console.clear();
};

function menu() {
    const opcao = readline.keyInSelect(menus, 'Escolha uma opção:');
    switch(opcao) {
        case 0:
            Adicionar_tarefas();
            break;
        case 1:
            Listar_tarefas();
            break;
        case 2:
            Marcar_tarefas();
            break;
        case 3:
            Remover_tarefas();
            break;
        case 4:
            Salvar_tarefas();
            break;
        case 5:
            Carregar_tarefas();
            break;
        case -1:
            console.log('Saindo...');
            process.exit();
            break;
        default:
            console.log('Opção inválida');
            menu();
            break;
    }
};

function Adicionar_tarefas() {
    const nome = readline.question('Nome da tarefa: ');
    const nova_tarefa = {
        id: tarefas.length + 1,
        nome
    };
    tarefas.push(nova_tarefa);
    limpar();
    console.log('Tarefa cadastrada, ' + user + '!');
    menu();
};

function Listar_tarefas() {
    console.log('\n=== Tarefas ===');
    if (tarefas.length === 0) {
        limpar();
        console.log('Nenhuma tarefa cadastrada.');
    } else {
        limpar();
        console.log('Tarefas atuais: ')
        tarefas.forEach((tarefa) => {
            console.log(`${tarefa.id}: ${tarefa.nome}`);
        });
    }
    menu();
};

function Marcar_tarefas () {
    if (tarefas.length === 0) {
        limpar();
        console.log('Não há nenhuma tarefa!');
    } else {
        console.log('\n=== Tarefas ===');
        tarefas.forEach((tarefa) => {
            console.log(`${tarefa.id}: ${tarefa.nome}`);
        });
        const marcar = readline.questionInt('Escolha o ID da taerfa que você deseja resolver. ');
        const taerfa_encontrada = tarefas.find(t => t.id === marcar);
        if (taerfa_encontrada) {
            limpar();
            taerfa_encontrada.nome += ' [resolvida]';
            console.log('Tarefa resolvida com sucesso!');
        } else {
            limpar();
            console.log('Tarefa não encontrada.');
        }
    }
    menu();
};

function Remover_tarefas() {
    if (tarefas.length === 0) {
        limpar();
        console.log('Não há nenhuma tarefa!');
    } else {
        console.log('\n=== Tarefas ===');
        tarefas.forEach((tarefa) => {
            console.log(`${tarefa.id}: ${tarefa.nome}`);
        });
        const apagar = readline.questionInt('Escolha o ID da taerfa que você deseja apagar. ');
        const tarefa_apagar = tarefas.findIndex(t => t.id === apagar);
        if (tarefa_apagar !== -1) {
            limpar();
            tarefas.splice(tarefa_apagar, 1);
            console.log('Tarefa apagada com sucesso!');
        } else {
            limpar();
            console.log('Tarefa não encontrada');
        }
    }
    menu();
};

function Salvar_tarefas() {
    if (tarefas.length === 0) {
        limpar();
        console.log('Não há nenhuma tarefa!');
    } else {
        console.log('\n=== Tarefas ===');
        tarefas.forEach((tarefa) => {
            console.log(`${tarefa.id}: ${tarefa.nome}`);
        });

        const salvar = readline.questionInt('Escolha o ID da tarefa que você deseja salvar em JSON: ');
        const tarefa_salvar = tarefas.find(t => t.id === salvar);

        if (tarefa_salvar) {
            limpar();
            let tarefas_salvas = [];

            if (fs.existsSync('tarefas.json')) {
                const dados = fs.readFileSync('tarefas.json', 'utf-8');
                if (dados.trim() !== '') {
                    tarefas_salvas = JSON.parse(dados);
                    if (!Array.isArray(tarefas_salvas)) {
                        tarefas_salvas = [tarefas_salvas];
                    }
                }
            }
            const jaExiste = tarefas_salvas.some(t => t.id === tarefa_salvar.id);
            if (!jaExiste) {
                limpar();
                tarefas_salvas.push(tarefa_salvar);
                fs.writeFileSync('tarefas.json', JSON.stringify(tarefas_salvas, null, 2));
                console.log('Tarefa salva com sucesso!');
            } else {
                limpar();
                console.log('Essa tarefa já foi salva antes.');
            }
        } else {
            limpar();
            console.log('Tarefa não encontrada.');
        }
    }

    menu();
}


function Carregar_tarefas() {
    limpar();
    console.log('Carregando tarefas...')
    if (fs.existsSync('tarefas.json')) {
        const dados = fs.readFileSync('tarefas.json', 'utf-8');
        const Tarefas = JSON.parse(dados);
        limpar();
        console.log('Tarefas carregdas!');
        console.log(Tarefas);
    } else {
        limpar();
        console.log('Nenhum arquivo encontrado.');
    }
    menu();
};

menu();
