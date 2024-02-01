import axios from "axios";
import url from "../Constants";

const postData = async (data) => {
  const response = await axios({
    url: `${url}/data/post/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  });
  return response.data;
};

export default postData;
