import axios from "axios";

export default {
    getServices() {
      return [{ description: "fake description", servicename: "fake French", UserId : "1" }, { description: "fake description2", servicename: "fake French2", UserId : "2" }];
    },
    addService(data) {
      return axios.post(data);
    },
  };