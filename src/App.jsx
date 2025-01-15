import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateBooks from "./pages/CreateBooks"
import BookDetails from "./pages/BookDetails"
import EditBook from "./pages/EditBook"
import DeleteBook from "./pages/DeleteBook"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/books' element={<Home/>} />
        <Route path='/books/create' element={<CreateBooks/>}/>
        <Route path='/books/details/:id' element={<BookDetails />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
