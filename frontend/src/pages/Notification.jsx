import { useEffect, useState } from "react";
import { getRequests , accept , reject } from "../api/api";
import "../styles/notification.css";


export default function NotificationPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequests();
      if(res.data.length > 0){
        setRequests(res.data);
      }else{
        setRequests([]);
      };
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
  try {
    await accept({ requestId: id });

    setRequests((prev) =>
      prev.filter((req) => req._id !== id)
    );

  } catch (error) {
    console.log(error);
  }
};

const handleReject = async(id) =>{
  try{
    await reject({requestsId: id});
    setRequests((prev)=>{
      prev.filter((req)=> req._id !== id)
    });
  }catch(error){
    console.log(error);
  }
}

  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      {requests.length > 0 ? (
        requests.map((req) => (
          <div className="notification-card" key={req._id}>
            
            <div className="left">
              <div className="avatar">
                {req.user?.name?.charAt(0)}
              </div>

              <div>
                <p className="name">{req.user?.name}</p>
                <p className="team">
                  Wants to join {req.team?.name}
                </p>
              </div>
            </div>

            <div className="actions">
              <button onClick={() => handleAccept(req._id)} className="accept">Accept</button>
              <button onClick={()=> handleReject(req._id)} className="reject">Reject</button>
            </div>

          </div>
        ))
      ) : (
        <p className="empty">No notifications</p>
      )}
    </div>
  );
}