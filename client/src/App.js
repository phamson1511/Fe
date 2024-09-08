
import "./App.scss";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <h1>Home Page</h1>

      <button>
        <Link to="/login">Go to Login Page</Link>
      </button>
      <button>
        <Link to="/loading">Go to Loading Page</Link>
      </button>
    </div>
  )
};

export default App;
