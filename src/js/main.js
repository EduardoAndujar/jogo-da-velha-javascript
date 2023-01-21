//Constantes e variáveis
const celulas = document.querySelectorAll('.celula');
const linhas = document.querySelectorAll('.linha');
const colunas = [
    document.querySelectorAll('.celula-esquerda'),
    document.querySelectorAll('.celula-direita'),
    document.querySelectorAll('.celula-meio'),
];
const botaoReiniciar = document.querySelector('.modal-container').children[0].children[1];

var contadorDeVez = 0;
var conteudo = '';
var rodandoJogo = true;

celulas.forEach((element) => {
    element.textContent = conteudo;
    element.addEventListener('click', function click() {
        preencherCelula(element);
        element.removeEventListener('click', click);
    });
});

botaoReiniciar.addEventListener('click', () => location.reload(true));

//Funções
function preencherCelula(elemento) {
    if (rodandoJogo) {
        if (contadorDeVez % 2 === 0) {
            conteudo = 'X';
        } else {
            conteudo = 'O';
        }
        contadorDeVez++;
        elemento.textContent = conteudo;
        if (contadorDeVez < 9) {
            verificaCondicoes();
        } else {
            terminarJogo();
        }
    }
}

function verificaCondicoes() {
    verificaLinhas();
    verificaColunas();
    verificaDiagonais();
}

function verificaLinhas() {
    linhas.forEach((linha) => {
        let conteudoLinha2 = linha.children[1];
        let conteudoLinha1 = linha.children[0];
        let conteudoLinha3 = linha.children[2];

        if (conteudoLinha1.textContent !== '') {
            if (
                conteudoLinha1.textContent === conteudoLinha2.textContent &&
                conteudoLinha1.textContent === conteudoLinha3.textContent
            ) {
                terminarJogo(conteudoLinha1, conteudoLinha2, conteudoLinha3);
            }
        }
    });
}

function verificaColunas() {
    colunas.forEach((coluna) => {
        let conteudoColuna1 = coluna[0];
        let conteudoColuna2 = coluna[1];
        let conteudoColuna3 = coluna[2];
        if (conteudoColuna1.textContent !== '') {
            if (
                conteudoColuna1.textContent === conteudoColuna2.textContent &&
                conteudoColuna1.textContent === conteudoColuna3.textContent
            ) {
                terminarJogo(conteudoColuna1, conteudoColuna2, conteudoColuna3);
            }
        }
    });
}

function verificaDiagonais() {
    let conteudoCelula1 = celulas[0];
    let conteudoCelula5 = celulas[4];
    let conteudoCelula9 = celulas[8];
    let conteudoCelula3 = celulas[2];
    let conteudoCelula7 = celulas[6];

    if (conteudoCelula1.textContent !== '') {
        if (
            conteudoCelula1.textContent === conteudoCelula5.textContent &&
            conteudoCelula1.textContent === conteudoCelula9.textContent
        ) {
            terminarJogo(conteudoCelula1, conteudoCelula5, conteudoCelula9);
        }
    }

    if (celulas[2].textContent !== '') {
        if (
            conteudoCelula3.textContent === conteudoCelula5.textContent &&
            conteudoCelula3.textContent === conteudoCelula7.textContent
        ) {
            terminarJogo(conteudoCelula3, conteudoCelula5, conteudoCelula7);
        }
    }
}

function terminarJogo(celula1, celula2, celula3) {
    let modal = document.querySelector('.modal-container');
    let mensagem = modal.children[0].children[0];
    rodandoJogo = false;

    if (celula1 || celula2 || celula3) {
        celula1.style.color = 'blue';
        celula2.style.color = 'blue';
        celula3.style.color = 'blue';

        if (conteudo === 'X') {
            mensagem.textContent = 'A letra X Ganhou!';
        } else {
            mensagem.textContent = 'A letra O Ganhou!';
        }
    } else {
        mensagem.textContent = 'Deu velha!';
    }

    modal.classList.add('modal-container-show');
}
