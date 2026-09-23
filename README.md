# Olá, avaliador!

Meu nome é Thiago Quadros, e este é um guia para executar este projeto.

## Antes de tudo...

É importante ressaltar que neste projeto eu utilizei tecnologias que podem não parecer peformáticas inicialmente como o FlashList para renderização de listas e o Reanimated para as animações. O FlashList é uma lib da Shopify que permite renderizar listas com milhares de itens. É um componente essencial para garantir a performance no uso dos apps. Já o Reanimated é uma lib que permite criar diversas animações que tornam a experiência de usuário mais fluida e confortável.

Builds de desenvolvimento possuem overhead adicional e não representam a performance final da aplicação. Por isso, para avaliar a performance das listas e animações, recomendo utilizar uma build Release/Preview, na qual `__DEV__` é false.

Nas seções a seguir mostro como clonar o repositório e executar o app. Mais abaixo falo sobre decisões de arquitetura que tomei nesse projeto.

## Requisitos

- Node.js 22.17.0
- npm 11.6.0
- Dispositivo Android físico ou emulador

# Como baixar o projeto

Comece clonando o repositório e entrando na pasta:

`git clone https://github.com/ThiagoQSS/todo-app-horizon.git`

`cd todo-app-horizon`

Utilize o npm 11.6.0, versão utilizada durante o desenvolvimento e recomendada para reproduzir o ambiente em que o projeto foi testado. Utilizar outra versão pode acarretar em erros na instalação das dependências.

`npm install -g npm@11.6.0`

Feito isso, instale as dependências com o comando a seguir:

`npm install --legacy-peer-deps`

E execute o comando a seguir para gerar o código android nativo que o app utiliza:

`npx expo prebuild`

Antes de executar os comandos abaixo, certifique-se de estar com um dispositivo Android conectado via USB ou de estar com um emulador Android aberto.

# Como executar o projeto em modo RELEASE (sem overhead de desenvolvimento)

`npx expo run:android --variant release`

Caso não queira aguardar a compilação, também é possível baixar um APK previamente compilado: [Baixar APK de Preview](https://expo.dev/accounts/thiagoqss/projects/todoapp/builds/c09f4501-88ec-407d-80c5-1b7b7a18fa96)

# Como executar o projeto em modo DEV (Debug, com performance limitada)

`npx expo run:android`

Essa versão utiliza o ambiente de desenvolvimento do React Native e não é ideal para avaliar a performance final das listas e animações.

# Decisões Arquiteturais
