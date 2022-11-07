const AuthorModel = require("./Models/Author.model");
const BookModel = require("./Models/Book.model");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const connect = require("./connectDb");
const { UserInputError } = require("apollo-server");
const UserModel = require("./Models/User.model");
const { AuthenticationError } = require("apollo-server");

connect();

const pubSub = new PubSub();

const PASSWORD = "PASSWORD";
const SECRET = "SECRET";

const resolvers = {
  //*Default Resolver
  Author: {
    bookCount: async (root, _, context) => {
      //*use data loader for n+1 problem
      // console.log(root.id);
      return context.bookCountDataLoader.load(root.id);
      // const author = await AuthorModel.findOne({ name: root.name });
      // const count = await BookModel.find({ author: author.id })
      //   .collation()
      //   .count();
      // return count;
    },
  },
  Book: {
    title: (root) => root.title,
    id: (root) => root.id,
    published: (root) => root.published,
    genres: (root) => root.genres,
  },

  Query: {
    bookCount: async () => await BookModel.collection.countDocuments(),
    authorCount: async () => await AuthorModel.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = BookModel.find();
      if (args.genre && args.genre !== "all") {
        query.find({ genres: args.genre });
      }
      const data = await query.populate("author");
      return data;
    },
    allAuthors: async () => {
      const data = await AuthorModel.find();
      return data;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let author = await AuthorModel.findOne({ name: args.author });
      if (!author) {
        const newauthor = new AuthorModel({ name: args.author });
        try {
          author = await newauthor.save();
        } catch (error) {}
      }
      const newBook = new BookModel({ ...args, author: author._id });
      try {
        const getBook = await newBook.save();
        const populateBook = await getBook.populate("author");
        console.log(populateBook);
        pubSub.publish("BOOK_ADDED", { bookAdded: populateBook });
        return populateBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { name, setBornTo } = args;

      const getAuthor = await AuthorModel.findOne({ name });
      if (!getAuthor) {
        return null;
      }
      getAuthor.born = setBornTo;
      const newAuthor = await getAuthor.save();
      return newAuthor;
    },
    createUser: async (root, args) => {
      const user = new UserModel({ username: args.username });
      try {
        const newUser = await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username });
      if (!user || !String(args.password) == String(PASSWORD)) {
        throw new UserInputError("Wrong Credential");
      }
      const tokenPayload = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(tokenPayload, SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator("BOOK_ADDED"),
    },
  },
};
module.exports = resolvers;
