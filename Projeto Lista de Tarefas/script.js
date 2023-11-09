// Aqui, estamos obtendo referências para elementos da página HTML.
const button = document.querySelector('.button-add-task'); // Referência ao botão "Adicionar Tarefa"
const input = document.querySelector('.input-task'); // Referência à caixa de entrada de texto
const listaCompleta = document.querySelector('.list-tasks'); // Referência à lista de tarefas

// Aqui, estamos criando um array vazio para armazenar nossas tarefas.
let minhaListaDeItens = [];

// Esta função é chamada quando o botão "Adicionar Tarefa" é clicado.
function adicionarNovaTarefa() {
  // Adiciona uma nova tarefa à lista de tarefas com o texto da caixa de entrada.
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false, // Inicialmente, a tarefa não está concluída.
  });

  // Limpa o campo de entrada de texto.
  input.value = '';

  // Atualiza a exibição das tarefas na página.
  mostrarTarefas();
}

// Esta função exibe as tarefas na página.
function mostrarTarefas() {
  let novaLi = '';

  // Itera sobre a lista de tarefas e cria elementos HTML para cada uma.
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi +=
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `
  });

  // Atualiza a lista de tarefas na página com os elementos criados.
  listaCompleta.innerHTML = novaLi;

  // Armazena as tarefas no armazenamento local do navegador.
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Esta função marca ou desmarca uma tarefa como concluída.
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  // Atualiza a exibição das tarefas na página.
  mostrarTarefas();
}

// Esta função exclui uma tarefa da lista.
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  // Atualiza a exibição das tarefas na página.
  mostrarTarefas();
}

// Esta função recupera as tarefas salvas no armazenamento local ao carregar a página.
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  // Exibe as tarefas na página.
  mostrarTarefas();
}

// Carrega as tarefas ao iniciar a página e configura o botão para adicionar tarefas.
recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
