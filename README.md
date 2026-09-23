# Olá, avaliador!

Meu nome é Thiago Quadros, e este é um guia para executar este projeto.

## Antes de tudo...

Neste projeto utilizei o FlashList para a renderização eficiente da lista de tarefas e o Reanimated para as animações e microinterações da interface. O FlashList é uma lib da Shopify que permite renderizar listas com milhares de itens. Já o Reanimated é uma lib que permite criar diversas animações que tornam a experiência de usuário mais fluida e confortável.

Builds de desenvolvimento possuem overhead adicional e não representam a performance final da aplicação. Por isso, para avaliar a performance das listas e animações, recomendo utilizar uma build Release/Preview, na qual `__DEV__` é false.

Nas seções a seguir mostro como clonar o repositório e executar o app. Mais abaixo falo sobre decisões de arquitetura que tomei nesse projeto.

## Requisitos

- Node.js 22.17.0
- npm 11.6.0
- Dispositivo Android físico ou emulador
- Android SDK

# Como baixar o projeto

Comece clonando o repositório e entrando na pasta:

`git clone https://github.com/ThiagoQSS/todo-app-horizon.git`

`cd todo-app-horizon`

Utilize o npm 11.6.0, versão utilizada durante o desenvolvimento e recomendada para reproduzir o ambiente em que o projeto foi testado. Outras versões podem apresentar diferenças na resolução das dependências.

`npm install -g npm@11.6.0`

Feito isso, instale as dependências com o comando a seguir:

`npm install --legacy-peer-deps`

E execute o comando a seguir para gerar o código android nativo que o app utiliza:

`npx expo prebuild`

Antes de executar os comandos abaixo, certifique-se de estar com um dispositivo Android conectado via USB ou de estar com um emulador Android aberto.

# Como executar o projeto em modo RELEASE (sem overhead de desenvolvimento)

`npx expo run:android --variant release`

Caso não queira aguardar a compilação, também é possível baixar um APK previamente compilado: [Baixar APK de Preview](https://expo.dev/accounts/thiagoqss/projects/todoapp/builds/cabaa3f3-3d81-416b-94f8-012a4035d3ec)

# Como executar o projeto em modo DEV (Debug, com performance limitada)

`npx expo run:android`

Essa versão utiliza o ambiente de desenvolvimento do React Native e não é ideal para avaliar a performance final das listas e animações.

# Decisões Arquiteturais

Abaixo explico como estruturei o projeto, os motivos por trás de cada escolha e como os requisitos do teste foram atendidos.

## Organização de Pastas

Procurei manter uma separação clara entre a interface, as regras e o acesso a dados:

- `src/app`: Telas e navegação via Expo Router. A criação de tarefas abre em modal nativo (`formSheet`), e os detalhes ficam em uma rota dedicada.
- `src/components`: Componentes visuais reutilizáveis (inputs, botões, modais, cards).
- `src/hooks`: O hook `useTasks` centraliza o estado das tarefas e a orquestração entre banco local e API.
- `src/database`: Configuração do SQLite (`db.ts`) e controle de seed com AsyncStorage (`tasksRepository.ts`).
- `src/services`: Cliente Axios (`api.ts`) e chamadas aos endpoints do JSONPlaceholder (`tasksService.ts`).
- `src/utils`: Funções utilitárias puras (como a validação de título) e gerenciamento de toasts.

## Como tratei a API Simulada e Persistência Local

Como o JSONPlaceholder não persiste dados de verdade no servidor, estruturei o app com **atualização otimista** e **persistência local em SQLite**:

1. **Atualização na tela primeiro**: Ao criar, alternar status, editar ou excluir, a interface atualiza o estado imediatamente, garantindo que o app responda sem travar a navegação.
2. **Gravação no SQLite**: A alteração é salva no banco local logo em seguida.
3. **Chamada à API em segundo plano**: A requisição para o JSONPlaceholder é enviada em background. Se a rede falhar, um aviso via Toast informa que o app está offline e os dados foram salvos no dispositivo.
4. **Seed inicial**: Na primeira abertura, o app busca as tarefas da API e grava no SQLite, marcando uma flag no `AsyncStorage`. Nas aberturas seguintes, os dados vêm direto do SQLite local, permitindo uso offline.

## Performance e Renderização

- **FlashList**: Utilizado no lugar da FlatList padrão por fazer reciclagem mais eficiente dos itens da lista, evitando engasgos com muitos itens.
- **Memoização**: O `TaskCard` usa `React.memo` para re-renderizar apenas o card que teve o status alterado, em vez da lista inteira. O `renderItem` e os filtros de busca/abas também usam `useCallback` e `useMemo`.
- **Animações com Reanimated**: Aplicadas em microinterações sutis (destaque no card recém-criado e indicador deslizante no seletor de abas), rodando na UI thread.
- **Inserção em lote no SQLite**: O carregamento inicial usa `json_each` em uma única query para inserir todas as tarefas de uma vez no banco, em vez de fazer dezenas de `INSERT` separados.

## Validações e Tratamento de Estados

- **Validação de Formulário**: O campo de título ignora espaços em branco nas pontas (`trim`), exige entre 3 e 100 caracteres e avisa o usuário com contador regressivo e mensagens visuais de erro. O botão de salvar só fica habilitado quando o formulário é válido.
- **Estados da Interface**:
    - _Carregamento_: Indicador visual enquanto o banco e os dados iniciais são preparados.
    - _Erro / Offline_: Avisos via Toast sem travar a navegação do usuário.
    - _Lista vazia_: O componente `ListaVazia` adapta o texto caso a aba não tenha itens ou a busca não encontre resultados.
- **Exclusão segura**: Modal de confirmação antes de deletar qualquer tarefa.
- **Toque no card**: O clique no checkbox é isolado (`stopPropagation`) para não disparar a navegação para a tela de detalhes por engano.

## Testes Automatizados

Configurei o **Jest** para testar as regras de validação de tarefas (`src/utils/__tests__/taskValidation.test.ts`), cobrindo casos como títulos vazios, apenas com espaços, abaixo de 3 caracteres, acima de 100 caracteres e casos válidos. Os testes podem ser executados com:

`npm test`
