import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import ReactSelect from "react-select";

export const ALLAUTHOR = gql`
  query AllAuthors {
    allAuthors {
      name
      id
      born
      bookCount
    }
    bookCount
  }
`;
const EDITAUTORS = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;
const Authors = (props) => {
  const res = useQuery(ALLAUTHOR);
  const [selectedOption, setSelectedOption] = useState(null);
  const [updateAuthor] = useMutation(EDITAUTORS, {
    refetchQueries: [{ query: ALLAUTHOR }],
  });
  const [brithyear, setbrithyear] = useState("");

  if (!props.show) {
    return null;
  }
  if (res.loading) {
    return <div>Loading......</div>;
  }
  if (res.error) {
    return <div>Nwtwork Error</div>;
  }
  const authors = res.data.allAuthors;
  const getOptions = (authors) => {
    return authors.map((au) => ({
      value: au.name,
      label: au.name,
    }));
  };
  const changeBirthYearHandler = () => {
    updateAuthor({
      variables: { name: selectedOption.value, setBornTo: Number(brithyear) },
    });
  };
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ReactSelect
          options={getOptions(authors)}
          onChange={setSelectedOption}
          defaultValue={selectedOption}
        ></ReactSelect>
        <div>
          Born:
          <input
            type="number"
            name="born"
            id="born"
            value={brithyear}
            onChange={(e) => {
              setbrithyear(e.target.value);
            }}
          />
        </div>
        <button onClick={changeBirthYearHandler}>Update Author</button>
      </div>
    </div>
  );
};

export default Authors;
