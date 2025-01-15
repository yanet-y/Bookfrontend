import React from 'react'
import { useState,useEffect } from 'react'
import BackBtn from '../components/BackBtn'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title,setTitle] = useState('');
    const [author,setAuthor]= useState('');
    const [publishYear,setPublishYear]= useState('');
    const navigate =useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar()
    const user = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {

        axios.get(`http://localhost:3001/books/${id}`,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
        .then((response) => {
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear)
            setTitle(response.data.title)
        }).catch((error) => {
            alert('An error happened. Please check the console');
            console.log(error);
        });
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };

        axios
        .put(`http://localhost:3001/books/${id}`, data,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        })
        .then(() => {
            enqueueSnackbar(" Book Edited Successfully")
            navigate('/books');

        })
        .catch((error) => {

            console.log(error);
        });
    }
  return (
    <div className="p-4">
       <BackBtn/> 
      <h1 className="my-4">Edit Book</h1>
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
        <button className="btn btn-primary btn-lg" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook