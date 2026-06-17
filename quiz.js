const questions = [
    {
        question: "O que caracteriza uma fonte de energia renovável?",
        answers: [
            { id: 1, text: "Produzir energia sem custo", correct:false },
            { id: 2, text: "Ser obtida de recursos que se renovam naturalmente", correct:true },
            { id: 3, text: "Ser usada apenas em países desenvolvidos", correct:false },
            { id: 4, text: "Não causar nenhum impacto ambiental", correct:false },
        ]
    },
    {
        question: "A energia eólica é produzida a partir:",
        answers: [
            { id: 1, text: "Da água dos rios ", correct:false },
            { id: 2, text: "Do calor interno da terra", correct:false },
            { id: 3, text: "Do vento", correct:true },
            { id: 4, text: "Do petróleo", correct:false },
        ],
    },
    {
        question: "Embora renovável, a construção de grandes hidrelétricas pode causar:",
        answers: [
            { id: 1, text: "Aumento da infiltração do solo apenas", correct:false },
            { id: 2, text: "Alagamento de áreas e alteração de ecossistemas", correct:true },
            { id: 3, text: "Redução da umidade do ar global", correct:false },
            { id: 4, text: "Formação de combustíveis fósseis", correct:false },
        ],
    },
     {
        question: "Qual destas NÃO é renovável?",
        answers: [
            { id: 1, text: "Solar", correct:false },
            { id: 2, text: "Eólica", correct:false },
            { id: 3, text: "Petróleo", correct:true },
            { id: 4, text: "Geotérmica", correct:false },
        ],
    },
    {
        question: "O que é biomassa?",
        answers: [
            { id: 1, text: "Energia produzida por placas solares", correct:false },
            { id: 2, text: "Energia nuclear", correct:false },
            { id: 3, text: "Energia dos oceanos", correct:false },
            { id: 4, text: "Energia obtida de matéria orgânica", correct:true },
        ],
    },
    {
        question: "A energia geotérmica aproveita:",
        answers: [
            { id: 1, text: "O calor interno da terra", correct:true },
            { id: 2, text: "As ondas do mar", correct:false },
            { id: 3, text: "A luz da lua", correct:false },
            { id: 4, text: "O vento quente", correct:false },
        ],
    },
    {
        question: "Em uma usina eólica, qual equipamento gira para produzir energia?",
        answers: [
            { id: 1, text: "Painel", correct:false },
            { id: 2, text: "Turbina", correct:true },
            { id: 3, text: "Caldeira", correct:false },
            { id: 4, text: "Gerador nuclear", correct:false },
        ],
    },
    {
        question: "Paineis fotovoltaicos transformam:",
        answers: [
            { id: 1, text: "Calor em vento", correct:false },
            { id: 2, text: "Água em energia térmica", correct:false },
            { id: 3, text: "Luz solar em água", correct:true },
            { id: 4, text: "Biomassa em eletricidade", correct:false },
        ],
    },
    {
        question: "O que significa dizer que uma energia é limpa?",
        answers: [
            { id: 1, text: "Não produz residuos físicos", correct:false },
            { id: 2, text: "Tem menor emissão de poluentes comparada a fontes convencionais", correct:true },
            { id: 3, text: "Não usa tecnologia", correct:false },
            { id: 4, text: "É gratuita", correct:false },
        ],
    },
    {
        question: "Diversificar a matriz energética ajuda porque:",
        answers: [
            { id: 1, text: "Diminui dependência de uma única fonte", correct:true },
            { id: 2, text: "Elimina consumo", correct:false },
            { id: 3, text: "Impede inovação tecnológica", correct:false },
            { id: 4, text: "Acaba com apagões", correct:false },
        ],
    },
     {
        question: "Qual fonte renovável apresenta geração mais previsível em longo prazo por depender menos do clima?",
        answers: [
            { id: 1, text: "Solar", correct:false },
            { id: 2, text: "Eólica", correct:false },
            { id: 3, text: "Geotérmica", correct:true },
            { id: 4, text: "É gratuita", correct:false },
        ],
    },
    
    {
        question: "A energia maremotriz está relacionada:",
        answers: [
            { id: 1, text: "Ao calor do solo", correct:false },
            { id: 2, text: "À chuva", correct:false },
            { id: 3, text: "Ao movimento das marés", correct:true },
            { id: 4, text: "À combustão", correct:false },
        ],
    },
    {
        question: "O etanol brasileiro é produzido a opartir de:",
        answers: [
            { id: 1, text: "Cana-de-açúcar", correct:true },
            { id: 2, text: "Areia", correct:false },
            { id: 3, text: "Ouro", correct:false },
            { id: 4, text: "Neve", correct:false },
        ],
    },
    {
        question: "O armazenamento de energia torna-se especialmente importante porque:",
        answers: [
            { id: 1, text: "Fontes renováveis podem variar ao longo do tempo", correct:true },
            { id: 2, text: "Produz mais energia do que foi gerada", correct:false },
            { id: 3, text: "Substitui usinas permanentemente", correct:false },
            { id: 4, text: "Elimina perdas elétricas", correct:false },
        ],
    },
    {
        question: "Qual alternativa apresenta apenas fontes renováveis?",
        answers: [
            { id: 1, text: "Petróleo, carvão e gás natural", correct:false },
            { id: 2, text: "Solar, eólica e biomassa", correct:true },
            { id: 3, text: "Carvão, solar e nuclear", correct:false },
            { id: 4, text: "Petróleo, solar e gás", correct:false },
        ],
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    button.dataset.id = answer.id;

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  answers = questions[currentQuestionIndex].answers;
  const correctAnswer = answers.filter((answer) => answer.correct == true)[0];
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar novamente";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();