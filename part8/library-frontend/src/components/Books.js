/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALLBOOKS } from "../Graphql/Query";

const Books = (props) => {
  const response = useQuery(ALLBOOKS);
  const [getAllBooks, res] = useLazyQuery(ALLBOOKS, {
    fetchPolicy: "no-cache",
  });
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (response.data) {
      setBooks(response.data.allBooks);
    }
  }, [response.data]);
  useEffect(() => {
    if (res.data) {
      setBooks(res.data.allBooks);
    }
  }, [res.data]);
  const fetchDataByGenre = (gen) => {
    getAllBooks({ variables: { genre: gen } });
  };

  if (response.loading) {
    return <div>Loading.....</div>;
  }
  if (response.error) {
    return <div>Nwtwork Error</div>;
  }
  const genres = [
    ...new Set(response.data.allBooks.flatMap((b) => b.genres)),
  ].concat("all");
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((a) => (
        <button
          key={a}
          onClick={() => {
            fetchDataByGenre(a);
          }}
        >
          {a}
        </button>
      ))}
    </div>
  );
};

export default Books;
