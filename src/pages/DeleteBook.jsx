import React from 'react'
import BackBtn from '../components/BackBtn'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from "notistack";
const user = JSON.parse(localStorage.getItem('userData'))


const DeleteBook = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const {enqueueSnackbar} = useSnackbar()
    const user = JSON.parse(localStorage.getItem('userData'))

    const handleDeleteBook = () => {
        axios
        .delete(`http://localhost:3001/books/${id}`,{
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        })
        .then(() => {
            enqueueSnackbar(" Book Deleted Successfully")
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }
  return (
    <div className='p-4'>
        <BackBtn/>
        <h1 className='my-5 text-center'> Delete Book </h1>

        <div className='d-flex flex-column flex-justify-center border border-danger rounded-xl'>
            <h5 className='display-5 my-5 text-center'>Are You Sure You Want To Delete This Book?</h5>

            <button className='p-4 btn btn-danger text-white m-8' onClick={handleDeleteBook}>
             Yes, Delete it
            </button>
        </div>


    </div>
  )
}

export default DeleteBook