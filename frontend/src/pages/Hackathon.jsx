import { useState, useEffect } from "react";
import "../styles/hackathon.css"; // adjust path
import { getHackathon } from "../api/api";

const HackathonList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await getHackathon();
        setHackathons(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load hackathons");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  // Helper to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="hackathon-container">
        <div className="loader">✨ Loading amazing hackathons...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hackathon-container">
        <div className="error-card">{error}</div>
      </div>
    );
  }

  return (
    <div className="hackathon-container">
      <div className="hero-section">
        <h1>🚀 Hackathons</h1>
        <p>Build, innovate, and compete with the best</p>
      </div>

      {hackathons.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <h3>No hackathons found</h3>
          <p>Check back soon for exciting events!</p>
        </div>
      ) : (
        <div className="hackathon-grid">
          {hackathons.map((hack) => (
            <div className="hackathon-card" key={hack._id}>
              <div className="card-image">
                <img
                  src={
                    hack.image ||
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format"
                  }
                  alt={hack.name}
                />
                <span className={`mode-badge ${hack.mode?.toLowerCase()}`}>
                  {hack.mode || "Online"}
                </span>
              </div>
              <div className="card-body">
                <h2>{hack.name}</h2>
                <p className="description">{hack.description}</p>
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{hack.location || "Virtual"}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span>
                    {formatDate(hack.startDate)} – {formatDate(hack.endDate)}
                  </span>
                </div>
                {hack.registrationDeadline && (
                  <div className="info-row deadline">
                    <span className="info-icon">⏰</span>
                    <span>Register by: {formatDate(hack.registrationDeadline)}</span>
                  </div>
                )}
                <div className="skill-tags">
                  {hack.skills?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="tag">{skill}</span>
                  ))}
                </div>
                <a
                  href={hack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="register-btn"
                >
                  Join Now →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HackathonList;