console.log("_Aula 2 Iniciada_");

let tarefas = [
    { id: 1, texto: "Estudar JavaScript", completa: false},
    { id: 2, texto: "fazer commit da Aula 1", completa: true},
    { id: 3, texto: "Criar interface com Tailwind", completa: false}
];


//Função para renderizar as tarefas na tela
function renderizarTarefas() {
    const app = document.getElementById("app");

    let html = `
        <div class="space-y-6">
            <!-- Formulário para adicionar tarefa -->
            <div class="flex gap-3">
                <input 
                    type="text" 
                    id="input-tarefa" 
                    placeholder="Digite uma nova tarefa..." 
                    class="flex-1 px-4 py-3 border border-gray-300 rounded-x1 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <button 
                    id="btn-adicionar"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Adicionar
                </button>
            </div>

            <!-- Lista de tarefas -->
            <div id="lista-tarefas" class="space-y-3" >
                <!-- As tarefas serão inseridas aqui -->
            </div>
        </div>
    `;

    app.innerHTML = html;

    // Adiciona evento no botão 
    document.getElementById("btn-adicionar").addEventListener("click", adicionarTarefa);

    // Renderizar as tarefas na lista
    
    renderizarLista();
}

function renderizarLista() {
    const listaConteiner = document.getElementById("lista-tarefas");
    let tarefasHTML = "";


    tarefas.forEach(tarefa => {
        tarefasHTML += `
            <div class="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <input 
                    type="checkbox" 
                    ${tarefa.completa ? 'checked' : ''}
                    data-id="${tarefa.id}"
                    class="w-5 h-5 accent-blue-600 cursor-pointer">
                
                <span class="${tarefa.completa ? 'line-through text-gray-500' : 'text-gray-800'} flex-1">
                    ${tarefa.texto}
                </span>
                
                <button
                    data-id="${tarefa.id}"
                    class="deletar-btn text-red-500 hover:text-red-700 font-medium px-3 py-1 text-sm transition-colors">
                    Deletar
                </button>
            </div>
        `;
    });

    listaConteiner.innerHTML = tarefasHTML;


    // Adiciona eventos nos checkboxes e botões de deletar
    adicionarEventos();
}

function adicionarEventos() {
    // Marcar como completa
    document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const id = Number(this.getAttribute("data-id"));
            const tarefa = tarefas.find(t => t.id === id);
            console.log(id)
            if (tarefa) {
                tarefa.completa = this.checked;
                renderizarLista(); //atualiza visual
            }
        });
    });

    // Deletar tarefa
    document.querySelectorAll('.deletar-btn').forEach(btn => {
        btn.addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            const tarefa = tarefas.find(t => t.id === id);
            
            if (tarefa) {
                const confirmar = confirm(`Tem certeza que deseja deletar a tarefa:\n\n"${tarefa.texto}"?`)

                if (confirmar) {
                    tarefas = tarefas.filter(t => t.id !== id);
                    renderizarLista();
                    console.log(`Tarefa deletada: ${tarefa.texto}`);
                }
            }
        });
    });

}











// Função para adicionar nova tarefa
function adicionarTarefa() {
    const input = document.getElementById("input-tarefa");

    //proteção contra erro: verifica se o input existe antes de usar

    if(!input) return;


const texto = input.value.trim();

if (texto === "") {
    alert("Digite alguma tarefa antes de adicionar!");
    return;
}

const novaTarefa = {
    id: Date.now(),
    texto: texto,
    completa: false
};

tarefas.push(novaTarefa);
input.value = "";


console.log(" Nova tarefa adicionada:", novaTarefa);

// Atualiza a tela chamando novamente a função de renderização
renderizarTarefas();

}

// Inicia o app
renderizarTarefas();







