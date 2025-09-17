import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Backend FastAPI URL
});

export const getPlaygrounds = () => API.get("/playgrounds");
export const getSlots = (playgroundId) => API.get(`/playgrounds/${playgroundId}/slots`);
export const bookSlot = (playgroundId, slotId) =>
  API.post("/book-slot", { playground_id: playgroundId, slot_id: slotId });

export default API;
