import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import BackBtn from '../components/BackBtn';
const user = JSON.parse(localStorage.getItem('userData'))

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect( () => {
        console.log('Fetching book with ID:', id);

        const fetchFunc = async ()=>{
            const res = await fetch(`http://localhost:3001/books/${id}`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const data = await res.json()
    
            if (res.ok){
                setBook(data)
                console.log(data)
            }
    
            else{
                console.log(data)
            }
        }

        fetchFunc()
    }, []);
  return (
    <div className='p-4'>
        <BackBtn />
        <h1 className='my-4'>Book Details</h1>
        <div className='border border-2 rounded rounded-xl p-4'>

            <div className='w-1/3 pr-4'> 
                <img src={book?book.image:""} alt={book?book.title:""} width={400} height={300}/>
            </div>

            <div className='my-4'>
                <span className='border p-1 rounded mx-2'>Title</span>
                <span>{book?book.title:""}</span>
            </div>
            <div className='my-4'>
                <span className='border p-1 rounded mx-2'>Author</span>
                <span>{book?book.author:""}</span>
            </div>
            <div className='my-4'>
                <span className='border p-1 rounded mx-2'>Publish Year</span>
                <span>{book?book.publishYear:""}</span>
            </div>
            <div className='my-4'>
                <span className='border p-1 rounded mx-2'>Create Time</span>
                <span>{book?new Date(book.createdAt).toString():""}</span>
            </div>
            <div className='my-4'>
                <span className='border p-1 rounded mx-2'>Last Update Time</span>
                <span>{book?new Date(book.updatedAt).toString():""}</span>
            </div>

        </div>
      

    </div>
  )
}

export default BookDetails