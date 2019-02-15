# Visao-Rappel - Eficiência no pagamento do Rappel

Trazer controle financeiro de forma segura, sem o risco de dados sensíveis para os fornecedores e varejistas que compram em grandes volumes.

## Descrição:

O projeto busca trazer controle financeiro de forma segura, recorrente, livre de riscos de possuir dados sensíveis além de ser menos burocrático, para os fornecedores e varejistas que usam a técnica de negociação chamada [Rappel](https://www.sdr.com.br/Ideias003/291.htm).

Com a Visao-Rappel o varejista ele consegue cobrar e acompanhar o desconto pelo volume de compras realizado ao longo do ano anterior.

Assim o varejista terá uma clientela fiel e constante, pois os fornecedores  terão melhor saúdae financeira com menos percalços de gastos de grande custos acumulados.

## Como Começar:

1. Instale as dependencias;
2. Configure-o em um servidor de sua preferência;
3. É só usufruir da ferramenta;

### Pré Requisitos e Ferramentas Necessárias:

* Acesso a Internet;
* [Node.js](https://nodejs.org/en/download/) v8.10.0;
* [NPM](https://www.npmjs.com/get-npm) 3.5.2;
* _(opcional)_ [Docker](https://docs.docker.com/install/) version 18.06.2-ce, build 6d37f41;

### Instalação local por npm

1. **Rode o comando para instalar as dependencias básicas do Projeto:**
```
npm install
```

2. **E em seguida rode o comando:**

```
npm install react-scripts@1.1.1
```

3. **E por último rode o comando abaixo para instalar as bibliotecas da VISA:**

```
npm install cybersource-rest-client
```

#### Instalação via Docker

Você pode também instalar pelo Docker pegando da imagem pública exposta no endereço abaixo:

[Visao-Rappel](https://cloud.docker.com/u/lorensov/repository/docker/lorensov/visao-rappel) - Imagem hospedada no [Docker Hub](https://hub.docker.com/?namespace=lorensov)

Usando o comando `docker pull lorensov/visao-rappel` você já pode ter em seu repositório de imagens local a nossa solução.

## Como Executar:

* Após tudo instalado vá na pasta Raiz do projeto execute o seguinte comando:
```
npm start
```
* Caso tenha seguido o caminho do Docker você pode baixar a imagem do repositório público e executá-la com:
```
docker run -t {{nome-da-imagem}}
```

* E aproveite a solução :D

## Logins para Teste:
* E-mail: teste
* Senha: teste

## Feito com:

* [API's da Visa pela CyberSource](https://www.cybersource.com/developers) - API de Autenticação e Pagamento
* [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de Usuário
* [Node](https://nodejs.org/en/) - Motor de construção que utiliza o framework _"Chrome's V8 JavaScript engine."_
* [Docker](https://www.docker.com/) - Docker é uma ferramenta feita para facilitar a criação, entrega e execução de aplicações usando _"containers"_. 

## Versionamento 

Foi feito no GitHub de nosso [time Visão](https://github.com/orgs/time-visao/) e você sinta-se a vontade para entrar em contato com o time para maiores detalhes!
E tudo está dentro do nosso repositório: [https://github.com/time-visao/visao-rappel](https://github.com/time-visao/visao-rappel)


## Autores - Time Visão

* **Cayo Syllos** - [cayodesyllos](https://github.com/cayodesyllos)
* **Leonardo Nunes** - [leonardogyn](https://github.com/leonardogyn)
* **Lucian Lorens** - [lorensov](https://github.com/Lorensov)
* **Michele Souza** - [michelebsouza](https://github.com/michelebsouza)

## Menções Honrosas

* Software criado no [Hackathon da Visa](http://hackathon19.com.br/regulamento.pdf) que aconteceu na Campus Party Brasil #12
* Agradecimento aos mentores: Biaca Guerra, Marlon Itaboray, Bruno Terakado, Jessica Félix, André Grochowicz e Felipe Rendeiro;
* Agradecimento especial a equipe [Visa e Cybersource](https://developer.visa.com/capabilities/cybersource) pelo apoio prestado;
* E um grande abraço para a [Campus Party](https://brasil.campus-party.org/cpbr12/) que sempre marca nossas vidas com experiências inesquecíveis!!!
