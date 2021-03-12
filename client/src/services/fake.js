export default {
  getProfile() {
    return { name: "fake", lastname: "superfake" };
  },
  addService(data) {
    return axios.post(data);
  },
};
