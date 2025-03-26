# **LoL Mastery Search**

## **Descrição**

O **LoL Mastery Search** é uma aplicação interativa que permite buscar informações detalhadas sobre os usuários do **League of Legends**. Usando a API da **Riot Games** e o **Data Dragon**, o sistema fornece dados sobre a maestria dos campeões,e uma lore rápida sobre cada campeão.

## **Funcionalidades**

- **Busca de Invocador**: Busque um invocador do League of Legends por nome e tag.
- **Informações do Invocador**: Mostra o nível e o ícone do invocador.
- **Maestria de Campeões**: Exibe a maestria dos campeões jogados pelo invocador, incluindo o total de pontos de maestria, o nível do campeão e a última vez jogada.
- **Análise de Campeões**: Visualize informações detalhadas sobre cada campeão, incluindo uma lore rápida, imagem e estatísticas.
- **Riot Games API & Data Dragon**: A integração com a API da Riot Games permite obter informações atualizadas diretamente do servidor do jogo, enquanto o Data Dragon oferece imagens e detalhes sobre os campeões.

## **Como Usar**

### **1. Busca de Usuário**

- Acesse a página inicial da aplicação.
- Digite o **nome do invocador** e a **tag** correspondente do jogador que deseja consultar.
- Clique no botão "Search" para iniciar a busca.

### **2. Visualização dos Dados**

Após a busca, os seguintes dados estarão disponíveis:

- **Nível do Invocador**: Exibe o nível atual do invocador.
- **Ícone do Invocador**: Mostra o ícone associado ao invocador.
- **Maestria de Campeões**: Todos os campeões que o invocador tem maestria serão exibidos, com detalhes como o nível de maestria e a última vez jogada.
- **Informações dos Campeões**: Ao clicar em um campeão, você verá informações como a lore rápida, o total de pontos de maestria e a última vez jogada.

## **Tecnologias Usadas**

- **React**: Framework para construção da interface.
- **Zustand**: Gerenciamento de estado do React.
- **Axios**: Para fazer requisições HTTP para a API da Riot Games e o Data Dragon.
- **Tailwind**: Estilização
- **Riot Games API**: Utilizada para obter dados atualizados dos invocadores, como maestria de campeões, últimas partidas e dados do perfil.
- **Data Dragon**: Fornece imagens e informações dos campeões.

## **Instruções para Executar o Projeto Localmente**

### **Pré-requisitos**
- API Key da riot 
- Node.js (Recomendado versão 16 ou superior)
- NPM ou Yarn

### **1. Clone o Repositório**

```bash
git clone https://github.com/rxdrigocrn/lol-mastery-hub.git
cd lol-mastery-hub
