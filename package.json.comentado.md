# package.json comentado (PT-BR)

Este arquivo explica cada campo presente no `package.json` do projeto. Como o `package.json` deve ser um JSON válido, não podemos colocar comentários nele diretamente, então este arquivo serve como documentação auxiliar.

---

## Raiz do arquivo

```json
{
  "name": "dw3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": { ... },
  ...
}
```

### `name`
- Nome do pacote/projeto. É usado pelo npm e também pode ser exibido em logs.
- Aqui está como `"dw3"`.

### `version`
- Versão do projeto (usado para publicação em registries e controle de versões).
- Aqui está definido como `"1.0.0"`.

### `description`
- Descrição curta do projeto.
- Atualmente está vazio (`""`).

### `main`
- Arquivo de entrada padrão do pacote quando ele é importado como módulo.
- Normalmente em projetos Node.js é `"index.js"`, mas pode ser alterado.

### `type`
- Define se o projeto usa módulos ES (ESM) ou CommonJS.
- `"module"` indica que o Node vai tratar arquivos `.js` como ES Modules (com `import`/`export`).

---

## Scripts (comandos de atalho)

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "node --watch server.js",
  "start": "node server.js"
}
```

### `test`
- Comando padrão para rodar testes.
- No momento, apenas mostra uma mensagem de erro e sai com código 1 (falha).

### `dev`
- Comando usado para rodar o servidor em modo de desenvolvimento.
- `node --watch server.js` reinicia automaticamente sempre que um arquivo muda.

### `start`
- Comando usado para iniciar a aplicação em produção (ou em geral).
- Executa `server.js` uma vez.

---

## Repositório

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/All4mn/DW3.git"
}
```

- Indica onde o código-fonte está hospedado (GitHub neste caso).
- `type` geralmente é `"git"`.
- `url` aponta para o repositório remoto.

---

## Bugs

```json
"bugs": {
  "url": "https://github.com/All4mn/DW3/issues"
}
```

- Informa onde os usuários podem reportar problemas (issues).

---

## Homepage

```json
"homepage": "https://github.com/All4mn/DW3#readme"
```

- URL principal do projeto (normalmente documentação ou README).

---

## Dependências

```json
"dependencies": {
  "fastify": "^5.8.2"
}
```

- Lista de bibliotecas necessárias para o projeto rodar.
- `fastify` é o framework de servidor HTTP usado aqui.
- O `^` na versão significa que o npm pode instalar qualquer versão compatível (>= 5.8.2 < 6.0.0).

---

## Outras chaves comuns (não presentes neste projeto)
- `devDependencies`: pacotes usados apenas em desenvolvimento (lint, testes, etc.).
- `engines`: define versões de Node.js suportadas.
- `private`: se `true`, impede publicação no npm.
