const grid = document.querySelector('.grid');

let tempoInicial = 0;
let tempoFinal = 0;
let timerIniciado = false;
let bloquearTabuleiro = false;

let tempoPausado = 0;
let inicioPausa = 0;

const energias = [
    'jm-biomassa',
    'jm-eolica',
    'jm-hidraulica',
    'jm-oceanica',
    'jm-placasol',
    'jm-termica',
];

const explicarEnergia = (energia) => {

    inicioPausa = Date.now();

    let titulo = "";
    let video = "";

    if (energia === 'jm-hidraulica') {
        titulo = "Energia Hidrelétrica";
        video = "vHidro.mp4";
    }

    if (energia === 'jm-eolica') {
        titulo = "Energia Eólica";
        video = "vEolica.mp4";
    }

    if (energia === 'jm-placasol') {
        titulo = "Energia Solar";
        video = "vSolar.mp4";
    }

    if (energia === 'jm-biomassa') {
        titulo = "Energia Biomassa";
        video = "vBiomassa.mp4";
    }

    if (energia === 'jm-oceanica') {
        titulo = "Energia das Marés";
        video = "vMare.mp4";
    }

    if (energia === 'jm-termica') {
        titulo = "Energia Geotérmica";
        video = "vGeotermica.mp4";
    }

    return Swal.fire({
        title: titulo,
        html: `
            <video
                width="100%"
                controls
                autoplay
                disablePictureInPicture
                controlsList="nodownload noplaybackrate"
            >
                <source src="${video}" type="video/mp4">
                Seu navegador não suporta vídeos.
            </video>
        `,
        confirmButtonColor: '#FFCB0E',
        width: 500
    }).then(() => {
        tempoPausado += Date.now() - inicioPausa;
    });
}

const createElement = (tag, className) => {
    const element= document.createElement(tag);
    element.className = className;
    return element;
}

let card1 = '';
let card2 = '';

const contagem = () => {
    const cont = document.querySelectorAll('.contagem');
   

    if (cont.length == 12){

        tempoFinal = Date.now();
        const tempoTotal = (
            (tempoFinal - tempoInicial - tempoPausado) / 1000
        ).toFixed(2);
            Swal.fire({
                title: "Desafio bem concluido!!!",
                imageUrl: "solTitulo.png",
                imageWidth: 253,
                imageHeight: 244,
                html: `Seu tempo foi de ${tempoTotal} segundos`,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonColor: '#FFCB0E',
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> <a href="index.html">Página inicial</a>`,
            });
        const usuario = localStorage.getItem("usuarioLogado");
        let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        ranking.push({
                nome: usuario,
                tempo: Number(tempoTotal)
        });

        ranking.sort((a, b) => a.tempo - b.tempo);
        ranking = ranking.slice(0, 3);
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }
    
        
}


const verificar = () => {
    
    const energia1 = card1.dataset.energia;
    const energia2 = card2.dataset.energia;

    if (energia1 === energia2) {

        card1.classList.add('contagem');
        card2.classList.add('contagem');

        setTimeout(() => {
            explicarEnergia(energia1).then(() => {
                contagem();
                bloquearTabuleiro = false; 
            });
        }, 500);

        card1 = '';
        card2 = '';

    } else {

        setTimeout(() => {

            card1.classList.remove('reveal-card');
            card2.classList.remove('reveal-card');

            card1 = '';
            card2 = '';

            bloquearTabuleiro = false; 

        }, 1000);
    }
}

const revealCard = ({ currentTarget }) => {

    const card = currentTarget;

    if (bloquearTabuleiro) return;

    if (card.classList.contains('reveal-card')) return;

    if (!timerIniciado) {
        tempoInicial = Date.now();
        timerIniciado = true;
    }

    card.classList.add('reveal-card');

    if (card1 === '') {

        card1 = card;

    } else if (card2 === '') {

        card2 = card;
        bloquearTabuleiro = true;

        verificar();
    }
}

const createCard = (energias) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('${energias}.png')`;

    card.dataset.energia = energias;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    return card;
}

const loadGame = () => {

    const renovaveis = [...energias, ...energias];

    const sorteado = renovaveis.sort( () => Math.random() - 0.5);

    sorteado.forEach((energias) => {
        const card = createCard(energias);
        grid.appendChild(card);

    })
    
}
loadGame();

const rankingLista = document.getElementById("ranking");

if (rankingLista) {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.forEach(jogador => {
        const li = document.createElement("li");
        const h5 = document.createElement("h5");
        li.textContent = ` ${jogador.nome} `;
        h5.textContent = ` ${jogador.tempo}s`;
        li.appendChild(h5);
        rankingLista.appendChild(li);
    });
}


