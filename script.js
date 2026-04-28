let tarefas = JSON.parse(localStorage.getItem('donow-tasks') || '[]');
let idEditando = null;

function salva() {
  localStorage.setItem('donow-tasks', JSON.stringify(tarefas));
}

function geraID() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function adicionaTarefa() {
  const titulo = document.getElementById('titulo-novo').value.trim();
  if (!titulo) return document.getElementById('titulo-novo').focus();
  
  tarefas.push({ id: geraID(), title: titulo, desc: document.getElementById('desc-nova').value.trim(), status: 'pending' });
  document.getElementById('titulo-novo').value = '';
  document.getElementById('desc-nova').value = '';
  salva();
  desenha();
}

function deletaTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salva();
  desenha();
}

function mexeTarefa(id, direcao) {
  const estados = ['pending', 'progress', 'done'];
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;
  
  const idx = estados.indexOf(tarefa.status);
  const novo = idx + direcao;
  if (novo < 0 || novo > 2) return;
  
  tarefa.status = estados[novo];
  salva();
  desenha();
}

function abreEdit(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;
  
  idEditando = id;
  document.getElementById('titulo-edit').value = tarefa.title;
  document.getElementById('desc-edit').value = tarefa.desc;
  document.getElementById('janela-fundo').classList.remove('hidden');
  setTimeout(() => document.getElementById('titulo-edit').focus(), 50);
}

function fechaJanela() {
  idEditando = null;
  document.getElementById('janela-fundo').classList.add('hidden');
}

function salvaEdit() {
  const titulo = document.getElementById('titulo-edit').value.trim();
  if (!titulo) return document.getElementById('titulo-edit').focus();
  
  const tarefa = tarefas.find(t => t.id === idEditando);
  if (tarefa) {
    tarefa.title = titulo;
    tarefa.desc = document.getElementById('desc-edit').value.trim();
    salva();
    desenha();
  }
  fechaJanela();
}

document.getElementById('janela-fundo').addEventListener('click', (e) => {
  if (e.target.id === 'janela-fundo') fechaJanela();
});

document.getElementById('titulo-novo').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') adicionaTarefa();
});

document.getElementById('titulo-edit').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') salvaEdit();
});

function desenha() {
  const colunas = {
    pending: document.getElementById('corpo-pendente'),
    progress: document.getElementById('corpo-andamento'),
    done: document.getElementById('corpo-feito'),
  };

  Object.values(colunas).forEach(c => c.innerHTML = '');

  const agrupado = { pending: [], progress: [], done: [] };
  tarefas.forEach(t => agrupado[t.status].push(t));

  const emptyMsg = `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg><span>sem tarefas</span></div>`;

  Object.entries(agrupado).forEach(([estado, lista]) => {
    if (lista.length === 0) {
      colunas[estado].innerHTML = emptyMsg;
      return;
    }

    lista.forEach(tarefa => {
      const template = document.getElementById('template-card');
      const card = template.content.cloneNode(true);
      
      card.querySelector('.card-tarefa').dataset.id = tarefa.id;
      card.querySelector('.titulo-tarefa').textContent = tarefa.title;
      
      if (tarefa.desc) {
        card.querySelector('.desc-tarefa').textContent = tarefa.desc;
        card.querySelector('.desc-tarefa').style.display = '';
      }
      
      const btnPrev = card.querySelector('.btn-prev');
      const btnNext = card.querySelector('.btn-next');
      const btnEdit = card.querySelector('.btn-edit');
      const btnDel = card.querySelector('.btn-del');
      
      if (estado !== 'pending') {
        btnPrev.style.display = '';
        btnPrev.onclick = () => mexeTarefa(tarefa.id, -1);
      }
      
      if (estado !== 'done') {
        btnNext.style.display = '';
        btnNext.onclick = () => mexeTarefa(tarefa.id, 1);
      }
      
      btnEdit.onclick = () => abreEdit(tarefa.id);
      btnDel.onclick = () => deletaTarefa(tarefa.id);
      
      colunas[estado].appendChild(card);
    });
  });
}

desenha();