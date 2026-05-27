// script.js - Aula 4 - Task Manager com Filtros e Busca (Dark Mode corrigido)

console.log("=== Aula 4 - Task Manager com Filtros e Busca ===");

let tarefas = [];
let filtroAtual = "todas";
let termoBusca = "";

// ==================== LOCALSTORAGE ====================
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    } else {
        tarefas = [
            { id: 1, texto: "Estudar JavaScript", completa: false },
            { id: 2, texto: "Fazer commit da Aula 3", completa: true },
            { id: 3, texto: "Aprender filtros e busca", completa: false }
        ];
    }
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ==================== FILTROS E BUSCA ====================
function tarefasFiltradas() {
    let filtradas = tarefas;

    if (filtroAtual === "pendentes") filtradas = filtradas.filter(t => !t.completa);
    else if (filtroAtual === "concluidas") filtradas = filtradas.filter(t => t.completa);

    if (termoBusca) {
        const termo = termoBusca.toLowerCase();
        filtradas = filtradas.filter(t => t.texto.toLowerCase().includes(termo));
    }

    return filtradas;
}

function configurarBotoesFiltro() {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener("click", function() {
            filtroAtual = this.getAttribute("data-filtro");
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove("bg-blue-600", "text-white"));
            this.classList.add("bg-blue-600", "text-white");

            renderizarLista();
            atualizarContadores();
        });
    });
}

// ==================== CONTADORES ====================
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

// ==================== DARK MODE ====================
function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    
    const btn = document.getElementById("btn-darkmode");
    if (btn) {
        btn.textContent = document.documentElement.classList.contains("dark") 
            ? "☀️ Light Mode" 
            : "🌙 Dark Mode";
    }
}

// ==================== RENDERIZAÇÃO PRINCIPAL ====================
function renderizarTarefas() {
    const app = document.getElementById("app");
    
    const html = `
        <div class="max-w-2xl mx-auto p-6">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 dark:text-white">📋 Task Manager - Aula 4</h1>
                
                <button id="btn-darkmode" 
                        class="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl text-sm font-medium">
                    🌙 Dark Mode
                </button>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 mb-6">
                <div class="flex gap-2">
                    <button data-filtro="todas" class="filtro-btn px-5 py-2 rounded-xl font-medium bg-blue-600 text-white">Todas</button>
                    <button data-filtro="pendentes" class="filtro-btn px-5 py-2 rounded-xl font-medium">Pendentes</button>
                    <button data-filtro="concluidas" class="filtro-btn px-5 py-2 rounded-xl font-medium">Concluídas</button>
                </div>
                
                <input 
                    type="text" 
                    id="input-busca"
                    placeholder="Buscar tarefa..." 
                    class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white">
            </div>

            <div id="contadores" class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center"></div>

            <div class="flex gap-3 mb-8">
                <input 
                    type="text" 
                    id="input-tarefa" 
                    placeholder="Digite uma nova tarefa..." 
                    class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white">
                
                <button id="btn-adicionar" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium">
                    Adicionar
                </button>
            </div>

            <div id="lista-tarefas" class="space-y-3"></div>
        </div>
    `;

    app.innerHTML = html;

    // === Eventos ===
    document.getElementById("btn-adicionar").addEventListener("click", adicionarTarefa);
    document.getElementById("input-busca").addEventListener("input", (e) => {
        termoBusca = e.target.value;
        renderizarLista();
        atualizarContadores();
    });

    configurarBotoesFiltro();
    renderizarLista();
    atualizarContadores();

    // Dark Mode - reanexado toda vez que a tela principal é renderizada
    const btnDark = document.getElementById("btn-darkmode");
    if (btnDark) {
        btnDark.addEventListener("click", toggleDarkMode);
    }
}

// ==================== LISTA ====================
function renderizarLista() {
    const listaContainer = document.getElementById("lista-tarefas");
    const tarefasParaMostrar = tarefasFiltradas();

    let tarefasHTML = "";

    tarefasParaMostrar.forEach(tarefa => {
        tarefasHTML += `
            <div class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <input type="checkbox" ${tarefa.completa ? "checked" : ""} data-id="${tarefa.id}" class="w-5 h-5 accent-blue-600">
                <span class="${tarefa.completa ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'} flex-1">
                    ${tarefa.texto}
                </span>
                <button data-id="${tarefa.id}" class="deletar-btn text-red-500 hover:text-red-700 px-4 py-1">Deletar</button>
            </div>
        `;
    });

    listaContainer.innerHTML = tarefasHTML || "<p class='text-gray-500 dark:text-gray-400 text-center py-12'>Nenhuma tarefa encontrada...</p>";

    adicionarEventos();
}

// ==================== EVENTOS DA LISTA ====================
function adicionarEventos() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener("change", function() {
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

    document.querySelectorAll('.deletar-btn').forEach(btn => {
        btn.addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            if (confirm("Deletar esta tarefa?")) {
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

    tarefas.push({ id: Date.now(), texto: texto, completa: false });

    salvarTarefas();
    input.value = "";
    renderizarLista();
    atualizarContadores();
}

// ==================== INICIAR ====================
carregarTarefas();
renderizarTarefas();