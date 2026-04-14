import "../styles/profile.css";
import { useEffect, useState } from "react";
import { getProfile } from "../api/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null); // ✅ FIX
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setProfile(null); // ✅ no profile
        } else if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);


  if (loading) {
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;
  }

  if (!profile) {
    return (
      <div className="profile-wrapper center">
        <div className="profile-card" style={{ textAlign: "center" }}>
          <h2>No Profile Found</h2>
          <button
            className="edit-button"
            onClick={() => navigate("/create")}
          >
            ➕ Create Profile
          </button>
        </div>
      </div>
    );
  }

  // ✅ PROFILE VIEW
  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={
              profile.image ||
              "https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&size=120&name=" +
                encodeURIComponent(profile.name)
            }
            alt="Profile"
          />
          <h2>{profile.name}</h2>
          <p className="role">{profile.role}</p>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3>About</h3>
            <p>{profile.bio || "No bio added yet."}</p>
          </div>

          <div className="detail-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {Array.isArray(profile.skills)
                ? profile.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))
                : profile.skills?.split(",").map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill.trim()}
                    </span>
                  ))}
            </div>
          </div>
        </div>

        <button
          className="edit-button"
          onClick={() => navigate("/profile")}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;