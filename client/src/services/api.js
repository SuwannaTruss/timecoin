import axios from "axios";

export default {
  async getProfile() {
    const data = await axios("/profile").data;
    return data.map((e) => e.firstname);
  },
  addService(data) {
    return axios.post(data);
  },
};

async function justReturn() {
  return "hello";
}
