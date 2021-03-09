import axios from "axios";



export default  {
    getServices() {
      return [{ UserId : "1", description: "fake description", servicename: "fake French",  }, 
      
      { UserId : "2", description: "fake description2", servicename: "fake French2",  }];
    },
    addService(data) {
      return axios.post(data);
    },

  getService () {
    return [{id:1, servicename:"learn polish", description:"polish is being taught"}]
  }
  };