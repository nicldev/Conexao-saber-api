# Conexão Saber - Plataforma de Treino de Redação para o ENEM

## 📋 Sobre o Projeto

O **Conexão Saber** é uma plataforma multiplataforma desenvolvida para auxiliar estudantes na preparação para a redação do ENEM. O sistema oferece correção automática por IA, avaliação por competências e dashboard com métricas de progresso.

### Problema Solucionado

O projeto resolve a dificuldade de estudantes do Ensino Médio em obter correção detalhada e frequente de suas redações, além de acompanhar seu progresso de forma sistemática. Através de correção automática por IA, feedback imediato e acompanhamento de evolução, o sistema democratiza o acesso a ferramentas de preparação para o ENEM, contribuindo para o ODS 11 (Cidades e Comunidades Sustentáveis) através da promoção de educação de qualidade e acessível.

## 🚀 Funcionalidades

- ✅ **Autenticação completa** - Cadastro, login, verificação de e-mail
- ✅ **Editor de redação** - Interface intuitiva para escrita
- ✅ **Correção automática por IA** - Avaliação por 5 competências do ENEM
- ✅ **Dashboard** - Métricas de progresso e histórico de redações
- ✅ **Modo escuro** - Interface moderna e responsiva
- ✅ **Gerenciamento de temas** - Temas de redação para prática

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Context API** - Gerenciamento de estado

### Backend
- **Node.js** (>=18) - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma ORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

## 📁 Estrutura do Projeto

```
conexaosaber-main/
├── backend/              # Backend Express
│   ├── src/
│   │   ├── controllers/ # Controllers
│   │   ├── routes/      # Rotas da API
│   │   ├── services/    # Lógica de negócio
│   │   ├── middlewares/ # Middlewares
│   │   └── utils/       # Utilitários
│   └── prisma/          # Schema e migrations
├── frontend/
│   └── web/             # Frontend Next.js
│       └── src/
│           ├── app/     # Páginas
│           ├── components/ # Componentes React
│           └── contexts/   # Context API
├── docs/                # Documentação técnica
├── database/            # Scripts SQL
├── validation/          # Validação com público-alvo
└── README.md
```

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18
- **PostgreSQL** >= 14
- **npm** ou **yarn**
- **Git**

## 📦 Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/nicldev/Conexao-saber-api.git
cd Conexao-saber-api
```

### 2. Configure o Banco de Dados

Crie um banco de dados PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE conexao_saber_db;"
```

Ou através do console do PostgreSQL:

```sql
CREATE DATABASE conexao_saber_db;
```

### 3. Configure o Backend

#### 3.1 Instale as Dependências

```bash
cd backend
npm install
```

#### 3.2 Configure as Variáveis de Ambiente

Crie o arquivo `.env` na pasta `backend/`:

```env
# Server
NODE_ENV=development
PORT=3333

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/conexao_saber_db?schema=public"

# JWT Secrets (gere chaves seguras com pelo menos 32 caracteres)
ACCESS_TOKEN_SECRET=sua-chave-secreta-access-token-min-32-caracteres-aqui
REFRESH_TOKEN_SECRET=sua-chave-secreta-refresh-token-min-32-caracteres-aqui

# JWT Expiration (em segundos)
ACCESS_TOKEN_EXPIRES_IN=900
REFRESH_TOKEN_EXPIRES_IN=2592000

# Email (use Mailtrap para desenvolvimento)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=seu-usuario-mailtrap
SMTP_PASS=sua-senha-mailtrap
SMTP_FROM_EMAIL=noreply@conexaosaber.com
SMTP_FROM_NAME=Conexão Saber

# URLs
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# AI Services (opcional - para correção por IA)
GEMINI_API_KEY=sua-chave-gemini-aqui
GROQ_API_KEY=sua-chave-groq-aqui
```

**⚠️ Importante:**
- Substitua `postgres:postgres` pelas suas credenciais do PostgreSQL
- Gere chaves secretas seguras para JWT (mínimo de 32 caracteres)
- Configure o Mailtrap ou outro serviço SMTP para desenvolvimento

#### 3.3 Configure o Prisma

```bash
# Gerar o cliente Prisma
npm run prisma:generate

# Executar as migrations
npm run prisma:migrate

# (Opcional) Popular o banco com dados de teste
npm run prisma:seed
```

### 4. Configure o Frontend

#### 4.1 Instale as Dependências

```bash
cd ../frontend/web
npm install
```

#### 4.2 Configure as Variáveis de Ambiente

Crie o arquivo `.env.local` na pasta `frontend/web/`:

```env
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento

Você precisará de dois terminais abertos:

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

O backend estará rodando em: **http://localhost:3333**

#### Terminal 2 - Frontend

```bash
cd frontend/web
npm run dev
```

O frontend estará rodando em: **http://localhost:3000**

### Modo Produção

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend/web
npm run build
npm start
```

## 📚 Uso do Sistema

1. **Acesse** http://localhost:3000 no navegador
2. **Cadastre-se** criando uma nova conta
3. **Verifique seu e-mail** através do link enviado (em desenvolvimento, verifique o Mailtrap)
4. **Faça login** com suas credenciais
5. **Crie uma redação** escolhendo um tema
6. **Receba correção automática** por IA avaliando as 5 competências do ENEM
7. **Acompanhe seu progresso** no dashboard

## 🧪 Testes

Para executar os testes do backend:

```bash
cd backend
npm test
```

Para executar em modo watch:

```bash
npm run test:watch
```

## 📖 Documentação

- **Documentação da API:** [docs/api/api_documentation.md](./docs/api/api_documentation.md)
- **Arquitetura:** [docs/architecture/architecture.md](./docs/architecture/architecture.md)
- **Requisitos:** [docs/requirements/requirements.md](./docs/requirements/requirements.md)
- **Validação:** [validation/validation_report.md](./validation/validation_report.md)

## 👥 Equipe

- Cleberson Assunção Tavares - Matrícula: 2325404
- Francisco Flavio Rodrigues de Menezes - Matrícula: 2314219
- Mayara Pinto da Silva - Matrícula: 2317573
- Nicolas Lima Ribeiro - Matrícula: 2326327
- Rodrigo de Queiroz Oliveira Rodrigues - Matrícula: 2326198
- Thiago Targino de Souza - Matrícula: 2326340

## 🌱 Contribuição para o ODS 11

Este projeto contribui para o **Objetivo de Desenvolvimento Sustentável 11 (Cidades e Comunidades Sustentáveis)** através da promoção de educação de qualidade e acessível, democratizando o acesso a ferramentas de preparação para o ENEM.

Para mais informações sobre o ODS 11: https://brasil.un.org/pt-br/sdgs/11

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

**Desenvolvido com ❤️ para ajudar estudantes a alcançarem a nota 1000 no ENEM.**
