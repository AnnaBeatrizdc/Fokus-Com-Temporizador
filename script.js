// Alterando o fundo do HTML ao clicar no botão
const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');

// Alterando a imagem do botão ao clicar
const banner = document.querySelector('.app__image');

// Alterando a imagem do comecar ao clicar
const comecarOuPausarImg = document.querySelector('.app__card-primary-butto-icon');

// Alterando o texto do botão ao clicar
const titulo = document.querySelector('.app__title');

// Selecionando todos os botões para remover a classe active
const botoes = document.querySelectorAll('.app__card-button');

// Selecionando o botão de comecar
const starPauseBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');

// Tempo na tela
const tempoNaTela = document.querySelector('#timer');

//Adicionando musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true; // Define a música para tocar em loop

//temporizador
let tempoDecorridoEmSegundos = 1500; // 25 minutos em segundos
let intervaloId = null;

const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFim = new Audio('/sons/beep.mp3');

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // Reseta o tempo para 25 minutos
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; // Reseta o tempo para 5 minutos
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; // Reseta o tempo para 15 minutos
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

//função para automatizar a alterar da tela e do banner com a variável contexto
function alterarContexto(contexto){
    mostrarTempo(); // Atualiza o tempo na tela
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');//remove a classe active de todos os botões
    });
    html.setAttribute('data-contexto', contexto);//fundo do HTML
    banner.setAttribute('src', `/imagens/${contexto}.png`);//imagem do banner
    switch (contexto) { //texto do banner
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
    }
}

// Iniciar a contagem regressiva
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFim.play();
        alert('Tempo Finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos-= 1;
    mostrarTempo();
}

starPauseBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if (intervaloId) {
        musicaPause.play();
        zerar();
        return;
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar";
    comecarOuPausarImg.setAttribute('src', `/imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBtn.textContent = "Começar";
    comecarOuPausarImg.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

//Colocando o tempo na tela
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo(); // Exibe o tempo inicial na tela