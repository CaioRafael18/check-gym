# 🏋️ Check Gym - API

API RESTful para sistema de check-in em academias inspirado no Gympass, desenvolvida aplicando os princípios SOLID e arquitetura limpa com foco em manutenibilidade e testabilidade.

## 📋 Sobre o Projeto

O Check Gym é uma API completa para gerenciamento de check-ins em academias, similar ao Gympass. O projeto foi desenvolvido com foco na aplicação prática dos princípios SOLID, demonstrando uma arquitetura robusta, testável e extensível para sistemas de grande escala.

### 🎯 Objetivos Técnicos do Projeto

- **Aplicar princípios SOLID** na prática com arquitetura orientada a objetos
- **Implementar Clean Architecture** com separação clara de responsabilidades
- **Desenvolver sistema de autenticação** JWT com refresh tokens
- **Criar cobertura de testes completa** com testes unitários e E2E
- **Implementar validação geográfica** para check-ins baseados em localização
- **Demonstrar padrões de design** como Repository, Factory e Dependency Injection

## 🚀 Desenvolvido durante curso SOLID - Rocketseat

Este projeto foi desenvolvido durante o curso "API Node.js com SOLID" da Rocketseat, focado na aplicação prática dos princípios SOLID em um sistema real. O projeto demonstra como estruturar aplicações Node.js escaláveis seguindo as melhores práticas de arquitetura de software.

## ✨ Principais Funcionalidades

### 👤 Usuários
- **📝 Cadastro de usuários** - Registro com validação de dados
- **🔐 Autenticação JWT** - Login seguro com access e refresh tokens  
- **👤 Perfil do usuário** - Visualização e atualização de dados pessoais

### 🏢 Academias
- **🔍 Busca de academias** - Listagem e busca por proximidade
- **📍 Busca por localização** - Encontrar academias próximas por coordenadas
- **📋 Listagem geral** - Visualizar todas as academias disponíveis
- **➕ Cadastro de academias** - Registro de novas unidades

### ✅ Check-ins
- **📍 Check-in por localização** - Validação de proximidade geográfica
- **📊 Histórico de check-ins** - Listagem completa de check-ins do usuário
- **📈 Métricas pessoais** - Quantidade total de check-ins realizados
- **✅ Validação de check-ins** - Sistema de confirmação (admin)

### 🔒 Regras de Negócio
- **Limite diário**: Apenas 1 check-in por usuário por dia
- **Proximidade**: Check-in somente dentro de 100m da academia
- **Validação temporal**: Check-ins podem ser validados até 20 minutos após criação
- **Autenticação obrigatória**: Todas as operações requerem usuário autenticado

## 🚀 Tecnologias Utilizadas

### Core & Framework
- **Node.js** - Runtime JavaScript server-side
- **TypeScript** - Tipagem estática para maior segurança
- **Fastify** - Framework web performático com arquitetura plugin-based
- **Zod** - Validação de esquemas TypeScript-first

### Banco de Dados & ORM
- **PostgreSQL** - Banco de dados relacional robusto
- **Prisma ORM** - ORM type-safe com migrations e cliente gerado
- **Prisma Studio** - Interface visual para administração do banco

### Autenticação & Segurança
- **Fastify JWT** - Implementação JWT otimizada
- **Fastify Cookie** - Gerenciamento seguro de cookies
- **bcryptjs** - Hash seguro de senhas

### Documentação & Validação
- **Fastify Swagger** - Documentação automática OpenAPI
- **Fastify Swagger UI** - Interface interativa da API
- **Fastify Type Provider Zod** - Integração Zod + Fastify

### Testes & Qualidade
- **Vitest** - Framework de testes moderno e rápido
- **Supertest** - Testes de integração HTTP
- **Configuração Multi-projeto** - Separação entre testes unitários e E2E

### Build & Desenvolvimento
- **TSX** - Execução TypeScript 
- **TSUP** - Bundler otimizado para TypeScript
- **Biome** - Linter e formatter performático

## 📁 Estrutura do Projeto (Arquitetura SOLID)

```
src/
├── erros                   # Erros customizados
├── http/                   # Camada de apresentação (HTTP)
│   ├── controllers/        # Controllers das rotas
├── middlewares             # Middlewares customizados
├── repositories/           # Camada de dados (Repository Pattern)
│   ├── prisma/             # Implementações Prisma
│   └── in-memory/          # Implementações para testes
├── schemas/                # schemas das rotas
│   ├── users/              # schema de usuários
│   ├── gyms/               # schema de academias
│   └── check-ins/          # schema de check-ins
├── use-cases/              # Camada de aplicação (Use Cases)
│   ├── users/              # Casos de uso de usuários
│   ├── gyms/               # Casos de uso de academias
│   └── check-ins/          # Casos de uso de check-ins
├── lib/                    # Utilitários e configurações
├── utils/                  # Funções auxiliares
└── env/                    # Validação de variáveis de ambiente
```

## 🧱 Aplicação dos Princípios SOLID

### **S** - Single Responsibility Principle
- **Use Cases isolados**: Cada caso de uso tem uma única responsabilidade
- **Controllers específicos**: Um controller por funcionalidade
- **Repositories focados**: Cada repository gerencia uma entidade

### **O** - Open/Closed Principle  
- **Interfaces de Repository**: Abertas para extensão, fechadas para modificação
- **Estratégias de hash**: Possibilidade de trocar algoritmos sem alterar código

### **L** - Liskov Substitution Principle
- **Implementações intercambiáveis**: Repositories Prisma/InMemory substituíveis
- **Contratos bem definidos**: Interfaces respeitadas em todas implementações

### **I** - Interface Segregation Principle
- **Interfaces específicas**: Cada repository expõe apenas métodos necessários
- **Contratos mínimos**: Clientes dependem apenas do que realmente usam

### **D** - Dependency Inversion Principle
- **Injeção de dependência**: Use cases recebem repositories via construtor
- **Abstrações**: Dependência de interfaces, não de implementações concretas

## 🔧 Instalação e Execução

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd check-gym
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Gere o cliente Prisma**
```bash
pnpm db:generate
```

5. **Execute as migrations**
```bash
pnpm db:migrate
```

6. **Execute o servidor**
```bash
pnpm run dev
```

A API estará disponível em `http://localhost:3333`
Documentação Swagger em `http://localhost:3333/docs`

## 📦 Scripts Disponíveis

### Desenvolvimento
- `pnpm run dev` - Rodar servidor em desenvolvimento
- `pnpm run build` - Build para produção
- `pnpm run start` - Executa build de produção

### Banco de Dados
- `pnpm run db:generate` - Gera cliente Prisma
- `pnpm run db:migrate` - Executa migrations de desenvolvimento
- `pnpm run db:deploy` - Deploy de migrations em produção
- `pnpm run db:studio` - Interface visual do banco

### Testes
- `pnpm run test` - Testes unitários
- `pnpm run test:e2e` - Testes end-to-end
- `pnpm run test:watch` - Testes unitários em modo watch
- `pnpm run test:e2e:watch` - Testes E2E em modo watch

## 🔗 Principais Endpoints

### 🔐 Autenticação
- `POST /users` - Cadastro de usuário
- `POST /sessions` - Login (autenticação)
- `PATCH /token/refresh` - Renovar access token
- `GET /me` - Perfil do usuário logado

### 🏢 Academias  
- `GET /gyms/search` - Buscar academias por nome
- `GET /gyms/nearby` - Buscar academias próximas
- `POST /gyms` - Cadastrar nova academia

### ✅ Check-ins
- `GET /check-ins/history` - Histórico de check-ins
- `GET /check-ins/metrics` - Métricas do usuário
- `POST /gyms/{gymId}/check-ins` - Realizar check-in
- `PATCH /check-ins/{checkInId}/validate` - Validar check-in

## 🔗 Links Relacionados

- [Documentação do Fastify](https://fastify.dev/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Documentação do Vitest](https://vitest.dev/)
- [Princípios SOLID Explicados](https://blog.rocketseat.com.br/solid-o-que-e/)

---

**💼 Projeto desenvolvido como demonstração prática dos princípios SOLID**

Demonstra proficiência em: Arquitetura Limpa, SOLID, Node.js, TypeScript, Fastify, Prisma, JWT, testes automatizados e padrões de design orientados a objetos.