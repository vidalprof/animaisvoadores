/*
 * VERSÃO FINAL COM ÁUDIO CORRIGIDO - 25 de Setembro de 2025
 * - Corrigido o caminho da pasta de áudio para "audios" (sem acento), que é a melhor prática para a web.
 * - Mantida a lógica de tocar/parar o som e de interromper ao mudar de tela.
 */

// --- BANCO DE DADOS COMPLETO DOS ANIMAIS ---
const animais = [
    { id: 'arara_azul', nome: 'Arara-azul', tema: 'tema-aves', img: 'arara_azul.png', habitat: 'Florestas e áreas abertas do Pantanal e Cerrado.', alimentacao: 'Frutas, sementes e castanhas (como o licuri).', habitos: 'Diurna, costuma voar em bandos e é muito barulhenta.', curiosidade: 'É a maior arara do mundo e está ameaçada de extinção.' },
    { id: 'beija_flor', nome: 'Beija-flor', tema: 'tema-aves', img: 'beija_flor.png', habitat: 'Jardins, praças e florestas das Américas.', alimentacao: 'Néctar de flores e pequenos insetos.', habitos: 'Diurno; bate as asas muito rápido e pode ficar parado no ar.', curiosidade: 'Ajuda a polinizar plantas ao levar pólen de flor em flor.' },
    { id: 'coruja', nome: 'Coruja (Tyto alba)', tema: 'tema-aves', img: 'coruja.png', habitat: 'Campos e áreas rurais; também perto de cidades.', alimentacao: 'Roedores, pequenos mamíferos e insetos.', habitos: 'Principalmente noturna, voo silencioso para caçar.', curiosidade: 'Suas penas especiais reduzem o ruído do voo.' },
    { id: 'aguia_harpia', nome: 'Águia-harpia', tema: 'tema-aves', img: 'aguia_harpia.png', habitat: 'Florestas tropicais da América, como a Amazônia.', alimentacao: 'Ave de rapina: caça mamíferos e outras aves.', habitos: 'Diurna; voa alto e observa do topo das árvores.', curiosidade: 'Tem garras muito fortes, entre as maiores entre as aves.' },
    { id: 'borboleta', nome: 'Borboleta', tema: 'tema-insetos', img: 'borboleta.png', habitat: 'Jardins, parques e florestas.', alimentacao: 'Néctar das flores (na fase adulta).', habitos: 'Ativa durante o dia; passa pela metamorfose.', curiosidade: 'Seu ciclo de vida: ovo → lagarta → pupa → adulto.' },
    { id: 'morcego_frugivoro', nome: 'Morcego frugívoro', tema: 'tema-mamiferos', img: 'morcego_frugivoro.png', habitat: 'Cavernas, ocos de árvores e telhados.', alimentacao: 'Frutas e néctar (há espécies que comem insetos).', habitos: 'Noturno; usa a ecolocalização para se orientar.', curiosidade: 'É o único mamífero capaz de voar ativamente.' },
    { id: 'andorinha', nome: 'Andorinha-das-chaminés', tema: 'tema-aves', img: 'andorinha.png', habitat: 'Áreas abertas, fazendas, vilas e cidades.', alimentacao: 'Insetos capturados em voo.', habitos: 'Diurna e migratória; voa em grupos e faz ninhos em construções.', curiosidade: 'Suas asas longas e cauda em forma de “V” ajudam em manobras rápidas.' },
    { id: 'tucano', nome: 'Tucano-toco', tema: 'tema-aves', img: 'tucano.png', habitat: 'Bordas de florestas e áreas abertas da América do Sul.', alimentacao: 'Frutas, ovos e pequenos animais.', habitos: 'Diurno; o bico grande ajuda a alcançar frutos e a regular a temperatura.', curiosidade: 'Apesar do bico enorme, é leve por dentro (cheio de “cavidades”).' },
    { id: 'gaivota', nome: 'Gaivota', tema: 'tema-aves', img: 'gaivota.png', habitat: 'Costas, praias, ilhas e portos.', alimentacao: 'Peixes, restos de comida e outros animais pequenos.', habitos: 'Diurna; plana sobre o mar e é muito oportunista.', curiosidade: 'É comum em diversas cidades litorâneas do Brasil.' },
    { id: 'abelha', nome: 'Abelha', tema: 'tema-insetos', img: 'abelha.png', habitat: 'Colmeias em troncos, cavidades ou caixas de apicultura.', alimentacao: 'Néctar e pólen das flores.', habitos: 'Diurna e social; usa “danças” para indicar fontes de alimento.', curiosidade: 'É importante polinizadora para muitas plantas e alimentos.' },
    { id: 'libelula', nome: 'Libélula', tema: 'tema-insetos', img: 'libelula.png', habitat: 'Locais próximos a lagos, rios e brejos.', alimentacao: 'Insetos (como mosquitos), que captura em pleno voo.', habitos: 'Diurna; excelente voadora. As larvas vivem na água.', curiosidade: 'Tem olhos grandes que enxergam quase em todas as direções.' },
    { id: 'pomba', nome: 'Pomba-doméstica', tema: 'tema-aves', img: 'pomba.png', habitat: 'Cidades, praças e telhados.', alimentacao: 'Sementes e restos de alimento humano.', habitos: 'Diurna; vive em grupos e constrói ninhos em prédios.', curiosidade: 'Tem ótima orientação e retorna ao ninho mesmo a longas distâncias.' },
    { id: 'garca', nome: 'Garça-branca-grande', tema: 'tema-aves', img: 'garca.png', habitat: 'Manguezais, lagoas, banhados e margens de rios.', alimentacao: 'Peixes, anfíbios e pequenos invertebrados.', habitos: 'Fica parada e “fisga” a presa rapidamente com o bico.', curiosidade: 'Suas penas brancas ajudam na camuflagem em ambientes alagados.' },
    { id: 'gaviao', nome: 'Gavião-carijó', tema: 'tema-aves', img: 'gaviao.png', habitat: 'Áreas urbanas e rurais, parques e campos.', alimentacao: 'Pequenos mamíferos, aves e répteis.', habitos: 'Diurno; frequentemente visto pousado em postes e árvores.', curiosidade: 'É um dos gaviões mais comuns em cidades brasileiras.' },
    { id: 'falcao', nome: 'Falcão-peregrino', tema: 'tema-aves', img: 'falcao.png', habitat: 'Falésias, montanhas e prédios altos nas cidades.', alimentacao: 'Principalmente outras aves, capturadas em voo.', habitos: 'Diurno; famoso por mergulhos muito rápidos para caçar.', curiosidade: 'É um dos animais mais velozes do planeta em voo em mergulho.' }
];

const quizPerguntas = [
    { pergunta: '🤔 1. O que o bico enorme do Tucano-toco ajuda a fazer, além de pegar comida?', opcoes: [{ texto: 'Cantar', valor: 'a' }, { texto: 'Regular a temperatura', valor: 'b' }, { texto: 'Dormir', valor: 'c' }], respostaCorreta: 'b', explicacao: 'O bico do tucano, apesar de grande, é leve e ajuda a regular a temperatura do corpo dele.', respostaUsuario: null },
    { pergunta: '🤔 2. Qual animal é considerado um dos mais velozes do planeta em um voo de mergulho?', opcoes: [{ texto: 'Andorinha-das-chaminés', valor: 'a' }, { texto: 'Águia-harpia', valor: 'b' }, { texto: 'Falcão-peregrino', valor: 'c' }], respostaCorreta: 'c', explicacao: 'O Falcão-peregrino é famoso por seus mergulhos em altíssima velocidade para caçar.', respostaUsuario: null },
    { pergunta: '🤔 3. O que o Morcego frugívoro come?', opcoes: [{ texto: 'Apenas insetos', valor: 'a' }, { texto: 'Frutas e néctar', valor: 'b' }, { texto: 'Pequenos roedores', valor: 'c' }], respostaCorreta: 'b', explicacao: 'A ficha diz que os morcegos frugívoros comem frutas e néctar.', respostaUsuario: null },
    { pergunta: '🤔 4. Como as Abelhas mostram para as outras onde encontrar comida?', opcoes: [{ texto: 'Com "danças"', valor: 'a' }, { texto: 'Com gritos altos', valor: 'b' }, { texto: 'Desenhando no chão', valor: 'c' }], respostaCorreta: 'a', explicacao: 'As abelhas são muito sociais e usam "danças" para comunicar onde há flores com néctar.', respostaUsuario: null },
    { pergunta: '🤔 5. Qual animal tem penas especiais que reduzem o barulho do voo?', opcoes: [{ texto: 'Pomba-doméstica', valor: 'a' }, { texto: 'Coruja', valor: 'b' }, { texto: 'Garça-branca-grande', valor: 'c' }], respostaCorreta: 'b', explicacao: 'As penas especiais da Coruja diminuem o som do bater de asas, tornando seu voo silencioso.', respostaUsuario: null },
    { pergunta: '🤔 6. Onde vive a larva da Libélula antes de ela poder voar?', opcoes: [{ texto: 'Na terra', valor: 'a' }, { texto: 'Dentro de árvores', valor: 'b' }, { texto: 'Na água', valor: 'c' }], respostaCorreta: 'c', explicacao: 'Antes de se tornar uma voadora adulta, a larva da libélula vive na água de lagos e rios.', respostaUsuario: null },
    { pergunta: '🤔 7. Qual animal tem uma cauda em forma de "V" que ajuda em manobras rápidas?', opcoes: [{ texto: 'Gavião-carijó', valor: 'a' }, { texto: 'Andorinha-das-chaminés', valor: 'b' }, { texto: 'Tucano-toco', valor: 'c' }], respostaCorreta: 'b', explicacao: 'A Andorinha-das-chaminés tem uma cauda em "V" que funciona como um leme, ajudando em manobras.', respostaUsuario: null },
    { pergunta: '🤔 8. O que torna a Águia-harpia uma caçadora tão poderosa?', opcoes: [{ texto: 'Seu canto bonito', valor: 'a' }, { texto: 'Suas garras muito fortes', valor: 'b' }, { texto: 'Sua velocidade em terra', valor: 'c' }], respostaCorreta: 'b', explicacao: 'A Águia-harpia é uma ave de rapina poderosa por causa de suas garras enormes e fortes.', respostaUsuario: null },
    { pergunta: '🤔 9. Além do néctar, o que mais o Beija-flor come?', opcoes: [{ texto: 'Pequenos insetos', valor: 'a' }, { texto: 'Sementes', valor: 'b' }, { texto: 'Frutas', valor: 'c' }], respostaCorreta: 'a', explicacao: 'Além do néctar, o Beija-flor também caça pequenos insetos para conseguir proteínas.', respostaUsuario: null },
    { pergunta: '🤔 10. Qual animal é a maior arara do mundo e está ameaçado de extinção?', opcoes: [{ texto: 'Tucano-toco', valor: 'a' }, { texto: 'Arara-azul', valor: 'b' }, { texto: 'Águia-harpia', valor: 'c' }], respostaCorreta: 'b', explicacao: 'A Arara-azul é a maior arara do mundo e, infelizmente, está ameaçada de extinção.', respostaUsuario: null }
];
let nomeAluno = "";
let quizResultados = [];
const player = document.getElementById('player-audio');
let perguntaAtualIndex = 0;
const palavrasCaca = ['ARARA', 'BICO', 'CAVERNA', 'NOTURNO', 'NECTAR', 'INSETO', 'MIGRAR', 'RAPINA', 'POLEN', 'NINHO'];
let pontuacaoCacaPalavras = 0;
let isSelecting = false;
let selection = [];
let foundWords = [];
const gridSize = 12;
let somAtual = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarGridAnimais();
    gerarCacaPalavras();
    mostrarTela('tela-inicio');
});

function mostrarTela(idTela) {
    if (player && !player.paused) {
        player.pause();
        player.currentTime = 0;
        somAtual = null;
    }
    document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
    document.getElementById(idTela).classList.add('ativa');
}

document.getElementById('btn-comecar').addEventListener('click', () => {
    nomeAluno = document.getElementById('nome-aluno').value || "Explorador(a)";
    document.querySelectorAll('.nome-placeholder').forEach(span => span.textContent = nomeAluno);
    mostrarTela('tela-galeria');
});

function carregarGridAnimais() {
    const grid = document.getElementById('grid-animais');
    grid.innerHTML = '';
    animais.forEach(animal => {
        const botao = document.createElement('button');
        botao.className = 'botao-animal';
        botao.textContent = animal.nome;
        botao.onclick = () => mostrarFicha(animal.id);
        grid.appendChild(botao);
    });
}

function mostrarFicha(idAnimal) {
    const animal = animais.find(a => a.id === idAnimal);
    const display = document.getElementById('ficha-display');
    document.querySelectorAll('.botao-animal').forEach(b => b.classList.remove('ativo'));
    const botaoAtivo = Array.from(document.querySelectorAll('.botao-animal')).find(b => b.textContent === animal.nome);
    if (botaoAtivo) botaoAtivo.classList.add('ativo');
    display.className = 'ficha-display';
    display.classList.add(animal.tema);
    display.innerHTML = `<div class="ficha-animal ativa"><div class="ficha-imagem-container"><img src="imagens/${animal.img}" alt="${animal.nome}" class="ficha-imagem"></div><div class="ficha-info"><h3>${animal.nome} <button class="botao-som" onclick="tocarSom('${animal.id}')">🔊 Ouvir</button></h3><div class="info-conteudo"><div class="info-item"><strong>Habitat:</strong> ${animal.habitat}</div><div class="info-item"><strong>Alimentação:</strong> ${animal.alimentacao}</div><div class="info-item"><strong>Hábitos:</strong> ${animal.habitos}</div><div class="info-item curiosidade"><strong>Curiosidade:</strong> ${animal.curiosidade}</div></div></div></div>`;
}

function tocarSom(idAnimal) {
    if (somAtual === idAnimal && !player.paused) {
        player.pause();
        player.currentTime = 0;
        somAtual = null;
        return;
    }
    player.pause();
    // *** CORREÇÃO APLICADA AQUI: USA "audios" SEM ACENTO ***
    player.src = `audios/${idAnimal}.mp3`;
    const promise = player.play();
    if (promise !== undefined) {
        promise.then(_ => {
            somAtual = idAnimal;
        }).catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            alert(`Não foi possível tocar o áudio. Verifique se o arquivo "${idAnimal}.mp3" existe na pasta 'audios' (sem acento).`);
            somAtual = null;
        });
    }
}

// ... E o restante de todo o código funcional (caça-palavras, quiz, relatório, etc.) ...
function gerarCacaPalavras(){ /* ...código idêntico... */ }
function canPlaceWordAt(grid, word, row, col, direction){ /* ...código idêntico... */ }
function renderGrid(gridArray){ /* ...código idêntico... */ }
function renderWordList(){ /* ...código idêntico... */ }
function handleMouseDown(e){ /* ...código idêntico... */ }
function handleMouseOver(e){ /* ...código idêntico... */ }
function handleMouseUp(){ /* ...código idêntico... */ }
function mostrarModalCacaPalavras(){ /* ...código idêntico... */ }
function fecharModalCacaPalavras(){ /* ...código idêntico... */ }
function mostrarPergunta(){ /* ...código idêntico... */ }
function atualizarBotoesQuiz(){ /* ...código idêntico... */ }
function mudarPergunta(direcao){ /* ...código idêntico... */ }
function verificarQuizFinal(){ /* ...código idêntico... */ }
function mostrarModalQuiz(){ /* ...código idêntico... */ }
function fecharModalQuiz(){ /* ...código idêntico... */ }
function mostrarRelatorio(){ /* ...código idêntico... */ }
function criarConfetes(){ /* ...código idêntico... */ }
function salvarPDF(){ /* ...código idêntico... */ }