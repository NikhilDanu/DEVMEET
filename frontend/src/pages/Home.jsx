import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { getHackathon, getAllTeams } from "../api/api";

const Home = () => {
  const [recentHackathons, setRecentHackathons] = useState([]);
  const [topTeams, setTopTeams] = useState([]);
  const [stats, setStats] = useState({
    teams: 0,
    hackathons: 0,
    developers: 2,
  });

  const sectionsRef = useRef([]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hackRes = await getHackathon();
        const teamRes = await getAllTeams();
        setRecentHackathons(hackRes.data.slice(0, 3));
        setTopTeams(teamRes.data.slice(0, 3));
        setStats((prev) => ({
          ...prev,
          teams: teamRes.data.length,
          hackathons: hackRes.data.length,
        }));
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchData();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Page 1: Hero Section - Full viewport height */}
      <section className="hero-section full-page" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="hero-content">
          <h1>
            Build <span className="gradient">Amazing Things</span>
            <br /> with DevMeet
          </h1>
          <p>
            Connect with developers, form winning teams, and participate in
            hackathons that shape the future.
          </p>
          <div className="hero-buttons">
            <Link to="/teams" className="btn-primary">
              Explore Teams →
            </Link>
            <Link to="/hackathons" className="btn-secondary">
              View Hackathons
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h3>{stats.teams}+</h3>
            <p>Teams Created</p>
          </div>
          <div className="stat-card">
            <h3>{stats.hackathons}+</h3>
            <p>Hackathons</p>
          </div>
          <div className="stat-card">
            <h3>{stats.developers.toLocaleString()}+</h3>
            <p>Developers</p>
          </div>
        </div>
      </section>

      {/* Page 2: Why DevMeet */}
      <section className="features-section" ref={(el) => (sectionsRef.current[1] = el)}>
        <h2>Why DevMeet?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Find Your Team</h3>
            <p>Discover like‑minded developers and build the next big thing together.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Compete & Win</h3>
            <p>Join exciting hackathons, showcase your skills, and win prizes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Grow Faster</h3>
            <p>Learn from peers, get feedback, and level up your career.</p>
          </div>
        </div>
      </section>

      {/* Page 3: Upcoming Hackathons */}
      <section className="preview-section" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="section-header">
          <h2>🔥 Upcoming Hackathons</h2>
          <Link to="/hackathons" className="view-all">View all →</Link>
        </div>
        <div className="preview-grid">
          {recentHackathons.length === 0 ? (
            <p className="no-data">No hackathons yet. Be the first to create one!</p>
          ) : (
            recentHackathons.map((hack) => (
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
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Page 3 continued: Top Teams */}
      <section className="preview-section teams-preview" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="section-header">
          <h2>🌟 Top Teams</h2>
          <Link to="/teams" className="view-all">View all →</Link>
        </div>
        <div className="preview-grid teams-grid">
          {topTeams.length === 0 ? (
            <p className="no-data">No teams yet. Create the first team!</p>
          ) : (
            topTeams.map((team) => (
              <div key={team._id} className="preview-card team-card-preview">
                <div className="team-icon">👥</div>
                <div className="preview-info">
                  <h3>{team.name}</h3>
                  <p>Members: {team.members?.length || 0}</p>
                  <p>Leader: {team.leader?.name || "Unknown"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Page 4: CTA */}
      <section className="cta-section" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="cta-content">
          <h2>Ready to build something extraordinary?</h2>
          <Link to="/teams" className="btn-primary large">Get Started Now →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;