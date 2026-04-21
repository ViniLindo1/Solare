const tamanho = 14;

const palavras = [
    "EOLICA",
    "SOLAR",
    "GEOTERMICA",
    "OCEANICA",
    "HIDROELETRICA",
    "BIOMASSA"
];

let timerIniciado = false;
let tempoInicial;
let tempoFinal;

let encontradas = [];

// ===============================
// MATRIZ VAZIA
// ===============================
let letras = Array.from({ length: tamanho }, () =>
    Array(tamanho).fill("")
);

// ===============================
// DIREÇÕES
// ===============================
const direcoes = [
    [0,1],   // direita
    [1,0],   // baixo
    
];

// ===============================
// EMBARALHA PALAVRAS
// ===============================
palavras.sort(() => Math.random() - 0.5);

// ===============================
// INSERIR PALAVRAS ALEATÓRIAS
// ===============================
for(let palavra of palavras){

    let colocada = false;

    while(!colocada){

        let dir = direcoes[Math.floor(Math.random() * direcoes.length)];
        let linha = Math.floor(Math.random() * tamanho);
        let coluna = Math.floor(Math.random() * tamanho);

        let pode = true;

        for(let i=0;i<palavra.length;i++){

            let nl = linha + dir[0] * i;
            let nc = coluna + dir[1] * i;

            if(
                nl < 0 || nl >= tamanho ||
                nc < 0 || nc >= tamanho
            ){
                pode = false;
                break;
            }

            if(
                letras[nl][nc] != "" &&
                letras[nl][nc] != palavra[i]
            ){
                pode = false;
                break;
            }
        }

        if(pode){

            for(let i=0;i<palavra.length;i++){

                let nl = linha + dir[0] * i;
                let nc = coluna + dir[1] * i;

                letras[nl][nc] = palavra[i];
            }

            colocada = true;
        }
    }
}

// ===============================
// COMPLETA COM LETRAS ALEATÓRIAS
// ===============================
for(let i=0;i<tamanho;i++){
    for(let j=0;j<tamanho;j++){

        if(letras[i][j] == ""){
            letras[i][j] = String.fromCharCode(
                65 + Math.floor(Math.random() * 26)
            );
        }

    }
}

// ===============================
// MONTA TABULEIRO
// ===============================
const grid = document.getElementById("grid");

for(let i=0;i<tamanho;i++){

    for(let j=0;j<tamanho;j++){

        let div = document.createElement("div");
        div.className = "celula";
        div.innerText = letras[i][j];

        div.onclick = function(){

            // inicia timer
            if (!timerIniciado) {
                tempoInicial = Date.now();
                timerIniciado = true;
            }

            if(
                div.classList.contains("contagem")
            ){
                return;
            }

            div.classList.toggle("selecionada");

            verificarPalavras();
        };

        grid.appendChild(div);
    }
}

// ===============================
// VERIFICAR PALAVRAS
// ===============================
function verificarPalavras(){

    let selecionadas =
    document.querySelectorAll(".selecionada");

    let palavraAtual = "";

    selecionadas.forEach(item=>{
        palavraAtual += item.innerText;
    });

    palavraAtual = palavraAtual.toUpperCase();

    palavras.forEach(palavra=>{

        if(
            palavraAtual.includes(palavra) &&
            !encontradas.includes(palavra)
        ){

            encontradas.push(palavra);

            selecionadas.forEach(item=>{
                item.classList.remove("selecionada");
                item.classList.add("contagem");
            });

            
        }

    });

    verificarVitoria();
}

// ===============================
// VERIFICAR VITÓRIA
// ===============================
function verificarVitoria(){

    if(
        encontradas.length ==
        palavras.length
    ){

        tempoFinal = Date.now();

        const tempoTotal =
        ((tempoFinal - tempoInicial) / 1000)
        .toFixed(2);

        Swal.fire({
            title: "Desafio bem concluído!!!",
            imageUrl: "solTitulo.png",
            imageWidth: 253,
            imageHeight: 244,
            html:
            `Seu tempo foi de ${tempoTotal} segundos`,
            showCloseButton: true,
            confirmButtonColor: '#FFCB0E'
        });
    }
}

