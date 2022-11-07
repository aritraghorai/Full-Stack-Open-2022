import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NewBook from "./components/NewBook";
import { ALLBOOKS, bookAddSubcription } from "./Graphql/Query";

export const KEY = "book_app_token";

const App = () => {
  const clint = useApolloClient();
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    const localToken = localStorage.getItem(KEY);
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  useSubscription(bookAddSubcription, {
    onData: ({ data }) => {
      const newbook = data.data.bookAdded;
      window.alert(`${newbook.title} added`);
      clint.cache.updateQuery({ query: ALLBOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newbook),
        };
      });
    },
  });
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route
          path="/author"
          token={token}
          element={<Authors token={token} />}
        />
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBook" element={<NewBook />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
