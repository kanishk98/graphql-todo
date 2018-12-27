# Building a to-do web app with Hasura GraphQL engine and React.js

If you've been following the tech world lately, you'll know that GraphQL is a cool new query language for APIs. It's got a lot of features that should make it an easy choice for anyone working on an API: the importance given to <i>what</i> rather than how, the ability to batch multiple requests easily, and the freedom of the client to define whatever data it wants without having to create a new endpoint.

However, GraphQL is not without its problems. Some of them are:

  - Difficulty in setting up a GraphQL server
  - Defining resolvers for each query/mutation/subscription
  - Connecting resolvers to the underlying database

Speaking from personal experience, that last one is definitely a nightmare. 

That's where Hasura's GraphQL Engine comes in. It provides an easy kickstart to GraphQL development by giving the developer access to Heroku deployment (or Docker container) for a GraphQL server that can perform queries on a connected PostgreSQL database. All we have to do is define our good old table schema and the GraphQL SDL is generated for us (as are the templates for common queries, mutations, and subscriptions). If you know Prisma, Hasura's engine will sound familiar, with one key difference - Prisma is an additional database server that interfaces the GraphQL API with the underlying database. You still need to write resolvers that handle queries made to a GraphQL server you write, and you have to define your schema in GraphQL. Hasura allows your front-end to call the GraphQL API directly, just by using a relational Postgres schema you define. 

With that context, let's get started with building the app. 

> To follow along in this tutorial, you'll need a computer with git, React.js and the Chrome web browser. The latter is useful for debugging React applications.

## Initialising the project

I'll be using the `create-react-app` package to initialise a starter React.js project.

```sh
$ npm install -g create-react-app
$ create-react-app graphql-todo
```

Next, I'll log on to Hasura's [website](https://hasura.io) and create a new deployment on Heroku. You can either click [here](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku) or go to [this](https://docs.hasura.io/1.0/graphql/manual/getting-started/heroku-simple.html#deploy-to-heroku) page and click on the deploy button if the former doesn't work. 

This'll lead you to a setup of a basic project (once you've logged in to Heroku, of course). This is what it looks like for me:

# ADD IMAGE HERE

Click on 'Deploy app' and we can move on to the next step. 

## Defining our schema