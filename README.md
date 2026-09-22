# Olá, avaliador!

Meu nome é Thiago Quadros, e este é um guia para executar este projeto.

## Antes de tudo...

É importante ressaltar que neste projeto eu utilizei tecnologias que podem não parecer peformáticas inicialmente como o FlashList para renderização de listas e o Reanimated para as animações. O FlashList é uma lib da Shopify que permite renderizar listas com milhares de itens. É um componente essencial para garantir a performance no uso dos apps. Já o Reanimated é uma lib que permite criar diversas animações que tornam a experiência de usuário mais fluida e confortável.

Durante o desenvolvimento, o React Native não atribui memória o suficiente para que essas libs funcionem em sua melhor capacidade, então peço que, durante testes de performance, avaliem criando builds de produção ou preview, onde a variavel `__DEV__` é `false` e o aplicativo funciona com a performance esperada.

# Como baixar o projeto

Comece clonando o repositório e entrando na pasta:

`git clone https://github.com/ThiagoQSS/todo-app-horizon.git`

`cd todo-app-horizon`

Baixe o npm versão 11.6.0, outras versões como a 11.6.2 causam erros de incompatibilidade devido a atualizações do React e do SDK do Expo.

`npm install -g npm@11.6.0`

Feito isso, instale as dependências com o comando a seguir:

`npm install --legacy-peer-deps`

E execute o comando a seguir para gerar o código android nativo que o app utiliza:

`npx expo prebuild`

Por fim, antes de executar o comando que cria o app, certifique-se de estar com um dispositivo Android conectado via USB ou de estar com um emulador Android aberto. Se possível, utilize o dispositivo físico, onde a performance e a UI ficam mais fiéis ao resultado real do app.

# Como executar o projeto em modo DEV

`npx expo run:android`
