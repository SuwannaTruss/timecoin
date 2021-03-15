import axios from "axios";

export default {
  async getService(id) {
    try {
      const response = await axios.get(`/services/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
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

  async addService(newService) {
    // console.log(newService);
    try {
      const response = await axios.post(
        "/services",
        {
          newService,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async getCategories() {
    try {
      const response = await axios.get("/categories");
      return response;
    } catch (err) {
      console.log(err);
    }
  },

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

  // async sendRequest(newRequest) {
  //   console.log(newRequest);
  //   try {
  //     const response = await axios.post("/requests", newRequest, {
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //     });
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
