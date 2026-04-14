// import { useState, useEffect } from "react";
// import { Link , useNavigate } from "react-router-dom";
// import "../styles/team.css";
// import { getAllTeams , joinTeam , createConversation } from "../api/api";

// const Team = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await getAllTeams(); 
//         setTeams(res.data);
//         if (res.data?.members?.length) {
//         await createConversation({
//           members: res.data.members.map((m) => m._id), 
//           teamId: res.data._id,
//         });
//       }
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch teams"); 
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchTeams();
//   }, []);

//   if (loading) {
//     return (
//       <div className="team-list-wrapper">
//         <div className="loading-spinner">Loading teams...</div>
//       </div>
//     );
//   }

//   const handleJoin = async(teamId)=>{
//     try{
//       const res = await joinTeam({teamId});
//       alert("You request sucessfuly sent");
//     }catch(error){
//      console.log(error.response?.data?.message);
//     };
//   };

//   return (

//     <div className="team-list-wrapper">
//       <div className="team-list-header">
//         <h2>Teams</h2>
//         <Link to="/createTeam" className="create-team-icon">
//           + Create Team
//         </Link>
//       </div>

//       {error && <div className="error-message">{error}</div>}
//       {teams.length === 0 ? (
//         <div className="no-teams">
//           <p>No teams found. Be the first to create one!</p>
//           <Link to="/createTeam" className="create-team-btn">
//             + Create a Team
//           </Link>
//         </div>
//       ) : (
//        <div className="team-grid">
//           {teams.map((team) => (
//             <div 
//   key={team._id}
//   className="team-card"
//   onClick={() => navigate(`/team/${team._id}`)}
// >
//               <h3>{team.name}</h3>

//               {team.description && (
//                 <p className="team-description">{team.description}</p>
//               )}

//               <div className="team-meta">
//                 <span>👥 Members: {team.members?.length || 0}</span>
//                 <span>👑 Leader: {team.leader?.name || "Unknown"}</span>
//                 <span>📏 Max Size: {team.maxSize}</span>
//               </div>

//               {team.skills && team.skills.length > 0 && (
//                 <div className="team-skills">
//                   {team.skills.map((skill, idx) => (
//                     <span key={idx} className="skill-tag">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               )}
//                <div className="team-actions">
//                <button onClick={()=>handleJoin(team._id)} className="join-btn">Join Team</button>
//                </div>
//                </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )};
  

// export default Team;


import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import "../styles/team.css";
import { getAllTeams , joinTeam , createConversation } from "../api/api";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await getAllTeams(); 
        setTeams(res.data);   // ✅ only set data
      } catch (error) {
        console.log(error);
        setError("Failed to fetch teams"); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="team-list-wrapper">
        <div className="loading-spinner">Loading teams...</div>
      </div>
    );
  }

  // ✅ JOIN + CREATE CHAT
  const handleJoin = async (team, e) => {
    e.stopPropagation(); // 🔥 IMPORTANT

    try {
      await joinTeam({ teamId: team._id });

      // 🔥 create conversation with safe members
      const members = team.members?.map((m) => m._id) || [];

      await createConversation({
        members,
        teamId: team._id,
      });

      alert("Joined & Chat Ready ✅");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="team-list-wrapper">
      <div className="team-list-header">
        <h2>Teams</h2>
        <Link to="/createTeam" className="create-team-icon">
          + Create Team
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {teams.length === 0 ? (
        <div className="no-teams">
          <p>No teams found. Be the first to create one!</p>
          <Link to="/createTeam" className="create-team-btn">
            + Create a Team
          </Link>
        </div>
      ) : (
        <div className="team-grid">
          {teams.map((team) => (
            <div 
              key={team._id}
              className="team-card"
              onClick={() => navigate(`/team/${team._id}`)}
            >
              <h3>{team.name}</h3>

              {team.description && (
                <p className="team-description">{team.description}</p>
              )}

              <div className="team-meta">
                <span>👥 Members: {team.members?.length || 0}</span>
                <span>👑 Leader: {team.leader?.name || "Unknown"}</span>
                <span>📏 Max Size: {team.maxSize}</span>
              </div>

              {team.skills && team.skills.length > 0 && (
                <div className="team-skills">
                  {team.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="team-actions">
                <button 
                  onClick={(e) => handleJoin(team, e)} 
                  className="join-btn"
                >
                  Join Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;