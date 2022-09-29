import React from "react";

const PersonForm = ({
  onSubmitHandler,
  onChangeHandlerName,
  newName,
  onChangeHandlerNumber,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        name: <input onChange={onChangeHandlerName} value={newName} />
      </div>
      <div>
        number: <input onChange={onChangeHandlerNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
