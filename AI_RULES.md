# Regras de Desenvolvimento e Stack Tecnológico

Este documento define a pilha de tecnologia (Tech Stack) e as regras de codificação que devem ser seguidas para garantir a consistência, manutenibilidade e elegância do projeto.

## 1. Stack Tecnológico

O projeto é construído com as seguintes tecnologias:

*   **Framework:** React (v19) com TypeScript.
*   **Build Tool:** Vite.
*   **Roteamento:** React Router (`react-router-dom`) para navegação de página única (SPA).
*   **Estilização:** Tailwind CSS, utilizado para todos os aspectos de design e layout. O design deve ser **responsivo** (mobile-first) por padrão.
*   **Ícones:** Lucide React (`lucide-react`).
*   **Gerenciamento de Estado Global:** React Context, implementado via `ChurchContext` para gerenciar os dados da igreja (conteúdo, contato, multimídia, etc.).
*   **Persistência de Dados:** Utilização do `localStorage` para salvar as configurações do painel administrativo.
*   **Componentes UI:** Componentes customizados (ex: `Button`) construídos com Tailwind, priorizando a simplicidade e o estilo visual da igreja.

## 2. Regras de Uso de Bibliotecas e Estrutura

| Propósito | Biblioteca/Localização | Regra de Uso |
| :--- | :--- | :--- |
| **Estilização** | Tailwind CSS | **Obrigatório** usar classes Tailwind para todo o estilo. Evitar estilos inline ou arquivos CSS externos. |
| **Roteamento** | `react-router-dom` | Usar `<Routes>`, `<Route>`, `<Link>`, `<NavLink>` e hooks como `useLocation`. As rotas devem ser mantidas em `App.tsx`. |
| **Ícones** | `lucide-react` | Usar apenas ícones desta biblioteca. |
| **Componentes** | `src/components/` | Criar um arquivo separado para cada novo componente. Manter componentes pequenos (idealmente < 100 linhas). |
| **Páginas** | `src/pages/` | Criar um arquivo separado para cada nova página. |
| **Dados Globais** | `ChurchContext` | Acessar e modificar os dados da igreja (conteúdo) exclusivamente através do hook `useChurchData`. |
| **Notificações** | `react-hot-toast` (Se instalado) | Usar para feedback de usuário (sucesso, erro, carregamento). |

**Princípios de Codificação:**

1.  **Simplicidade:** Não super-engenheirar. Implementar a solução mais simples e elegante que atenda ao requisito.
2.  **Completude:** Nunca deixar código parcial, placeholders ou `TODO`s.
3.  **Tipagem:** Usar TypeScript rigorosamente.