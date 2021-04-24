import axios from "axios";

export default axios.create({
  baseURL: "https://sehat.herokuapp.com/api",
});
// export default axios.create({
//   baseURL: "http://192.168.0.101:3000/api",
// });
