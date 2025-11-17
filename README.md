### Desafio Técnico - React Loomi

- [Acesse o Relatório aqui.](https://docs.google.com/document/d/1ovpAAxfCU9x6N_Q-qRRYwzDoZl_LM21t0kYuvWYh5xE/edit?usp=sharing)
- [Publicado Aqui.](https://desafio-loomi-alpha.vercel.app)
- [Repositório Github.](https://github.com/EmanuelBitenc/Desafio-Loomi)
- [Kanban gerenciamento de demandas.](https://trello.com/b/FAHreYQw/desafio-loomi)

# Nortus - Plataforma de Inteligência para Vendas e Atendimento

Sistema desenvolvido para operadores da Nortus durante a jornada de atendimento e recomendação de produtos aos clientes, utilizando inteligência artificial para análise de dados comportamentais e sugestão inteligente de produtos e planos.

![Nortus](https://github.com/EmanuelBitenc/ImagesProject/blob/main/desafio/desafio1.png?raw=true)

## Sobre o Projeto

A Nortus é uma solução de IA para times de vendas e atendimento que utiliza dados comportamentais, análise de perfil e sugestão inteligente de produtos e planos. Este projeto implementa a interface do sistema baseado no [protótipo Figma](https://www.figma.com/design/5Hfmg9GykIqfQNcp2Rip4I/Nortus?node-id=971-2094).

![Nortus](https://github.com/EmanuelBitenc/ImagesProject/blob/main/desafio/desafio2.png?raw=true)

![Nortus](https://github.com/EmanuelBitenc/ImagesProject/blob/main/desafio/Desafio3.png?raw=true)

## Tecnologias Utilizadas

- **Next.js** (v16.0.3)
- **TypeScript**
- **TailwindCSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Hook Form** + **Zod** - Validação de formulários
- **Axios** - Consumo de API
- **ApexCharts** - Gráficos e visualizações
- **NextAuth.js** - Autenticação
- **js-cookie** - Gerenciamento de cookies
- **Sonner** - Notificações toast
- **ESLint** + **Prettier** - Linting e formatação
- **Vitest** - Testes unitários

## Funcionalidades Implementadas

### Escopo Obrigatório

#### 1. Login

- Interface de autenticação com email e senha
- Validação de email
- Opção de visualizar/ocultar senha
- Opção "Lembrar usuário"
- Armazenamento de token em cookies
- Armazenamento de dados do usuário em localStorage

#### 2. Dashboard de KPIs

- Visualização de métricas principais (ARPU, Retenção, Churn, Conversão)
- Gráficos interativos com ApexCharts
- Mapa de clientes por região
- Mapa de impacto segmentado por tipo
- Tabela de clientes com filtros e paginação
- Indicadores de crescimento percentual

#### 3. Gestão de Tickets

- Listagem de tickets com status e prioridades
- Filtros por status, prioridade e responsável
- Resumo visual de tickets (abertos, em andamento, resolvidos)
- Criação de novos tickets com validação de campos
- Atualização automática da tabela após criação
- Estados de loading (skeleton)

## Estrutura do Projeto

```
src/
├── app/                          # Rotas e páginas (App Router)
│   ├── api/auth/                 # API de autenticação NextAuth
│   ├── loginPage/                # Página de login
│   ├── dashboard/                # Dashboard principal
│   ├── gestaoTickets/            # Gestão de tickets
│   ├── simulacaoPlanos/          # Simulador de planos
│   ├── visao/                    # Visão 360°
│   └── assistenteVirtual/        # Chat IA
├── auth/                         # Configuração NextAuth
├── components/                   # Componentes reutilizáveis
├── hooks/                        # Custom hooks
├── services/                     # Serviços de API
├── stores/                       # Estados globais (Zustand)
├── types/                        # Definições TypeScript
└── utils/                        # Utilitários
```

## Git e versionamento de código

Foi utilizada como branch principal do projeto a `main`, responsável também por estar ligada com a esteira de deploy na Vercel. A partir dela foi gerada a branch `develop`, única responsável por subir alterações para a branch principal. A partir da branch `develop`, tinha origem as branches respectivas para tarefas e alterações, como implementação de telas, configurações de responsividade, testes, etc.

Para `Pull Request` era necessária a minha avaliação sobre o `PR` além também da validação do `bot da Vercel`. Com o deploy na Vercel foi possível acompanhar log de erro e quebra do código em produção.

## Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/EmanuelBitenc/Desafio-Loomi.git

# Entre na pasta do projeto
cd desafio-loomi

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

### Executar Testes

```bash
npm test
```

### Formatação

```bash
# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

## 🔐 Autenticação

O sistema utiliza autenticação fictícia com NextAuth.js:

- **Email de teste**: qualquer email válido
- **Senha de teste**: qualquer senha
- **Token**: Armazenado em cookies
- **Dados do usuário**: Armazenados em localStorage

## 🌐 API

A aplicação consome dados de uma API mockada hospedada na AWS S3:

**Base URL**: `https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2`

### Endpoints principais:

- `/login.json` - Autenticação
- `/dash.json` - Dados do dashboard
- `/map.json` - Dados do mapa
- `/ticket-management.json` - Gestão de tickets

## Responsividade

O projeto é responsivo para telas a partir de **1000px de largura**, conforme especificação do desafio.

## Design

Interface baseada no protótipo Figma da Nortus, com implementação fiel aos componentes e estilos propostos. Uso de Tailwind, configurado com variáveis de cores e aplicação de ajustes para melhor escrita de código.

## Uso de IA

Durante o desenvolvimento, foram utilizadas ferramentas de IA como apoio:

### Ferramentas utilizadas:

- **GitHub Copilot, Claude Sonnet, ChatGPT**:

  > Autocompletar código e sugestões de implementação.
  > Esclarecimento de conceitos e revisão de código. Geração de documentação e solução de dúvidas pontuais

- **Navegador Comet:**
  > Ajustes de responsividade e correções ortográficas.

### Exemplos de uso:

- Estruturação inicial de componentes, layout responsivo.
- Validação de schemas Zod.
- Geração de casos de teste.
- Geração de tipos TypeScript a partir de respostas de API.
- Implementação dos arquivos services.
- Apoio na escrita do relatório e no README.

### Decisões baseadas em IA:

- Uso do Vitest nos testes, mais rápido e nativo para Vite.
- Uso do hookform/resolvers para integrar RHF com Zod.
- Estrutura de pastas por feature dentro de `app/`
- Separação de lógica em custom hooks

**Nota**: Todo código gerado por IA foi revisado, validado e adaptado para o contexto do projeto. A IA foi utilizada como ferramenta de apoio, não como substituta do desenvolvimento _(inclusive gerou código errado que me fez quebrar um pouco a cabeça)_.

## Estrutura de Estado

### Zustand Stores:

- `useTabelaClientesStore` - Filtros da tabela de clientes
- `useTabelaTicketsStore` - Filtros da tabela de tickets
- `useTicketsStore` - Gerenciamento de tickets

## Testes

Implementados testes unitários para:

- Validação de schemas (Zod)
- Stores (Zustand)
- Utilitários (cookie-storage, local-storage)

Arquivos:

- `schemaLogin.test.ts` - Validação do formulário de login
- `schemaNewTicket.test.ts` - Validação do formulário de novo ticket
- `ticketsStore.test.ts` - Gerenciamento de estado dos tickets
- `tabelaClientesStore.test.ts` - Filtros da tabela de clientes
- `tabelaTicketsStore.test.ts` - Filtros da tabela de tickets
- `cookie-storage.test.ts` - Gerenciamento de cookies (token, username)
- `local-storage.test.ts` - Armazenamento de dados do usuário

## Autor

**Emanuel Bitencourt**

[Linkedin - Emanuel Bitencourt](https://www.linkedin.com/in/emanuelbitencourt/)

## Licença

Este projeto foi desenvolvido como parte do processo seletivo da Loomi.
