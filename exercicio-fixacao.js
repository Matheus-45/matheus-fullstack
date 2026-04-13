const nome = "Matheus";

const tecnologias = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js." ];


const perfil = {
    nome: nome,
    idade: 20,
    tecnologias: tecnologias,
    meta: "junior full-stack",
    motivacao: "Ser um profissional "
};

const apresentar = () => {
    console.log(`Olá, Meu nome é ${perfil.nome}, tenho ${perfil.idade} anos.`);
    console.log(`Estou estudando: ${perfil.tecnologias.join(", ")}`);
    console.log(`minha meta é me tornar ${perfil.meta}.`);
    console.log(`O que me motiva: ${perfil.motivacao}`);
};

apresentar()

export { perfil, apresentar };