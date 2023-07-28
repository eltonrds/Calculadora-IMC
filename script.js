// Algoritimo

// CALCULARIMC
// 1. Pegar os valores
// 2. Calcular o IMC
// 3. Gerar a classifocacao do IMC
// 4. Organizar as informacoes 
// 5. Salvar os dados da lista 
// 6. Ler a lista com os dados
// 7. Renderizar o conteudo no html
// 8. Botao de limpar os registros 

//funcao principal
function calcularImc(event) {
    event.preventDefault()

    console.log("Funcionate!!!");

    let dadosUsuario = pegarValores();
    
    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

    let classificacao = classificarImc(imc); 

    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacao);

    cadastroUsuario(usuarioAtualizado);


    // console.log(classificarImc(imc));
    
}

// passo 1 - Pegar valor 
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebida = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value);

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida, 
        peso: pesoRecebido
    }
    console.log(dadosUsuario);

    return dadosUsuario;
}

// Passo 2 - calcular
function calcular(altura, peso) {
    let imc = peso / (peso * altura)

     console.log(imc);

     return imc;
}

// passo 3 - classificar 
 function classificarImc(imc) {
    /*
        resultado           Situacao
        Menor que 18,5      Filezinho!!
        Entre 18,5 e 24,99  Dìlica!!!!
        Entre 25 e 29,99    Ta Top!!!
        Acima de 30         Oh la em casa!!!
    */

    if (imc < 18,5) {
        return "Filezinho!!";

    }else if(imc < 25){
        return "Dìlica!!!!"

    }else if (imc < 30){
        return  "Ta Top!!!"

    }else{
        return "Oh la em casa!!!"
    }
 }

 // passo 4 - Organizar informacoes
function organizarDados(dadosUsuario, valorImc, classificarImc) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short'}).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificar: classificarImc,
        dataCadastro: dataHoraAtual
    }
    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}


// passo 5 - Salvar
function cadastroUsuario(usuario) {
    let listaUsuarios = [];

    if(localStorage.getItem("usuariosCadastrados")){
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    
    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

// passo 6 - Ler lista
function carregarUsuario() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }


    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuarios cadastro!</td>
    </tr>` 


    }else{
        montarTabela(listaUsuarios)
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuario())

// psso 7 - Montar a tabela (renderizar)

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';
    listaDeCadastrados.forEach(pessoa => {
        template += 
        `<tr>
            <td data-cell="nome">${pessoa.nome}</td>
            <td data-cell="altura">${pessoa.altura}</td>
            <td data-cell="peso">${pessoa.peso}</td>
            <td data-cell="valor do IMC">${pessoa.imc}</td>
            <td data-cell="classificação do IMC">${pessoa.classificar}</td>
            <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
        </tr>`
    });

    tabela.innerHTML = template;

}