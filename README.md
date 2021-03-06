# dangari-healthy

Download dependencies with:

    npm install
    bower install

Start server with:

    npm start


# Requisitos Funcionais
1. O sistema deve permitir o cadastro de usuários
2. O sistema deve permitir o cadastro de administradores
3. O sistema deve permitir um usuário cadastrado avaliar um posto de atendimento
4. O sistema deve permitir que o usuário cadastre uma avaliação com ou sem um comentário atribuído
5. O sistema não deve exibir a avaliação de um usuário caso este não possua um comentário atribuído
6. O sistema deve permitir ao usuário vizualizar as avaliações de outros usuários que possuem um comentário atribuído.
7. O sistema deve permitir um usuário sugerir um novo posto de atendimento
8. O sistema deve permitir um usuário denunciar alguma avaliação que ele achar abusiva
9. O sistema deve permitir que um administrador aceite ou recuse um novo posto de atendimento sugerido por um usuário
10. O sistema deve permitir um administrador cadastrar um novo posto de atendimento
11. O sistema deve permitir o usuário realizar uma busca com filtros entre os postos de atendimento
12. O sistena deve permitir o usuário realizar uma busca de postos de atendimento por região. e.g. cidade/estado.
13. O sistema deve permitir o usuário realizar uma busca dos postos de atendimento melhores avaliados.
14. O sistema deve permitir o usuário realizar uma busca dos postos de atendimento melhores avaliados por região.
15. O sistema deve mostrar a localização do posto de atendimento no GoogleMaps


# Requisitos não Funcionais
1. O sistema deverá funcionar em qualquer plataforma através de um browser.
2. O sistema deverá ser responsivo de acordo com o tamanho da tela do usuário.
3. O sistema deverá ser intuitivo, de fácil usabilidade para o usuário.


# Desenvolvimento

## Nomenclatura, arquivos, padronização

Essa é a padronização atual. Por favor, melhore conforme novas funcionalidades forem necessárias.

1. Nomes de arquivos devem ser todos em minúsculo separados por hifen
2. Nomes de services e controllers devem ser iguais ao nome do arquivo, porém utilizando PascalCase. Somente a primeira letra de acrônimos ficam em maiúsculo, e.g. StationApi ao invés de StationAPI
3. Nomes de services devem conter Svc no final
4. Nomes de controllers devem conter Ctrl no final
5. Services ficam em scripts/services
6. Controllers de páginas ficam em scripts/controllers
7. Views ficam em views. View de diretiva (partial) deve iniciar com _
8. Diretivas e seus controllers ficam em scripts/directives