import React from "react";
import { Link } from "react-router-dom";

type Proptypes = {
  children?: React.ReactNode;
  title?: string;
  error?: string;
  TextLink?: string;
  link?: string;
};

function Authlayout(props: Proptypes) {
  const { children, title, TextLink, link } = props;
  return (
    <>
      <div className="login-container">
        <div className="login-card shadow-lg">
          <h2 className="text-danger text-center mb-4">{title}</h2>
          {children}

          <p className="text-white text-center mt-3">
            {TextLink}{" "}
            <Link className="text-danger" to={link || "/default-path"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Authlayout;
