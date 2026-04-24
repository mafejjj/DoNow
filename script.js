  const STATUSES = ['pending', 'progress', 'done'];
  let tasks = JSON.parse(localStorage.getItem('donow-tasks') || '[]');
  let editingId = null;

  function save() {
    localStorage.setItem('donow-tasks', JSON.stringify(tasks));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function addTask() {
    const titleEl = document.getElementById('new-title');
    const descEl = document.getElementById('new-desc');
    const title = titleEl.value.trim();
    if (!title) { titleEl.focus(); return; }
    tasks.push({ id: uid(), title, desc: descEl.value.trim(), status: 'pending' });
    titleEl.value = '';
    descEl.value = '';
    save();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }

  function moveTask(id, direction) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const idx = STATUSES.indexOf(task.status);
    const next = idx + direction;
    if (next < 0 || next > 2) return;
    task.status = STATUSES[next];
    save();
    render();
    const labels = { pending: 'Pendente', progress: 'Em Andamento', done: 'Concluída' };
  }

  function openEdit(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    editingId = id;
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-desc').value = task.desc;
    document.getElementById('modal-overlay').classList.remove('hidden');
    setTimeout(() => document.getElementById('edit-title').focus(), 50);
  }

  function closeModal() {
    editingId = null;
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  function saveEdit() {
    const title = document.getElementById('edit-title').value.trim();
    if (!title) { document.getElementById('edit-title').focus(); return; }
    const task = tasks.find(t => t.id === editingId);
    if (task) {
      task.title = title;
      task.desc = document.getElementById('edit-desc').value.trim();
      save();
      render();
    }
    closeModal();
  }

  // Close modal on overlay click
  document.getElementById('modal-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Enter to add
  document.getElementById('new-title').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  // Enter to save edit
  document.getElementById('edit-title').addEventListener('keydown', e => {
    if (e.key === 'Enter') saveEdit();
  });

  function render() {
    const cols = {
      pending: document.getElementById('body-pending'),
      progress: document.getElementById('body-progress'),
      done: document.getElementById('body-done'),
    };

    // Clear
    Object.values(cols).forEach(c => c.innerHTML = '');

    const grouped = { pending: [], progress: [], done: [] };
    tasks.forEach(t => grouped[t.status]?.push(t));

    const emptyIcons = {
      pending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
      progress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      done: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>`,
    };

    Object.entries(grouped).forEach(([status, items]) => {
      const col = cols[status];

      if (items.length === 0) {
        col.innerHTML = `<div class="empty-state">${emptyIcons[status]}<span>sem tarefas</span></div>`;
        return;
      }

      items.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.dataset.id = task.id;

        const prevBtn = status !== 'pending'
          ? `<button class="btn-icon btn-prev" onclick="moveTask('${task.id}', -1)" title="Voltar">← voltar</button>` : '';
        const nextBtn = status !== 'done'
          ? `<button class="btn-icon btn-next" onclick="moveTask('${task.id}', 1)" title="Avançar">avançar →</button>` : '';

        card.innerHTML = `
          <div class="task-title">${escHtml(task.title)}</div>
          ${task.desc ? `<div class="task-desc">${escHtml(task.desc)}</div>` : ''}
          <div class="task-actions">
            ${prevBtn}
            ${nextBtn}
            <button class="btn-icon btn-edit" onclick="openEdit('${task.id}')">✎ editar</button>
            <button class="btn-icon btn-del" onclick="deleteTask('${task.id}')">✕ excluir</button>
          </div>
        `;
        col.appendChild(card);
      });
    });

    // Stats
    const total = tasks.length;
    const done = grouped.done.length;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-done').textContent = done;
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  render();