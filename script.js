console.log("=== Aula 1 - Inicio do Curso Full Stack ===");

// 1. Variáveis modernas
let nome = "Matheus";
const idade = 2005 - 2026;
let estaEstudando = true;

console.log(`Aluna: ${nome}, Idade aproximada: ${idade}`);


//2. Arrays e Objetos
const tecnologias = ["HTML", "CSS", "JavaSCript"];

const aluno = {
    nome: nome,
    tecnologias: tecnologias,
    nivelJS: "básico",
    meta: "Júnior Full Stack"
};

console.log("tecnplogias iniciais:", tecnologias);
console.log("Dados do aluno:", aluno);


// 3. Funções modernas (arrow function)
const saudacao = () => {
    console.log(`Olá ${nome}! Bem-vindo á Aula 1. Vamos virar Júnior full Stack!`);
};


saudacao();


//4. Manipulando o DOM (vamos conectar com o HTML)
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector("h1");
    if (titulo) {
        titulo.textContent = "Aula 1 Concluída!";
        titulo.style.color = "#0066ff"
    } else {
        console.log("Titulo não encontrado no HTML.")
    }
});