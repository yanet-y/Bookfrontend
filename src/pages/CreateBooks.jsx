import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem('userData'))
  

  const handlefile = (e)=>{
    const file = e.target.files[0]
    setImage(file)

  }

  const handleSaveBook = async () => {

    const formdata = new FormData()

    formdata.append('file',image)
    formdata.append('upload_preset', 'filehandle')

    const result = await axios.post(`https://api.cloudinary.com/v1_1/dotmtm926/upload`,formdata)
    let url = ""

    if (result.statusText==="OK"){
      url =  result.data.secure_url
      console.log(url)
    }
    const data = {
      title,
      author,
      publishYear,
      image:url,
    };

    axios
      .post("https://bookbackend-gamma.vercel.app/books",JSON.stringify(data),{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${user.token}`
        },
      })
      .then(() => {
        enqueueSnackbar(" Book Created Successfully");
        navigate("/books");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackBtn />
      <h1 className="my-4">Create a New Book</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-4">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-3">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mx-5 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-3">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="mx-2 px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image</label>
          <input
            type="file"
            onChange={(e) => handlefile(e)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="btn btn-primary btn-lg" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
