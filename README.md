![example workflow](https://github.com/mxdxgx/botte-discord/actions/workflows/ci.yml/badge.svg)
[![CodeQL](https://github.com/mxdxgx/botte-discord/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/mxdxgx/botte-discord/actions/workflows/github-code-scanning/codeql)
[![Coverage Status](https://coveralls.io/repos/github/mxdxgx/botte-discord/badge.svg)](https://coveralls.io/github/mxdxgx/botte-discord)
# Botte Discord

## Stack and Versions

| Technology | Version |
|------------|---------|
| Node.js    | 22.12.0 |
| npm        | 10.9.0  |
| TypeScript | 5.7.2   |
| vitest     | 2.1.8   |

## About

Botte Discord is a project built using TypeScript. It leverages modern JavaScript features and ensures type safety throughout the codebase. The project is designed to be a Discord bot with various functionalities to enhance user experience on Discord servers.

## Get started 

### Clone the repo, install dependencies, run tests
```
git clone git@github.com:mxdxgx/botte-discord.git
cd botte-discord

npm install 
npm run test

```

### configure using an .env file 
```
#.env.example content

DISCORD_TOKEN=
GUILD_IDS=
SHOP_CHANNEL_ID=
CLIENT_ID=
DATABASE_URL=

```

### start the bot 

```
npm run start
```

Have fun! 
## Contributing 
Feel free to contribute and open issues if you find any bugs or have suggestions for improvements.
