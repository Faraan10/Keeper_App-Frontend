import axios from "axios";
import url from "../Constants";

const getData = async () => {
  const response = await axios({
    url: `${url}/data`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export default getData;
