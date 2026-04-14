import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const createProfile = (data) => API.post("/profile/create" , data);
export const getProfile = () => API.get("/profile/getProfile");
export const createTeam = (data) => API.post("/team/createTeam" , data);
export const getAllTeams = () => API.get("/team/getAllTeams");
export const joinTeam  = (data) => API.post("/team/joinTeam" , data);
export const accept = (data) => API.post("/team/accept" , data);
export const reject = (data) => API.post("/team/reject" ,data);
export const getRequests = () => API.get("/team/request");
export const getTeamById = (id) => API.get(`/team/${id}`);
export const createHackathon = (data) => API.post("/hackathon/createHackathon" , data);
export const getHackathon = (data) => API.get("/hackathon/getHackathon");
export const createConversation = (data) =>
  API.post("/conversation", data);
export const getConversations = () =>
  API.get("/conversation");
export const sendMessage = (data) =>
  API.post("/message", data);
export const getMessages = (conversationId) =>
  API.get(`/message/${conversationId}`);