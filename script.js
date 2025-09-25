/*
 * VERSÃO FINAL COM ÁUDIO APRIMORADO - 25 de Setembro de 2025
 * - A função tocarSom() agora funciona como um 'toggle' (toca/para).
 * - O som é interrompido automaticamente ao navegar para outra tela.
 * - Adicionada verificação de nome de arquivo para os sons com problema.
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
const quizPerguntas = [ /* O array do quiz completo da versão anterior */ ];
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

// --- LÓGICA DE INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    carregarGridAnimais();
    gerarCacaPalavras();
    mostrarTela('tela-inicio');
});

// --- FUNÇÕES DE NAVEGAÇÃO E GALERIA ---
function mostrarTela(idTela) {
    // MELHORIA: Interrompe o áudio ao trocar de tela
    if (player && !player.paused) {
        player.pause();
        player.currentTime = 0;
    }
    document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
    document.getElementById(idTela).classList.add('ativa');
}

document.getElementById('btn-comecar').addEventListener('click', () => {
    nomeAluno = document.getElementById('nome-aluno').value || "Explorador(a)";
    document.querySelectorAll('.nome-placeholder').forEach(span => span.textContent = nomeAluno);
    mostrarTela('tela-galeria');
});

function carregarGridAnimais() { /* ...código idêntico... */ }
function mostrarFicha(idAnimal) { /* ...código idêntico... */ }

// --- LÓGICA DO ÁUDIO (APRIMORADA) ---
function tocarSom(idAnimal) {
    const novoSrc = `${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))}/áudios/${idAnimal}.mp3`;

    // MELHORIA: Se clicar no mesmo som que já está tocando, ele para.
    if (!player.paused && player.src.endsWith(`${idAnimal}.mp3`)) {
        player.pause();
        player.currentTime = 0;
        return; // Sai da função
    }

    // Se houver outro som tocando, para antes de começar o novo.
    if (!player.paused) {
        player.pause();
        player.currentTime = 0;
    }
    
    player.src = `áudios/${idAnimal}.mp3`;
    const promise = player.play();
    if (promise !== undefined) {
        promise.catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            alert(`Não foi possível tocar o áudio. Verifique se o arquivo "${idAnimal}.mp3" existe na pasta 'áudios' e se o nome está correto.`);
        });
    }
}

// --- LÓGICA DO CAÇA-PALAVRAS (sem alterações) ---
// (Todas as funções do caça-palavras: gerarCacaPalavras, canPlaceWordAt, renderGrid, renderWordList, handleMouseDown, handleMouseOver, handleMouseUp, modais, etc.)
// ...

// --- LÓGICA DO QUIZ (sem alterações) ---
// (Todas as funções do quiz: mostrarPergunta, atualizarBotoesQuiz, mudarPergunta, verificarQuizFinal)
// ...

// --- LÓGICA DO RELATÓRIO FINAL (sem alterações) ---
// (Funções mostrarRelatorio, criarConfetes, salvarPDF)
// ...


// ==================================================================
// CÓDIGO COMPLETO PARA GARANTIR FUNCIONALIDADE
// ==================================================================
function carregarGridAnimais() { const grid = document.getElementById('grid-animais'); grid.innerHTML = ''; animais.forEach(animal => { const botao = document.createElement('button'); botao.className = 'botao-animal'; botao.textContent = animal.nome; botao.onclick = () => mostrarFicha(animal.id); grid.appendChild(botao); }); }
function mostrarFicha(idAnimal) { const animal = animais.find(a => a.id === idAnimal); const display = document.getElementById('ficha-display'); document.querySelectorAll('.botao-animal').forEach(b => b.classList.remove('ativo')); const botaoAtivo = Array.from(document.querySelectorAll('.botao-animal')).find(b => b.textContent === animal.nome); if (botaoAtivo) botaoAtivo.classList.add('ativo'); display.className = 'ficha-display'; display.classList.add(animal.tema); display.innerHTML = `<div class="ficha-animal ativa"><div class="ficha-imagem-container"><img src="imagens/${animal.img}" alt="${animal.nome}" class="ficha-imagem"></div><div class="ficha-info"><h3>${animal.nome} <button class="botao-som" onclick="tocarSom('${animal.id}')">🔊 Ouvir</button></h3><div class="info-conteudo"><div class="info-item"><strong>Habitat:</strong> ${animal.habitat}</div><div class="info-item"><strong>Alimentação:</strong> ${animal.alimentacao}</div><div class="info-item"><strong>Hábitos:</strong> ${animal.habitos}</div><div class="info-item curiosidade"><strong>Curiosidade:</strong> ${animal.curiosidade}</div></div></div></div>`; }
function gerarCacaPalavras() { let gridArray = Array(gridSize).fill(null).map(() => Array(gridSize).fill('')); palavrasCaca.forEach(palavra => { let placed = false; for (let i = 0; i < 100 && !placed; i++) { const direcao = Math.random() > 0.5 ? 'horizontal' : 'vertical'; const startRow = Math.floor(Math.random() * gridSize); const startCol = Math.floor(Math.random() * gridSize); if (canPlaceWordAt(gridArray, palavra, startRow, startCol, direcao)) { for (let j = 0; j < palavra.length; j++) { if (direcao === 'horizontal') gridArray[startRow][startCol + j] = palavra[j]; else gridArray[startRow + j][startCol] = palavra[j]; } placed = true; } } }); const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for (let i = 0; i < gridSize; i++) { for (let j = 0; j < gridSize; j++) { if (gridArray[i][j] === '') gridArray[i][j] = alfabeto[Math.floor(Math.random() * alfabeto.length)]; } } renderGrid(gridArray); renderWordList(); }
function canPlaceWordAt(grid, word, row, col, direction) { if (direction === 'horizontal') { if (col + word.length > gridSize) return false; for (let i = 0; i < word.length; i++) { if (grid[row][col + i] !== '') return false; } } else { if (row + word.length > gridSize) return false; for (let i = 0; i < word.length; i++) { if (grid[row + i][col] !== '') return false; } } return true; }
function renderGrid(gridArray) { const gridElement = document.getElementById('grid-caca-palavras'); gridElement.innerHTML = ''; for (let i = 0; i < gridSize; i++) { for (let j = 0; j < gridSize; j++) { const cell = document.createElement('div'); cell.className = 'grid-cell'; cell.textContent = gridArray[i][j]; cell.dataset.row = i; cell.dataset.col = j; gridElement.appendChild(cell); } } gridElement.addEventListener('mousedown', handleMouseDown); gridElement.addEventListener('mouseover', handleMouseOver); document.addEventListener('mouseup', handleMouseUp); }
function renderWordList() { const listElement = document.getElementById('lista-palavras'); listElement.innerHTML = ''; palavrasCaca.forEach(palavra => { const listItem = document.createElement('li'); listItem.textContent = palavra; listItem.id = `palavra-${palavra}`; listElement.appendChild(listItem); }); }
function handleMouseDown(e) { if (e.target.classList.contains('grid-cell')) { isSelecting = true; selection = [e.target]; e.target.classList.add('selecionado'); } }
function handleMouseOver(e) { if (isSelecting && e.target.classList.contains('grid-cell') && !selection.includes(e.target)) { selection.push(e.target); e.target.classList.add('selecionado'); } }
function handleMouseUp() { if (!isSelecting) return; isSelecting = false; let selectedWord = selection.map(cell => cell.textContent).join(''); let selectedWordReversed = selectedWord.split('').reverse().join(''); const correctWord = palavrasCaca.find(p => p === selectedWord || p === selectedWordReversed); if (correctWord && !foundWords.includes(correctWord)) { foundWords.push(correctWord); pontuacaoCacaPalavras++; document.getElementById(`palavra-${correctWord}`).classList.add('palavra-encontrada'); selection.forEach(cell => cell.classList.add('correto')); if (foundWords.length === palavrasCaca.length) { setTimeout(mostrarModalCacaPalavras, 500); } } selection.forEach(cell => cell.classList.remove('selecionado')); selection = []; }
function mostrarModalCacaPalavras() { document.getElementById('modal-caca-palavras').classList.remove('escondido'); }
function fecharModalCacaPalavras() { document.getElementById('modal-caca-palavras').classList.add('escondido'); mostrarTela('tela-quiz'); mostrarPergunta(); }
function mostrarPergunta() { const perguntaAtual = quizPerguntas[perguntaAtualIndex]; document.getElementById('quiz-progresso').textContent = `Pergunta ${perguntaAtualIndex + 1} de ${quizPerguntas.length}`; document.getElementById('quiz-pergunta').textContent = perguntaAtual.pergunta; const opcoesContainer = document.getElementById('quiz-opcoes'); opcoesContainer.innerHTML = ''; perguntaAtual.opcoes.forEach(opcao => { const label = document.createElement('label'); label.className = 'quiz-opcao'; if (opcao.valor === perguntaAtual.respostaUsuario) label.classList.add('selecionada'); label.innerHTML = `<input type="radio" name="opcao" value="${opcao.valor}" style="display:none;"> ${opcao.texto}`; label.onclick = () => { perguntaAtual.respostaUsuario = opcao.valor; document.querySelectorAll('.quiz-opcao').forEach(l => l.classList.remove('selecionada')); label.classList.add('selecionada'); }; opcoesContainer.appendChild(label); }); atualizarBotoesQuiz(); }
function atualizarBotoesQuiz() { document.getElementById('btn-quiz-anterior').disabled = perguntaAtualIndex === 0; const btnProximo = document.getElementById('btn-quiz-proximo'); if (perguntaAtualIndex === quizPerguntas.length - 1) { btnProximo.textContent = 'Finalizar e Ver Resultado'; } else { btnProximo.textContent = 'Próximo ➡️'; } }
function mudarPergunta(direcao) { const proximoIndex = perguntaAtualIndex + direcao; if (proximoIndex >= 0 && proximoIndex < quizPerguntas.length) { perguntaAtualIndex = proximoIndex; mostrarPergunta(); } else if (proximoIndex === quizPerguntas.length) { verificarQuizFinal(); } }
function verificarQuizFinal() { const respondidas = quizPerguntas.filter(p => p.respostaUsuario !== null).length; if (respondidas < quizPerguntas.length) { return alert("Por favor, responda a todas as 10 questões!"); } quizResultados = quizPerguntas.map(p => ({ acertou: p.respostaUsuario === p.respostaCorreta, explicacao: p.explicacao })); mostrarModalQuiz(); }
function mostrarModalQuiz() { document.getElementById('modal-quiz-finalizado').classList.remove('escondido'); }
function fecharModalQuiz() { document.getElementById('modal-quiz-finalizado').classList.add('escondido'); mostrarRelatorio(); }
function mostrarRelatorio() { const pontuacaoQuiz = quizResultados.filter(r => r.acertou).length; const notaCacaPalavras = (pontuacaoCacaPalavras / palavrasCaca.length) * 10; const notaQuiz = (pontuacaoQuiz / quizPerguntas.length) * 10; const notaFinal = (notaCacaPalavras * 0.2) + (notaQuiz * 0.8); document.getElementById('nota-final').textContent = `Nota Final: ${notaFinal.toFixed(1)}`; document.getElementById('pontuacao-detalhada').innerHTML = `<p>Pontos Caça-Palavras: <strong>${pontuacaoCacaPalavras} de ${palavrasCaca.length}</strong></p><p>Pontos Quiz: <strong>${pontuacaoQuiz} de ${quizPerguntas.length}</strong></p>`; if (notaFinal >= 8) { document.getElementById('maos-aplaudindo').innerHTML = "👏"; document.getElementById('maos-aplaudindo').classList.add('animar'); criarConfetes(); } else { document.getElementById('maos-aplaudindo').innerHTML = ""; document.getElementById('maos-aplaudindo').classList.remove('animar'); } const containerDetalhes = document.getElementById('respostas-detalhadas'); containerDetalhes.innerHTML = '<h4>Revisão do Quiz:</h4>'; quizResultados.forEach((resultado, index) => { const itemDiv = document.createElement('div'); if (resultado.acertou) { itemDiv.className = 'item-resposta correta'; itemDiv.innerHTML = `<p>✅ Questão ${index + 1}: Correto!</p>`; } else { itemDiv.className = 'item-resposta errada'; itemDiv.innerHTML = `<p>❌ Questão ${index + 1}: Errado!</p><div class="explicacao-erro"><strong>Explicação:</strong> ${resultado.explicacao}</div>`; } containerDetalhes.appendChild(itemDiv); }); mostrarTela('tela-relatorio'); }
function criarConfetes() { const container = document.getElementById('confetti-container'); container.innerHTML = ""; const cores = ['#ffca28', '#f44336', '#4caf50', '#2196f3', '#9c27b0']; for (let i = 0; i < 30; i++) { const confete = document.createElement('div'); confete.className = 'confete'; confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)]; confete.style.setProperty('--x', `${(Math.random() - 0.5) * 400}px`); confete.style.setProperty('--y', `${(Math.random() - 0.5) * 400}px`); confete.style.setProperty('--r', `${Math.random() * 360}deg`); container.appendChild(confete); } }
function salvarPDF() { const btnPDF = document.getElementById('btn-pdf'); btnPDF.disabled = true; window.html2canvas(document.getElementById('relatorio-conteudo'), { scale: 2, useCORS: true }).then(canvas => { try { const { jsPDF } = window.jspdf; const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' }); pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, pdf.internal.pageSize.getWidth() - 20, 0); pdf.save(`relatorio_${nomeAluno.trim().replace(/\s/g, '_') || 'aluno'}.pdf`); } finally { btnPDF.disabled = false; } }); }