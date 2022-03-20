import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demos-96216-default-rtdb.firebaseio.com",
});

export default journalApi;
