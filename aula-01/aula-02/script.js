console.log("_Aula 3 - Task Manager Avançado Iniciado");

let tarefas = [];


// 1. Função para carregar tarefas salvas
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        console.log(" Tarefas carregadas do LocalStorage:", tarefas.length, "tarefas");
    } else {
        // Tarefas iniciais apenas na primeira vez
        tarefas = [
            { id: 1, texto: "Estudar JavaScript", completa: false },
            { id: 2, texto: "Fazer commit da Aula 2", completa: true }
        ];
        console.log("Usando tarefas iniciais");
    }
}

// 2. Função para salvar tarefas
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas)); //salva como texto
    console.log("Tarefas salvas no LocalStorage");
}

// contadores 
function atualizarContadores() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.completa).length;
    const concluidas = total - pendentes;

    const contadoresEl = document.getElementById("contadores");
    if (contadoresEl) {
        contadoresEl.innerHTML = `
            Total: <span class="font-semibold">${total}</span> | 
            Pendentes: <span class="font-semibold text-orange-600">${pendentes}</span> | 
            Concluídas: <span class="font-semibold text-green-600">${concluidas}</span>
        `;
    }
}

// Dark mode
function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    
    const btn = document.getElementById("btn-darkmode");
    if (btn) {
        btn.textContent = document.documentElement.classList.contains("dark") 
            ? "☀️ Light Mode" 
            : "🌙 Dark Mode";
    }
}

// renderização

function renderizarTarefas() {
    const app = document.getElementById("app");
      
    const html = `
        <div class="max-w-2xl mx-auto p-6 ">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">📋 Task Manager</h1>
                
                <button id="btn-darkmode" 
                        class="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm font-medium">
                    🌙 Dark Mode
                </button>
            </div>

            <!-- Contadores -->
            <div id="contadores" class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center"></div>

            <!-- Formulário -->
            <div class="flex gap-3 mb-8">
                <input 
                    type="text" 
                    id="input-tarefa" 
                    placeholder="Digite uma nova tarefa..." 
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white">
                
                <button 
                    id="btn-adicionar"
                    class="bg-blue-600 hover:bg-blue-700 text-white dark:text-white px-8 py-3 rounded-xl font-medium">
                    Adicionar
                </button>
            </div>

            <div id="lista-tarefas" class="space-y-3"></div>
        </div>
    `;
    
    app.innerHTML = html;

    document.getElementById("btn-adicionar").addEventListener("click", adicionarTarefa);
    document.getElementById("btn-darkmode").addEventListener("click", toggleDarkMode);

    renderizarLista();
    atualizarContadores();
}


// Renderiza apenas as tarefas na lista
function renderizarLista() {
    const listaContainer = document.getElementById("lista-tarefas");
    if (!listaContainer) {
        console.error ("Elemento #lista-tarefas não encontrado!");
        return;
    }

    let tarefasHTML = "";

    tarefas.forEach(tarefa => {
        tarefasHTML += `
            <div class=" border border-gray-600 flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                <input 
                    type="checkbox" 
                    ${tarefa.completa ? 'checked' : ''}
                    data-id="${tarefa.id}"
                    class="w-5 h-5 accent-blue-600">
                
                <span class="${tarefa.completa ? 'line-through text-gray-500' : ''} flex-1">
                    ${tarefa.texto}
                </span>
                
                <button 
                    data-id="${tarefa.id}"
                    class="deletar-btn text-red-500 hover:text-red-700">
                    Deletar
                </button>
            </div>
        `;
    });

    listaContainer.innerHTML = tarefasHTML || "<p class='text-gray-500 text-center py-8'>Nenhuma tarefa ainda...</p>";
    adicionarEventosNaLista();

}

// Adicionar eventos nos checkboxes e botões de deletar
function adicionarEventosNaLista() {
    //marcar como completa
    document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const id = Number(this.getAttribute("data-id"));
            const tarefa = tarefas.find(t => t.id === id);
            if (tarefa) {
                tarefa.completa = this.checked;
                salvarTarefas();
                renderizarLista();
                atualizarContadores();
            }
        });
    });

    // Deletar
    document.querySelectorAll(`.deletar-btn`).forEach(btn => {
        btn.addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
                tarefas = tarefas.filter(t => t.id !== id);
                salvarTarefas();
                renderizarLista();
                atualizarContadores();
            }
        });
    });
}

// Adicionar nova tarefa
function adicionarTarefa() {
    const input = document.getElementById("input-tarefa");
    if (!input) return;

    const texto = input.value.trim();
    if (texto === "") return;

    tarefas.push({
        id: Date.now(),
        texto: texto,
        completa: false
    });

    salvarTarefas();
    input.value = "";
    renderizarTarefas();
    atualizarContadores();
}

carregarTarefas();
renderizarTarefas();







