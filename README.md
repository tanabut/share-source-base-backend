
## Techstack 
Typescrip [Architecture share source base]

## Workspaces

| Workspace  |            Description             |          Tech stack | Visibility | Port |
| :--------- | :--------------------------------: | ------------------: | ---------: | ---: |
| env        |    Manage environment variables    |          Typescript |        n/a |  n/a |
| logger     |       Log console and files        |          Typescript |        n/a |  n/a |
| types      |   Interface type cross workspace   |          Typescript |        n/a |  n/a |
| core       |     Application buisness logic     |          Typescript |        n/a |  n/a |
| api        | API supporting sub-dealer frontend |    Koa (Typescript) |     public | 3001 |
| cms-api    |       Admin panel (CMS) api        |    Koa (Typescript) |    private | 4001 |
## Installation

We're using [Yarn 2](https://yarnpkg.com/) as package manager. If you're already using yarn. Please make sure you have latest version of it.

Install dependencies

```shell
yarn
```

## Development

Prepare environment (TODO: Move .env files to entry packages: `api`, `cms-api`)

```shell
cp .env.cms-api.example .env.cms-api.local
cp .env.api.example .env.api.local
```

To run API, we'll need to run database.

Start postgres database:

```shell
docker-compose up
```

Prepare database (TODO: Needs update)

```shell
cd core
yarn db:create
yarn db:migration:run
yarn db:seed
```

Run development

```shell
# all entries (TODO)
yarn dev

# single entry
yarn dev <entry-package-name>
yarn dev api

# multiple entries
yarn dev <entry-package-name> <entry-package-name> ...
yarn dev api cms-api
```

## Linting

```shell
yarn lint
yarn lint:fix

# eslint only
yarn eslint
yarn eslint:fix

# stylelint only
yarn stylelint
yarn stylelint:fix
```

## Testing

Unit Testing

```shell
yarn test:unit
```

## Production

Build

```shell
# TODO: Build all entries
yarn build

# single entry
yarn build <entry-package-name>
yarn build api

# multiple entries
yarn build <entry-package-name> <entry-package-name> ...
yarn build api cms-api
```

Start

```shell
yarn workspace <entry-workspace-name> start

# example
yarn workspace @workspace/api start
```
