import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../assets/index.css'

const Signup = () => {

    const [email,setemail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isfailed,setIsfailed] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
  


    const LoginFunc = async (e)=>{
        
        e.preventDefault()
        setLoading(true)

        if (email){
            try {

                const userInfo = {email,password,username}

                const res = await fetch('https://bookbackend-gamma.vercel.app/user/signup',{
                    method:"POST",
                    body:JSON.stringify(userInfo),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                const UserData = await res.json()

                if(!res.ok){
                    setIsfailed(true)
                    setLoading(false)
                    return
                }
                
                localStorage.clear()
                localStorage.setItem('userData',JSON.stringify(UserData));
                navigate('/books')
                setLoading(false)
                
                setemail('')
                setPassword('')
                setIsfailed(false)
                
            } catch (error) {
                console.log(error)
                setIsfailed(true)
                setLoading(false)
            }
        }

        else{
            setIsfailed(true)
            setLoading(false)
        }


        
    }

  return (
    <div className='form-div'>
        <form onSubmit={LoginFunc}>
            <p>Sign Up Form</p>
            <label>Username</label>
            <input className='input' type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your username'/>
            <label>Email</label>
            <input className='input' type='text' onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email'/>
            <label>Password</label>
            <input className='input' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password'/>
            <div className='login-div flex flex-column'>
                <button className='button' type='submit' disabled={loading}>{!loading && 'Sign Up'} {loading && "please wait..."}</button>
                <p>Already have an account yet ? <span onClick={()=>navigate('/')}>Login</span></p>
            </div>
            {isfailed && <p className='failed'>Sign Up failed. please check your username or password.</p>}
        </form>
      
    </div>
  )
}

export default Signup