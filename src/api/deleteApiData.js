import axios from "axios";
import url from "../Constants";

const deleteData = async (id) => {
  const response = await axios({
    url: `${url}/data/delete/${id}`,
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export default deleteData;
