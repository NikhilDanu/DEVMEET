import { useState } from "react";
import "../styles/createTeam.css";
import { createTeam } from "../api/api";
import { useNavigate } from "react-router-dom";

const TeamCreate = () => {
  const [formData, setFormData] = useState({
  name: "",
  description: "",
  skills: "",
  maxSize: "",
});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTeam({
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      });

      alert("Your team is created");
      navigate("/team");
    } catch (error) {
      console.log(error.response?.data)
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="team-wrapper">
      <div className="team-form-container">
        <form className="team-form" onSubmit={handleSubmit}>
          <h2>Create a New Team</h2>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="project name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          <div className="input-group">
            <textarea
              name="description"
              placeholder="Team Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated, e.g., React, Node.js, Design)"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>

           <div className="input-group">
          <input
            type="number"
            name="maxSize"
            placeholder="Max Team Size"
            value={formData.maxSize}
            onChange={handleChange}
            required
          />
          </div>

          <button type="submit">Create Team</button>
        </form>
      </div>
    </div>
  );
};

export default TeamCreate;