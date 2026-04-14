import { useState } from "react";
import "../styles/createHackathon.css"; 
import { createHackathon } from "../api/api";

function AdminHackathon(){
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    url: "",
    image: "",
    mode: "Online",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async(e) => {
    e.preventDefault();
    try{
      const res = await createHackathon(form);
      alert("Hackathon successfully created");
    }catch(error){
      console.log(error);
      alert("Error: " + error.response?.data?.message || error.message);
    };
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-crown"></i>
          <h2>Admin Panel</h2>
        </div>
        <ul className="sidebar-nav">
          <li>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li className="active">
            <i className="fas fa-code-branch"></i> Hackathons
          </li>
          <li>
            <i className="fas fa-users"></i> Users
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1>Manage Hackathons</h1>
          <div className="admin-badge">
            <i className="fas fa-user-shield"></i> Admin
          </div>
        </div>

        <form className="form-card" onSubmit={handleCreate}>
          <h3>
            <i className="fas fa-plus-circle"></i> Create Hackathon
          </h3>

          <div className="form-grid">

            <input
              type="text"
              name="name"
              placeholder="Hackathon Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description *"
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location *"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="registrationDeadline"
              value={form.registrationDeadline}
              onChange={handleChange}
            />

            <input
              type="text"
              name="url"
              placeholder="Hackathon URL"
              value={form.url}
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />

            <select name="mode" value={form.mode} onChange={handleChange}>
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>

          </div>

          <button className="create-btn" type="submit">
            <i className="fas fa-rocket"></i> Launch Hackathon
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminHackathon;