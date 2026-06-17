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

// Guarda as posições de cada palavra
const posicoesPalavras = {};

// ===============================
// MATRIZ VAZIA
// ===============================
let letras = Array.from(
    { length: tamanho },
    () => Array(tamanho).fill("")
);

// ===============================
// DIREÇÕES
// ===============================
const direcoes = [
    [0, 1],   // →
    [1, 0],   // ↓
    [1, 1],   // ↘
    [1, -1]   // ↙
];

// ===============================
// EMBARALHA PALAVRAS
// ===============================
palavras.sort(() => Math.random() - 0.5);

// ===============================
// INSERIR PALAVRAS
// ===============================
for (let palavra of palavras) {

    let colocada = false;

    while (!colocada) {

        let dir =
        direcoes[
            Math.floor(
                Math.random() * direcoes.length
            )
        ];

        let linha =
        Math.floor(Math.random() * tamanho);

        let coluna =
        Math.floor(Math.random() * tamanho);

        let pode = true;

        for (let i = 0; i < palavra.length; i++) {

            let nl = linha + dir[0] * i;
            let nc = coluna + dir[1] * i;

            if (
                nl < 0 ||
                nl >= tamanho ||
                nc < 0 ||
                nc >= tamanho
            ) {
                pode = false;
                break;
            }

            if (
                letras[nl][nc] !== "" &&
                letras[nl][nc] !== palavra[i]
            ) {
                pode = false;
                break;
            }
        }

        if (pode) {

            let coords = [];

            for (let i = 0; i < palavra.length; i++) {

                let nl = linha + dir[0] * i;
                let nc = coluna + dir[1] * i;

                letras[nl][nc] = palavra[i];

                coords.push(`${nl}-${nc}`);
            }

            posicoesPalavras[palavra] = coords;

            colocada = true;
        }
    }
}

// ===============================
// COMPLETA COM LETRAS ALEATÓRIAS
// ===============================
for (let i = 0; i < tamanho; i++) {

    for (let j = 0; j < tamanho; j++) {

        if (letras[i][j] === "") {

            letras[i][j] =
            String.fromCharCode(
                65 +
                Math.floor(
                    Math.random() * 26
                )
            );
        }
    }
}

// ===============================
// MONTA TABULEIRO
// ===============================
const grid =
document.getElementById("grid");

for (let i = 0; i < tamanho; i++) {

    for (let j = 0; j < tamanho; j++) {

        let div =
        document.createElement("div");

        div.className = "celula";
        div.innerText = letras[i][j];

        div.dataset.linha = i;
        div.dataset.coluna = j;

        div.onclick = function () {

            if (!timerIniciado) {

                tempoInicial = Date.now();
                timerIniciado = true;
            }

            div.classList.toggle(
                "selecionada"
            );

            verificarPalavras();
        };

        grid.appendChild(div);
    }
}

// ===============================
// VERIFICAR PALAVRAS
// ===============================
function verificarPalavras() {

    const selecionadas =
    document.querySelectorAll(
        ".selecionada"
    );

    const coordsSelecionadas = [];

    selecionadas.forEach(item => {

        coordsSelecionadas.push(
            `${item.dataset.linha}-${item.dataset.coluna}`
        );
    });

    palavras.forEach(palavra => {

        if (
            encontradas.includes(
                palavra
            )
        ) {
            return;
        }

        const coordsPalavra =
        posicoesPalavras[palavra];

        const completa =
        coordsPalavra.every(coord =>
            coordsSelecionadas.includes(
                coord
            )
        );

        if (completa) {

            encontradas.push(
                palavra
            );

            coordsPalavra.forEach(
                coord => {

                    const [
                        linha,
                        coluna
                    ] =
                    coord.split("-");

                    const celula =
                    document.querySelector(
                        `[data-linha="${linha}"][data-coluna="${coluna}"]`
                    );

                    celula.classList.add(
                        "contagem"
                    );

                    celula.classList.remove(
                        "selecionada"
                    );
                }
            );
        }
    });

    verificarVitoria();
}

// ===============================
// VERIFICAR VITÓRIA
// ===============================
function verificarVitoria() {

    if (
        encontradas.length ===
        palavras.length
    ) {

        tempoFinal = Date.now();

        const tempoTotal =
        (
            (tempoFinal -
             tempoInicial) / 1000
        ).toFixed(2);

        Swal.fire({
            title:
            "Desafio bem concluído!!!",

            imageUrl:
            "solTitulo.png",

            imageWidth: 253,
            imageHeight: 244,

            html:
            `Seu tempo foi de ${tempoTotal} segundos`,

            showCloseButton: true,

            confirmButtonColor:
            "#FFCB0E"
        });
    }
}