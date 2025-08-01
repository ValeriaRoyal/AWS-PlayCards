# Contribuindo para AWS Quest

Obrigada por considerar contribuir para o AWS Quest! 🎉

## Como Contribuir

### 🐛 Reportando Bugs
1. Verifique se o bug já foi reportado nas [Issues](../../issues)
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicável

### ✨ Sugerindo Funcionalidades
1. Verifique se a funcionalidade já foi sugerida
2. Crie uma issue com:
   - Descrição detalhada da funcionalidade
   - Justificativa (por que seria útil)
   - Exemplos de uso

### 🔧 Contribuindo com Código

#### Setup do Ambiente
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/aws-quest.git
cd aws-quest

# Instale dependências
npm install

# Execute os testes
npm test

# Inicie o servidor de desenvolvimento
npm start
```

#### Processo de Contribuição
1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Faça** suas alterações
5. **Adicione** testes para novas funcionalidades
6. **Execute** os testes: `npm test`
7. **Commit** suas alterações: `git commit -m "feat: adiciona nova funcionalidade"`
8. **Push** para sua branch: `git push origin feature/nova-funcionalidade`
9. **Abra** um Pull Request

#### Padrões de Código
- Use **ESLint** e **Prettier** (configurações incluídas)
- Escreva **testes** para novas funcionalidades
- Mantenha **acessibilidade** (ARIA labels, focus states)
- Siga **responsividade** mobile-first
- Use **semantic commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`

### 📚 Adicionando Cards de Estudo

Para adicionar novos cards AWS:

1. Edite `src/data/awsCards.js`
2. Adicione o novo card seguindo a estrutura:

```javascript
{
  id: 7, // Próximo ID disponível
  category: "Categoria", // Compute, Storage, Database, etc.
  service: "Nome do Serviço AWS",
  question: "Pergunta clara e objetiva?",
  answer: "Resposta detalhada explicando o conceito...",
  keyPoints: [
    "Ponto importante 1",
    "Ponto importante 2",
    "Ponto importante 3"
  ]
}
```

3. Execute os testes para garantir que tudo funciona
4. Faça commit e abra um PR

### 🎨 Melhorias de Design

- Mantenha consistência com o design atual
- Teste em diferentes tamanhos de tela
- Verifique acessibilidade (contraste, navegação por teclado)
- Considere usuários com `prefers-reduced-motion`

### 📝 Documentação

- Atualize o README.md se necessário
- Documente novas funcionalidades
- Mantenha comentários no código atualizados

## 🏷️ Convenções

### Commits
Use [Conventional Commits](https://conventionalcommits.org/):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de manutenção

### Branches
- `main` - branch principal (protegida)
- `feature/nome-da-feature` - novas funcionalidades
- `fix/nome-do-bug` - correções
- `docs/nome-da-doc` - documentação

## 🤝 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite feedback construtivo
- Foque no que é melhor para a comunidade
- Mantenha discussões técnicas e profissionais

## 🆘 Precisa de Ajuda?

- Abra uma [Issue](../../issues) com a tag `question`
- Verifique a [documentação](README.md)
- Entre em contato: valeriaroyal.contato@gmail.com

---

**Obrigada por contribuir! 🚀**
