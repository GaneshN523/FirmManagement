import "./sidebar.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

const icons = {
  dashboard: "📊",
  department: "🏢",
  workers: "👤",
  machinery: "🏭",
  accounts: "🧾",
  laboratory: "🧪",
  stats: "📈",
  notifications: "🔔",
  systemHealth: "🖥️",
  logs: "📜",
  settings: "⚙️",
  profile: "👤",
  logout: "🚪",
};

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FirmManagement</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <span className="icon">{icons.dashboard}</span>
            <span>Dashboard</span>
          </li>
        </Link>

          <p className="title">SECTIONS</p>
          <Link to="/departments" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">{icons.department}</span>
              <span>Departments</span>
            </li>
          </Link>
          <Link to="/workers" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">{icons.workers}</span>
              <span>Workers</span>
            </li>
          </Link>
          <Link to="/machinery" style={{ textDecoration: "none" }}>
          <li>
            <span className="icon">{icons.machinery}</span>
            <span>Machinery</span>
          </li>
          </Link>
          <Link to="/accounts" style={{ textDecoration: "none" }}>
          <li>
            <span className="icon">{icons.accounts}</span>
            <span>Accounts</span>
          </li>
          </Link>
          <Link to="/laboratory" style={{ textDecoration: "none" }}>
          <li>
            <span className="icon">{icons.laboratory}</span>
            <span>Laboratory</span>
          </li>
          </Link>

          <p className="title">USEFUL</p>
          <li>
            <span className="icon">{icons.stats}</span>
            <span>Stats</span>
          </li>
          <li>
            <span className="icon">{icons.notifications}</span>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <span className="icon">{icons.systemHealth}</span>
            <span>System Health</span>
          </li>
          <li>
            <span className="icon">{icons.logs}</span>
            <span>Logs</span>
          </li>
          <li>
            <span className="icon">{icons.settings}</span>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <span className="icon">{icons.profile}</span>
            <span>Profile</span>
          </li>
          <li>
            <span className="icon">{icons.logout}</span>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
