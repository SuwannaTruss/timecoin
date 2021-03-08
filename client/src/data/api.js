import axios from "axios";
​
export default {
  async getService() {
   return await axios("/services");
  },
  addService(data) {
    return axios.post(data);
  },
};
​
