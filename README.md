# mini-blog-teste-tecnico

Projeto Desenvolvido para teste técnico para vaga de Estágiário de Desenvolvimento Full Stack.

### Instruções.

Clone o repositório do projeto:
-  git clone https://github.com/AndreLHPsilva/mini-blog-teste-tecnico.git
-  cd mini-blog-teste-tecnico

Execute os seguintes comandos para configurar o backend.
-  Backend:
  -  Entre na pasta do backend.
    
    -  cd backend
    -  Crie um arquivo .env com base no arquivo .env-example e configure as variáveis de ambiente necessárias. Você pode usar qualquer editor de texto para fazer isso.
    
    Instale as dependências:
      -  npm install
    Execute as migrações do Prisma para criar o banco de dados:
      -  npx prisma migrate deploy
    Gere os tipos do Prisma:
      -  npx prisma generate
    Inicie o servidor do backend:
      -  npm run dev
    
-  Frontend:
  
  Abra uma nova janela do terminal ou vá para o diretório raiz do projeto se você saiu da pasta "backend".

    Entre na pasta do frontend:
      -  cd frontend
    Instale as dependências:
      -  npm install
    Inicie o servidor de desenvolvimento do frontend:
      - npm run dev
### Diagrama de Entidade-Relacionamento
![diagrama](https://github.com/AndreLHPsilva/mini-blog-teste-tecnico/assets/112219645/8f177ecd-4c27-416e-8546-9972ab550d6c)


### Detalhes dos Requisitos para avaliação
- A aplicação deverá ser desenvolvida em Next.js.
- A aplicação obterá as informações utilizando a [News API](https://news-api.lublot.dev/api-docs).
- O miniblog deverá ter pelo menos duas páginas:
  - Home: 
    - É a página inicial da aplicação.
    - Esta página deve listar informações sobre os artigos obtidos da API.
      - Você pode definir quais informações são relevantes exibir na tela inicial e qual será o layout da exibição.
      - Você pode definir quais artigos serão exibidos utilizando os filtros da API. Use a criatividade!
    - Quando o usuário clicar em algum artigo, deverá ser redirecionado para a página *Article* onde será possível ler o artigo completo.
  - Article:
    - A página irá exibir o conteúdo completo do artigo que foi escolhido pelo usuário. 
    - Nesta página haverá uma seção de comentários:
      - Para comentar, o visitante precisa informar o e-mail e um texto com o comentário.
      - Outros visitantes podem responder aos comentários.
      - Outros visitantes podem curtir os comentários e/ou respostas.
      - As informações sobre os comentários devem ser persistidas em um banco de dados.
- Cada página deverá ter sua própria rota no Next.js

