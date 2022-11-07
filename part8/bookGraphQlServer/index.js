const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.model");
const resolvers = require("./Resolver");
const typeDefs = require("./types");
const express = require("express");
const http = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const DataLoader = require("dataloader");
const { mongo, default: mongoose } = require("mongoose");
const BookModel = require("./Models/Book.model");
const SECRET = "SECRET";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null;
//     if (auth && auth.toLocaleLowerCase().startsWith("bearer")) {
//       const decodeToken = jwt.decode(auth.substring(7), SECRET);
//       const user = await UserModel.findById(decodeToken.id);
//       return { currentUser: user };
//     }
//   },
// });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const bookCountDataLoader = new DataLoader(async (keys) => {
        const data = await BookModel.aggregate([
          { $group: { _id: "$author", count: { $sum: 1 } } },
        ]);
        const authorMap = {};
        data.forEach((author) => {
          authorMap[author._id] = author.count;
        });
        return keys.map((key) => authorMap[key]);
      });
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLocaleLowerCase().startsWith("bearer")) {
        const decodeToken = jwt.decode(auth.substring(7), SECRET);
        const user = await UserModel.findById(decodeToken.id);
        return { currentUser: user, bookCountDataLoader };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });
  const port = 4000;
  httpServer.listen(port, () => {
    console.log("Server is running");
  });
};
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
start();
