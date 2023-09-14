import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory(); 

  useEffect(() => {
    if (searchQuery === "") {
      history.push(`/`);
    }
  }, [searchQuery, history]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <form>
      <div className="search-elements">
        <input
          type="search"
          value={searchQuery}
          placeholder="Search all books"
          onInput={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        ></input>
      </div>
    </form>
  );
};

export default Form;
