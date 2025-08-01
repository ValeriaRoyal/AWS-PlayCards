# AWS Quest - Cards de Estudo

Uma aplicação React para estudar conceitos da certificação AWS Cloud Practitioner através de cards interativos com funcionalidades avançadas.

## 🚀 Funcionalidades

### ✨ **Principais**
- **Cards Interativos**: Clique nos cards para ver perguntas e respostas
- **Filtro por Categoria**: Filtre cards por categorias AWS (Compute, Storage, Database, etc.)
- **Navegação**: Navegue entre os cards com botões anterior/próximo
- **Keyboard Shortcuts**: Use ← → ou espaço para navegar
- **Barra de Progresso Dupla**: Acompanhe progresso da categoria atual e total
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile

### 🎯 **Avançadas**
- **Persistência de Progresso**: Salva automaticamente no localStorage
- **Estatísticas em Tempo Real**: Contador de cards estudados por sessão
- **Animações Suaves**: Transições e efeitos visuais polidos
- **Acessibilidade**: ARIA labels, focus states, suporte a high contrast
- **PWA Ready**: Configurado para funcionar como Progressive Web App
- **Sistema de Reset**: Limpe todo o progresso com um clique

## 📚 Categorias Incluídas

- **Compute**: EC2, Lambda, etc.
- **Storage**: S3, EBS, etc.
- **Database**: RDS, DynamoDB, etc.
- **Networking**: VPC, CloudFront, etc.
- **Security**: IAM, CloudTrail, etc.
- **Monitoring**: CloudWatch, etc.

## 🛠️ Instalação e Execução

### **Pré-requisitos**
- Node.js (versão 14 ou superior)
- npm ou yarn

### **Passos**

1. **Clone ou navegue até o diretório:**
   ```bash
   cd /home/valeria/projetos/aws-quest
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Executar em modo desenvolvimento:**
   ```bash
   npm start
   ```

4. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

### **Comandos Disponíveis**

```bash
# Desenvolvimento
npm start                    # Inicia servidor de desenvolvimento

# Testes
npm test                     # Executa testes em modo watch
npm run test:coverage        # Executa testes com relatório de cobertura

# Produção
npm run build               # Cria build otimizado para produção
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Card.js              # Componente do card interativo
│   └── Card.css             # Estilos avançados do card
├── data/
│   └── awsCards.js          # Base de dados dos cards
├── App.js                   # Componente principal com lógica
├── App.css                  # Estilos principais com animações
├── App.test.js              # Testes unitários
├── index.js                 # Ponto de entrada
├── index.css                # Estilos globais
└── setupTests.js            # Configuração dos testes

public/
├── manifest.json            # Configuração PWA
└── index.html               # Template HTML
```

## 🎮 Como Usar

### **Navegação**
- **Mouse**: Clique nos botões "Anterior" e "Próximo"
- **Teclado**: Use as setas ← → ou barra de espaço
- **Cards**: Clique no card para virar e ver a resposta

### **Funcionalidades**
- **Filtros**: Use o dropdown para filtrar por categoria
- **Progresso**: Acompanhe seu progresso nas barras inferiores
- **Reset**: Use o botão "🔄 Reset" para limpar todo o progresso
- **Estatísticas**: Veja quantos cards estudou na sessão atual

## ✨ Como Adicionar Novos Cards

Edite o arquivo `src/data/awsCards.js` e adicione novos objetos no array:

```javascript
{
  id: 7,
  category: "Categoria",
  service: "Nome do Serviço",
  question: "Pergunta sobre o serviço?",
  answer: "Resposta detalhada...",
  keyPoints: [
    "Ponto importante 1",
    "Ponto importante 2"
  ]
}
```

## 🧪 Testes

O projeto inclui testes unitários abrangentes:

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm run test:coverage

# Executar uma vez (sem watch)
npm test -- --watchAll=false
```

**Cobertura atual**: 10 testes passando, cobrindo componentes principais e funcionalidades.

## 🎯 Funcionalidades Implementadas

### ✅ **Concluídas**
- [x] Cards interativos com animações
- [x] Sistema de navegação completo
- [x] Filtros por categoria
- [x] Keyboard shortcuts
- [x] Persistência de progresso (localStorage)
- [x] Estatísticas em tempo real
- [x] Design responsivo avançado
- [x] Testes unitários
- [x] PWA configuration
- [x] Acessibilidade (ARIA, focus states)
- [x] Animações e transições suaves

### 🚧 **Próximas Funcionalidades**
- [ ] Modo escuro (dark theme)
- [ ] Sistema de favoritos
- [ ] Modo quiz com pontuação
- [ ] Mais cards de diferentes categorias
- [ ] Busca por texto
- [ ] Exportar progresso (PDF/JSON)
- [ ] Sistema de spaced repetition
- [ ] Modo offline completo

## 🎨 Tecnologias Utilizadas

- **React 18.2.0** - Framework principal
- **CSS3** - Animações e responsividade avançadas
- **Jest + React Testing Library** - Testes unitários
- **LocalStorage API** - Persistência de dados
- **PWA** - Progressive Web App features

## 📖 Sobre a AWS Cloud Practitioner

Esta aplicação foi criada para ajudar no estudo da certificação AWS Cloud Practitioner (CLF-C01), cobrindo os principais serviços e conceitos fundamentais da AWS.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Adicione novos cards em `src/data/awsCards.js`
2. Implemente novas funcionalidades
3. Adicione testes para novas features
4. Mantenha o design responsivo e acessível

## 📊 Status do Projeto

- **Versão**: 1.0.0
- **Status**: ✅ Produção
- **Testes**: ✅ 10/10 passando
- **Build**: ✅ Sucesso
- **PWA**: ✅ Configurado
- **Responsivo**: ✅ Mobile-first

---

**Bons estudos! 🚀**

*Desenvolvido para ajudar na preparação da certificação AWS Cloud Practitioner*
