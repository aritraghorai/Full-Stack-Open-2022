import { useField } from "../hooks";
const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };
  const resetHandler = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            type={content.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
        <button onClick={resetHandler}>Reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
