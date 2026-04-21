const grid = document.querySelector('.grid');
let tempoInicial = 0;
let tempoFinal = 0;
let timerIniciado = false;
let bloquearTabuleiro = false;

const energias = [
    'jm-biomassa',
    'jm-eolica',
    'jm-hidraulica',
    'jm-oceanica',
    'jm-placasol',
    'jm-termica',
];

const explicarEnergia = (energia) => {

    if (energia === 'jm-hidraulica') {
        return Swal.fire({
            title: "Energia Hidroelétrica",
            text: "A energia hidrelétrica é feita usando a força da água dos rios. Primeiro, a água fica guardada em uma represa, como se fosse um grande lago. Quando essa água é liberada, ela desce com muita força e velocidade. Essa força faz girar uma roda gigante chamada turbina. A turbina está ligada a uma máquina que transforma esse movimento em eletricidade. Depois disso, a energia vai pelos fios até chegar nas casas, escolas e indústrias.",
            imageUrl: "planta-hidroelectrica-presa-fluvial-generacion-energia-hidroeletrica-deposito-linea-energia_274258-787 1.png",
            imageWidth: 345,
            imageHeight: 201,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-eolica') {
       return Swal.fire({
            title: "Energia Eólica",
            text: "A energia eólica é feita usando a força do vento. Existem torres bem altas com hélices grandes, parecidas com um ventilador gigante. Quando o vento sopra, ele faz essas hélices girarem. Esse giro movimenta uma máquina dentro da torre que transforma a energia do vento em eletricidade. Essa energia é então levada para as casas e outros lugares onde será usada. ",
            imageUrl: "wind-energy-facility-illustration-download-in-svg-png-gif-file-formats--world-logo-production-global-day-save-environment-pack-nature-illustrations-6763734-removebg-preview 1.png",
            imageWidth: 347,
            imageHeight: 244,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-placasol') {
        return Swal.fire({
            title: "Energia Solar",
            text: "A energia solar vem da luz e do calor do Sol. Para aproveitar essa energia, usamos placas chamadas painéis solares. Elas captam a luz do Sol e transformam em eletricidade. Essa energia pode ser usada para ligar aparelhos ou até para aquecer água. Mesmo em dias com nuvens, ainda é possível gerar energia, mas quanto mais sol, mais energia é produzida. ",
            imageUrl: "solar-removebg-preview 1.png",
            imageWidth: 253,
            imageHeight: 240,
            confirmButtonColor: '#FFCB0E',
            });
        
    }

    if (energia === 'jm-biomassa') {
        return Swal.fire({
            title: "Energia Biomassa",
            text: "A biomassa é a energia feita a partir de restos de plantas e animais, como madeira, folhas e bagaço de cana. Esses materiais podem ser queimados ou transformados para produzir calor e eletricidade. Por exemplo, ao queimar esses restos, a água é aquecida e vira vapor. Esse vapor movimenta máquinas que geram energia. É uma forma de aproveitar materiais que seriam descartados. ",
            imageUrl: "ciclo-da-biomassa.webp",
            imageWidth: 345,
            imageHeight: 214,
            confirmButtonColor: '#FFCB0E',
            });

    }

    if (energia === 'jm-oceanica') {
        return Swal.fire({
            title: "Energia das Marés",
            text: "A energia das marés vem do movimento da água do mar. O nível do mar sobe e desce por causa da força da Lua e do Sol. Esse movimento faz a água se deslocar com força. Esse movimento é usado para girar turbinas, que são máquinas que produzem eletricidade. Essas turbinas podem ficar em barragens ou no fundo do mar. ",
            imageUrl: "central-elétrica-de-marés-conceito-energia-ecológica-ilustração-vetorial-em-estilo-plano-215961422-removebg-preview.png",
            imageWidth: 253,
            imageHeight: 244,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-termica') {
        return Swal.fire({
            title: "Energia Geotérmica",
            text: "A energia geotérmica vem do calor que existe dentro da Terra. Lá no fundo, a Terra é muito quente, e esse calor pode aquecer a água que está no subsolo. Essa água quente vira vapor, que sobe e é usado para girar máquinas que produzem eletricidade. Essa energia também pode ser usada para aquecer casas.",
            imageUrl: "image-24.png",
            imageWidth:  345,
            imageHeight: 204,
            confirmButtonColor: '#FFCB0E',
            });
    }

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
        const tempoTotal = ((tempoFinal - tempoInicial) / 1000).toFixed(2);
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

