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
            text: "Energia hidroelétrica é aquela obtida pelo movimento da água. Essa energia é produzida pelo aproveitamento da energia potencial água. Também chamada de hidroeletricidade, é obtida por uma série de transformações energéticas onde, a energia potencial é convertida em cinética e, então, em eletricidade.",
            imageUrl: "planta-hidroelectrica-presa-fluvial-generacion-energia-hidroeletrica-deposito-linea-energia_274258-787 1.png",
            imageWidth: 345,
            imageHeight: 201,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-eolica') {
       return Swal.fire({
            title: "Energia Eólica",
            text: "A energia solar é proveniente da luz do sol e obtida por placas solares, que têm como função captar a energia luminosa e transformá-la em energia térmica ou elétrica. Além disso, esse tipo de energia pode ser obtida nas usinas solares compostas por inúmeros painéis que captam a energia do sol.",
            imageUrl: "wind-energy-facility-illustration-download-in-svg-png-gif-file-formats--world-logo-production-global-day-save-environment-pack-nature-illustrations-6763734-removebg-preview 1.png",
            imageWidth: 347,
            imageHeight: 244,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-placasol') {
        return Swal.fire({
            title: "Energia Solar",
            text: "A energia solar é proveniente da luz do sol e obtida por placas solares, que têm como função captar a energia luminosa e transformá-la em energia térmica ou elétrica. Além disso, esse tipo de energia pode ser obtida nas usinas solares compostas por inúmeros painéis que captam a energia do sol.",
            imageUrl: "solar-removebg-preview 1.png",
            imageWidth: 253,
            imageHeight: 240,
            confirmButtonColor: '#FFCB0E',
            });
        
    }

    if (energia === 'jm-biomassa') {
        return Swal.fire({
            title: "Energia Biomassa",
            text: "Biomassa corresponde ao conjunto de resíduos de origem animal ou vegetal utilizado na produção de energia, oriunda de fontes como vegetais lenhosos, cultivo agrícola e resíduos urbanos e industriais. Dentre os produtos derivados da biomassa estão os biocombustíveis, os óleos vegetais e o biogás.",
            imageUrl: "ciclo-da-biomassa.webp",
            imageWidth: 345,
            imageHeight: 214,
            confirmButtonColor: '#FFCB0E',
            });

    }

    if (energia === 'jm-oceanica') {
        return Swal.fire({
            title: "Energia das Marés",
            text: "A energia maremotriz, ou energia das marés, é uma forma de energia renovável e limpa gerada a partir do movimento de subida e descida das marés e das correntes marinhas. Causada pela força gravitacional da Lua e do Sol, essa oscilação é convertida em eletricidade por turbinas subaquáticas ou barragens.",
            imageUrl: "central-elétrica-de-marés-conceito-energia-ecológica-ilustração-vetorial-em-estilo-plano-215961422-removebg-preview.png",
            imageWidth: 253,
            imageHeight: 244,
            confirmButtonColor: '#FFCB0E',
            });
    }

    if (energia === 'jm-termica') {
        return Swal.fire({
            title: "Energia Geotérmica",
            text: "A Energia Geotérmica (ou Energia Geotermal) é um tipo de energia renovável obtida através do calor proveniente do interior do planeta terra. O processo de aproveitamento dessa energia é feito por meio de grandes perfurações no solo.",
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

