import axios from "axios";
export default {
  async getService() {
    try {
      const response = await axios.get("/services");
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async getServices() {
    try {
      const response = await axios.get("/services");
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async addService(data) {
    return await axios.post(data);
  },
  // async getProfile() {
  //   return await axios("/profile");
  // },
  async getProfile() {
    try {
      const response = await axios.get("/users/profile", {
        headers: {
          // to send the token back when make a req to Backend
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  async getUsers() {
    try {
      const response = await axios.get("/users", {
        headers: {
          // to send the token back when make a req to Backend
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
