import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <span className="icon">🔍</span>
        </div>
        <div className="items">
          <div className="item">
            <span className="icon">🌍</span>
            English
          </div>
          <div className="item">
            <span className="icon">⛶</span>
          </div>
          <div className="item">
            <span className="icon">🔔</span>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <span className="icon">💬</span>
            <div className="counter">2</div>
          </div>
          <div className="item">
            <span className="icon">☰</span>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="User Avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
