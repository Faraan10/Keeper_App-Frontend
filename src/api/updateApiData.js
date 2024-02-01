import axios from "axios";
import url from "../Constants";

const updateData = async (id, data) => {
  const response = await axios({
    url: `${url}/data/update/${id}`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  });
  return response.data;
};

export default updateData;
