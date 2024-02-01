import React, { useEffect, useState } from "react";
// import { v4 as uuidV4 } from "uuid";
import getApiData from "../api/getApiData";
import postApiData from "../api/postApiData";
import updateApiData from "../api/updateApiData";
import deleteApiData from "../api/deleteApiData";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Spinner from "../components/Spinner";

function CreateArea() {
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const { title, content } = data;

  const [info, setInfo] = useState([]);

  const [update, setUpdate] = useState(false);

  const [id, setId] = useState();

  const [zoomIn, setZoomIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const response = await getApiData();
    setInfo(response);
    setLoading(false);
  };

  const postData = async (values) => {
    await postApiData(values);
    getData();
  };
  //console.log(info);

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  const updateData = (id, title, content) => {
    setUpdate(true);
    setData({ title, content });
    setId(id);
    scrollToTop();
  };

  const deleteData = async (id) => {
    await deleteApiData(id);
    getData();
  };

  const handleClick = () => {
    setZoomIn(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(data);
    postData(data);
    getData();
    setData({
      title: "",
      content: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateApiData(id, data);
    setUpdate(false);
    setId(null);
    setData({
      title: "",
      content: "",
    });
    getData();
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <form
        onSubmit={update ? handleUpdate : handleSubmit}
        className="create-note"
      >
        <input
          placeholder="Title"
          required
          name="title"
          value={title}
          onChange={handleChange}
          onClick={handleClick}
        />

        {zoomIn && (
          <textarea
            placeholder="Take a note..."
            rows={zoomIn ? 3 : 1}
            required
            name="content"
            value={content}
            onChange={handleChange}
          />
        )}

        {zoomIn && (
          <Zoom in={true}>
            <Fab type="submit">{update ? "Update" : "Add"}</Fab>
          </Zoom>
        )}
      </form>

      <div className="container">
        <div className="row">
          {info.map((item) => (
            <div key={item._id} className="note col-sm-12 col-md-6 col-lg-3">
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <div className="align-buttons">
                <i
                  className="fa-regular align fa-pen-to-square fa-lg"
                  onClick={() => updateData(item._id, item.title, item.content)}
                ></i>
                <i
                  className="fa-solid fa-trash align fa-lg"
                  onClick={() => deleteData(item._id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateArea;
