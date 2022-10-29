import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const ALLBOOKS = gql`
  query AllAuthors {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;
const Books = (props) => {
  const res = useQuery(ALLBOOKS);
  if (!props.show) {
    return null;
  }
  if (res.loading) {
    return <div>Loading.....</div>;
  }
  if (res.error) {
    return <div>Nwtwork Error</div>;
  }
  const books = res.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
