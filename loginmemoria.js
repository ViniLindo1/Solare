const n = document.getElementById('nome');
const b = document.getElementById('b1');
const f = document.getElementById('form');

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

const validar = (event) => {

    if (n.value.length >= 3 && n.value != Number(n.value)){ 
        b.removeAttribute('disabled');
    } else { 
        console.log('O nome deve conter mais de 3 caracteres e não pode ser um número.');
     } 
}

const handleSubmit = (event) => {
    event.preventDefault();

    // Recupera a lista já salva
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    // Adiciona o novo usuário
    pessoas.push(n.value);

    // Salva a lista atualizada
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    // Salva o usuário atual
    localStorage.setItem("usuarioLogado", n.value);

    window.location.href = "jogomemoria.html";
};


n.addEventListener('input', validar);
f.addEventListener('submit', handleSubmit);




const lista = document.getElementById("listaUsuarios");


pessoas.forEach(nome => {
    const li = document.createElement("li");
    li.textContent = nome;
    lista.appendChild(li);
});


