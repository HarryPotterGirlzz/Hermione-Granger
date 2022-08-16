# Contributing

If you'd like to contribute to this project, feel free to submit a pull request!

## Setup

First things first, fork and clone the main branch of this repository. Then, open the project folder and run `npm ci` to set up environment and install dependencies.

Then, create a file called `.env` in the project folder and paste the following in:

```
DISCORD_TOKEN=
TENOR_API_KEY=
MONGO_URI=
```

### Creating and inviting a bot

In order to test your code, you need to create a bot application. You can create one by going to the [Discord Developer Portal](https://discord.com/developers/applications/) and creating a new application. Then, at the "Bot" page, add a bot user. After that, go to "OAuth2" -> "URL Generator" and create an invite url with the `bot` scope. Then, open the invite link and invite it to a test server.

### Environment variables

You also need the bot's token in order to run it. You can get it by going to the "Bot" page and clicking the "Reset Token" button. Then, copy the token and paste it into the `.env` file after `DISCORD_TOKEN=`.

You also need a Tenor API key. You can obtain one at the [Tenor Dashboard](https://tenor.com/developer/dashboard). Then, paste it into the `.env` file after `TENOR_API_KEY=`.

You also need a MongoDB connection string. First, create an account and create a database on [MongoDB Atlas](https://cloud.mongodb.com/). Then, get the connection string for applications, fill in the username and password of the database user and paste it into the `.env` file after `MONGO_URI=`.

## Coding and testing

Once you have the project set up, you can start coding!

While coding, you can always test it by doing the following:

1. Make sure all of your code is saved.
2. Open a terminal in the project folder.
3. Run `npm run dev` to start the bot.
4. If you make any other changes and save it, the bot will restart with the new changes.

## Commit and push

> Make sure to follow the [commit message convention](https://github.com/HarryPotterGirlzz/Hermione-Granger/blob/main/.github/COMMIT_CONVENTION.md).

When you are done coding, run `npm test` and make sure there are no linting errors. If there are, please resolve them and try again. You can run `npm run lint:fix` to automatically fix some linting errors. When everything works fine and there are no linting errors, you can commit and push your code and open a pull request!
