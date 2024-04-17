import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul className="flex justify-around p-3 underline">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
