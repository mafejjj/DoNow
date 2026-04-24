# DoNow — Gerenciador de Tarefas

Um aplicativo web minimalista para gerenciar suas tarefas utilizando um sistema Kanban interativo com 3 colunas: **Pendente**, **Em Andamento** e **Concluída**.

## 🎯 Funcionalidades

- ✅ **Adicionar tarefas** com título e descrição opcional
- 🔄 **Mover tarefas** entre colunas (Pendente → Em Andamento → Concluída)
- ✏️ **Editar tarefas** em tempo real com modal intuitivo
- 🗑️ **Deletar tarefas** com um clique
- 📊 **Estatísticas em tempo real** - total de tarefas e concluídas
- 🎨 **Design moderno** com tema escuro e animações fluidas

## 🚀 Como Usar

1. **Abra o arquivo** `donow.html` em seu navegador
2. **Digite o nome da tarefa** no campo de entrada
3. **Adicione uma descrição** (opcional)
4. **Clique em "+ Adicionar"**
5. **Gerencie suas tarefas** usando os botões de ação:
   - **← voltar** - move para a coluna anterior
   - **avançar →** - move para a próxima coluna
   - **✎ editar** - abre modal para editar título e descrição
   - **✕ excluir** - remove a tarefa

## 📁 Estrutura do Projeto

```
donow/
├── donow.html      # Estrutura HTML da aplicação
├── style.css       # Estilos e tema visual
├── script.js       # Lógica e interatividade
└── README.md       # Este arquivo
```

## 🎨 Design

- **Tema**: Dark mode com acentos em roxo
- **Fonte**: Syne (títulos) e Space Mono (mono)
- **Cores**:
  - Pendente: Vermelho (`#f47272`)
  - Em Andamento: Amarelo (`#f0f881`)
  - Concluída: Verde (`#8efc84`)
  - Acentos: Roxo (`#c084fc`)

## 💾 Armazenamento

As tarefas são automaticamente salvas no **localStorage** do navegador. Seus dados persistem mesmo após fechar a aba ou o navegador.

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com variáveis CSS e animações
- **JavaScript Vanilla** - Lógica de aplicação sem dependências

## 📱 Responsividade

A aplicação é responsiva e funciona bem em:
- 💻 Desktop (3 colunas lado a lado)
- 📱 Tablet (1 coluna)
- 📱 Mobile (1 coluna com formulário em coluna única)

---

**Feito com ❤️ para gerenciar suas tarefas de forma simples e eficiente.**
