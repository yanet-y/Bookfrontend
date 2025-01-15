import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/BooksTable";

export const Home = () => {
  const [books, setBooks] = useState([]); 
  const user = JSON.parse(localStorage.getItem('userData'))
  console.log(user,"here is the user")

  useEffect(() => {
    axios
      .get("https://bookbackend-gamma.vercel.app/books",{
        headers:{
          "Authorization":`Bearer ${user.token}`
        }
      }) 
      .then((response) => {
        setBooks(response.data.data); 
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center">
        <h1 className="display-5 mt-5">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="display-5"></MdOutlineAddBox>
        </Link>
      </div>

      <BooksTable books={books} />
    </div>
  );
};

export default Home;
