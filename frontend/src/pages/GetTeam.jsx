// import "../styles/getTeam.css";
// import { useState , useEffect } from "react";
// import {getTeamById} from "../api/api";
// import { useParams } from "react-router-dom";
// export default function TeamDetails() {
//   const [team , setTeam] = useState(null);
//   const { id } = useParams();
//   useEffect(()=>{
//     const fetchData = async () =>{
//       try{
//         const res = await getTeamById(id);
//         setTeam(res.data);
//       }catch(error){
//         console.log(error);
//         alert("internal error");
//       };
//     };
//     fetchData();
//   } , [id])
//   return (
//     <div className="team-details-page">
//       <div className="team-container">

//         {/* Header */}
//         <div className="team-header">
//           <h1>{team?.name}</h1>
//           <p>{team?.description}</p>
//         </div>

//         {/* Info Grid */}
//         <div className="team-grid">

//           {/* Description */}
//           <div className="team-box">
//             <h2>Description</h2>
//             <p>{team?.description}</p>
//           </div>

//           {/* Skills */}
//           <div className="team-box">
//             <h2>Skills Required</h2>
//             <div className="skills">
//               {team?.skills?.map((skill, i) => (
//                 <span key={i} className="skill-tag">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Leader */}
//           <div className="team-box">
//             <h2>Leader</h2>
//             <p>{team?.leader?.name}</p>
//           </div>

//           {/* Team Size */}
//           <div className="team-box">
//             <h2>Team Size</h2>
//             <p>
//               {team?.members?.length} / {team?.maxSize} Members
//             </p>
//           </div>

//           {/* Rating */}
//           <div className="team-box">
//             <h2>Rating</h2>
//             <p className="rating">★★★★☆ (4.0)</p>
//           </div>

//         </div>

//         {/* Members */}
//         <div className="members-section">
//           <h2>Members</h2>

//           <div className="members-grid">
//             {team?.members?.map((member, i) => (
//               <div key={i} className="member-card">
//                 <div className="avatar">
//                   {member?.name?.charAt(0)}
//                 </div>
//                 <p>{member?.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import "../styles/getTeam.css";
import { useState , useEffect } from "react";
import { getTeamById } from "../api/api";
import { useParams } from "react-router-dom";
import Chat from "./Chat"; // ✅ ADD

export default function TeamDetails() {
  const [team , setTeam] = useState(null);
  const { id } = useParams();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await getTeamById(id);
        setTeam(res.data);
      }catch(error){
        console.log(error);
        alert("internal error");
      };
    };
    fetchData();
  } , [id]);

  return (
    <div className="team-details-page">
      <div className="team-container">

        {/* Header */}
        <div className="team-header">
          <h1>{team?.name}</h1>
          <p>{team?.description}</p>
        </div>

        {/* Info Grid */}
        <div className="team-grid">

          {/* Description */}
          <div className="team-box">
            <h2>Description</h2>
            <p>{team?.description}</p>
          </div>

          {/* Skills */}
          <div className="team-box">
            <h2>Skills Required</h2>
            <div className="skills">
              {team?.skills?.map((skill, i) => (
                <span key={i} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Leader */}
          <div className="team-box">
            <h2>Leader</h2>
            <p>{team?.leader?.name}</p>
          </div>

          {/* Team Size */}
          <div className="team-box">
            <h2>Team Size</h2>
            <p>
              {team?.members?.length} / {team?.maxSize} Members
            </p>
          </div>

          {/* Rating */}
          <div className="team-box">
            <h2>Rating</h2>
            <p className="rating">★★★★☆ (4.0)</p>
          </div>

        </div>

        {/* Members */}
        <div className="members-section">
          <h2>Members</h2>

          <div className="members-grid">
            {team?.members?.map((member, i) => (
              <div key={i} className="member-card">
                <div className="avatar">
                  {member?.name?.charAt(0)}
                </div>
                <p>{member?.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 CHAT SECTION ADD KIYA */}
        {team && (
          <div style={{ marginTop: "40px" }}>
            <Chat 
              teamId={team._id} 
              members={team.members} 
            />
          </div>
        )}

      </div>
    </div>
  );
}