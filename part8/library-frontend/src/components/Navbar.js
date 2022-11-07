import React from "react";
import { Link } from "react-router-dom";
import { KEY } from "../App";

const Navbar = ({ token, setToken }) => {
  const logOutHandler = () => {
    localStorage.removeItem(KEY);
    setToken(undefined);
  };
  return (
    <>
      <div>
        <Link to="/author">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>

        {token ? (
          <>
            <Link to="/addBook">
              <button>addbook</button>
            </Link>
            <button onClick={logOutHandler}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
