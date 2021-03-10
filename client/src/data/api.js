import axios from "axios";
​
export default {
  async getService() {
   return await axios("/services");
  },
  async addService(data) {
    return await axios.post(data);
  },

  async getProfile() {
    return await axios("/profile");
   },
};
​
