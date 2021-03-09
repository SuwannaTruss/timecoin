import axios from "axios";

export default {
  getServices() {
    return [
      {
        description: "fake description",
        servicename: "fake French",
        UserId: "1",
      },
      {
        description: "fake description2",
        servicename: "fake French2",
        UserId: "2",
      },
    ];
  },
  addService(data) {
    return axios.post(data);
  },

  getProfile() {
    return [
      {
        username: "sofiamoura",
        email: "sofia@sofia.com",
        firstname: "Sofia",
        lastname: "Moura",
        location: "Porto",
        services: [
          {
            id: 1,
            description: "I teach portuguese",
            servicename: "teaching",
            userId: 1,
          },
          {
            id: 2,
            description: "I look after your cat",
            servicename: "pets",
            userId: 1,
          },
        ],
      },
    ];
  },

  getService () {
    return [{id:1, servicename:"learn polish", description:"polish is being taught"}]
  }
};

