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
      -  npm install --force
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
      -  npm install --force
    Inicie o servidor de desenvolvimento do frontend:
      - npm run dev
      
### Depêndencias do Frontend
    "@headlessui/react": "^1.7.17",
    "autoprefixer": "10.4.15",
    "axios": "^1.5.0",
    "moment": "^2.29.4",
    "next": "13.4.19",
    "next-auth": "^4.23.1",
    "nextjs-progressbar": "^0.0.16",
    "notiflix": "^3.2.6",
    "postcss": "8.4.29",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.45.4",
    "react-infinite-scroll-component": "^6.1.0",
    "styled-jsx": "^3.4.7",
    "tailwindcss": "3.3.3"
### Depêndencias do Backend
    Desenvolvimento: 
      "@mermaid-js/mermaid-cli": "^10.4.0",
      "@types/axios": "^0.14.0",
      "@types/bcrypt": "^5.0.0",
      "@types/cors": "^2.8.13",
      "@types/express": "^4.17.17",
      "@types/joi": "^17.2.3",
      "@types/jsonwebtoken": "^9.0.2",
      "@types/swagger-ui-express": "^4.1.3",
      "prisma": "^4.16.2",
      "prisma-erd-generator": "^1.11.1",
      "tsconfig-paths": "^4.2.0",
      "typescript": "^5.2.2"
     
    Produção
      "@prisma/client": "^5.2.0",
      "axios": "^1.5.0",
      "bcrypt": "^5.1.1",
      "cors": "^2.8.5",
      "dotenv": "^16.3.1",
      "express": "^4.18.2",
      "express-async-errors": "^3.1.1",
      "joi": "^17.10.1",
      "jsonwebtoken": "^9.0.2",
      "reflect-metadata": "^0.1.13",
      "swagger-ui-express": "^5.0.0",
      "ts-node-dev": "^2.0.0",
      "tsyringe": "^4.8.0"
     
### Diagrama de Entidade-Relacionamento
![diagrama](https://github.com/AndreLHPsilva/mini-blog-teste-tecnico/assets/112219645/8f177ecd-4c27-416e-8546-9972ab550d6c)

### Imagens do Projeto
![cadastro](https://github.com/AndreLHPsilva/mini-blog-teste-tecnico/assets/112219645/075f9534-619c-4b8f-bf07-c732f6bf2723)
![comment](https://github.com/AndreLHPsilva/mini-blog-teste-tecnico/assets/112219645/f51488cd-ce28-40a0-aa00-4c7dfbcf28f1)
![Login](https://github.com/AndreLHPsilva/mini-blog-teste-tecnico/assets/112219645/89741ecf-490d-49f9-be13-15469066897f)



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

