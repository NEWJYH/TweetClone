import { Link } from "react-router-dom";

function Navigation({ userObj }) {
  if (userObj && userObj.displayName === null) {
    let name = "Tweet";
    if (userObj.email) {
      name = userObj.email.split("@")[0];
    }
    userObj.displayName = name;
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">{userObj.displayName}'s Profile</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
