import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { getProfile } from "../api/api";

const Navbar = () => {
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
      }
    };

    fetchProfile();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <>
      <nav className="navbar premium-nav">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/home" className="logo">
            DevMeet
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
            <NavLink to="/team" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Teams
            </NavLink>
            <NavLink to="/hackathon" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Hackathons
            </NavLink>
          </div>

          {/* Right Icons Group */}
          <div className="nav-icons">
            <Link to="/chat" className="icon-btn" aria-label="Chat">
              💬
            </Link>

            {/* Notification Icon - hidden on mobile, appears in bottom nav */}
            <Link to="/notification" className="icon-btn notification-icon" aria-label="Notifications">
              🔔
            </Link>

            <div className="profile-container" ref={dropdownRef}>
              <div className="avatar-wrapper" onClick={toggleDropdown}>
                {profile ? (
                  <img
                    src={
                      profile.image ||
                      `https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&size=40&name=${encodeURIComponent(
                        profile.name
                      )}`
                    }
                    alt={profile.name || "User"}
                    className="nav-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">👤</div>
                )}
              </div>

              {dropdownOpen && (
                <div className="premium-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="bottom-nav">
        <NavLink to="/home" className={({ isActive }) => (isActive ? "bottom-nav-active" : "")}>
          <span className="bottom-icon">🏠</span>
          <span className="bottom-label">Home</span>
        </NavLink>
        <NavLink to="/team" className={({ isActive }) => (isActive ? "bottom-nav-active" : "")}>
          <span className="bottom-icon">👥</span>
          <span className="bottom-label">Teams</span>
        </NavLink>
        <NavLink to="/hackathon" className={({ isActive }) => (isActive ? "bottom-nav-active" : "")}>
          <span className="bottom-icon">⚡</span>
          <span className="bottom-label">Hackathons</span>
        </NavLink>
        <NavLink to="/notification" className={({ isActive }) => (isActive ? "bottom-nav-active" : "")}>
          <span className="bottom-icon">🔔</span>
          <span className="bottom-label">Alerts</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;