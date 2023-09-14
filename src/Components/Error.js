import "./Error.css"
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1 classname="error-paragraph">Sorry, this page does not exist!</h1>
      <Link to="/">
        <button>HOME</button>
      </Link>
    </div>
  );
};

export default Error;
