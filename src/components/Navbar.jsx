import { useContext } from "react";
import { Link } from "react-router-dom";
import { IsAuthContext } from "../context/IsAuthContext";
import Popup from "reactjs-popup";
import Login from "../pages/Login";

export default function Navbar(props) {
  const { currUser } = props;
  const { isAuth, logout } = useContext(IsAuthContext);
  console.log(isAuth);
  console.log(currUser);
  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <div className="navbar flex justify-between items-center bg-base-100">
        {/* <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="navbar-start  w-3/4">
          <ul className="flex justify-around  items-center p-4 w-full text-yellow-800 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blogs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end  w-1/4">
          {isAuth ? (
            <div className="flex w-full items-center justify-center gap-10">
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li> */}
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
              <button
                className="border rounded-2xl bg-white text-yellow-800  border-yellow-800 px-4 py-1 hover:bg-yellow-800 hover:text-white"
                onClick={() => handleLogout()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Popup
              trigger={
                <div className="flex w-full  items-center justify-end px-5  ">
                  <button className="border bg-yellow-800 text-white rounded-2xl px-5 py-2 w-1/2 hover:border-yellow-800 hover:text-yellow-800 hover:bg-white ">
                    Sign In
                  </button>
                </div>
              }
              modal
              nested
              contentStyle={{
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                margin: "0",
                padding: "0",
                zIndex: "2",
                paddingTop: "50px",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              {(close) => <Login close={close} />}
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
}
