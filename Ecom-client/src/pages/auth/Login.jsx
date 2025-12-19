import React,{useState,useContext} from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { login } from "../../store/auth-slice";
import { MessageContaxt } from '../../context/message_context'
import { deepcopy } from "../../utils/deepCopy";
import { loginError } from "../../utils/errorobjects";

const Login = () => {
  
  const dispatch = useDispatch()
  const { setIsSuccess,setMessage,setMessageDisplay }= useContext(MessageContaxt) 
  const [isLoading,setisLoading] =useState(false) 
  const [fieldErrors,setFieldErrors]=useState(deepcopy(loginError))
  
  const [formData,setFormData]=useState({
    email:'',
    password:'',
    
  })

   //  Submit form
  function handleSubmit(e){
    setisLoading(true)
    e.preventDefault()
    let has_error=false
    const error=deepcopy(loginError)
    if(formData.email===''){
      error.email.isRequired=true
      has_error=true
    }
    if(formData.password===''){
      error.password.isRequired=true
      has_error=true
    }
    if(!has_error){
      dispatch(login(formData)).then((data)=>{
        if (data?.payload?.isSuccess){
        setMessageDisplay(true)
        setMessage(data.payload.message)
        setIsSuccess(data.payload.isSuccess)
        setisLoading(false)
         setFormData({
        email:'',
        password:""
       })
      }
      else{
        setMessageDisplay(true)
        setMessage(data.payload.message)
        setIsSuccess(data.payload.isSuccess)
        setisLoading(false)
      }
      }) 
    }
    else{
      setFieldErrors({...error})
      setisLoading(false)
      setTimeout(()=>{
       setFieldErrors({...loginError})
      },2000)
    }
  }



  return (
    <>
  
        <div className="text-center mb-8">
            <h1 className="form-heading">Login</h1>
            <p className="form-sub-heading">Welcome back to our Shopping</p>
        </div>   
        <form className="space-y-6">
            <div>
                <label htmlFor="email" className="authform-label">Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    className="authform-input"
                    placeholder="email"
                     onChange={(e)=>setFormData({...formData,email:(e.target.value).trim()})}
                    />
            {fieldErrors.email.isRequired &&  <p className='text-red-700 mt-1 text-xs'>email Field is Required</p>}
            </div>      
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="authform-label">Password</label>
                    <a href="#" className="form-link">Forgot Password?</a>
                </div>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    className="authform-input"
                    value={formData.password}
                    placeholder="Password"
                     onChange={(e)=>setFormData({...formData,password:(e.target.value).trim()})}
                />
                {fieldErrors.email.isRequired &&  <p className='text-red-700 mt-1 text-xs'>Password Field is Required</p>}
            </div>
            
          
            <div className="flex items-center">
                <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    className="form-checkout"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                </label>
            </div>
            
           
            <div>
                 <button 
                    type="submit" 
                    className="authform-btn"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? <div className='loader'></div>: "Sign up"}
                </button>
            </div>
        </form>
        
  
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>
        </div>
        <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
                Don't have an account? 
                <Link to='/auth/register' className="form-link">
                    Sign up
                </Link>
            </p>
        </div>
    </>
  );
};

export default Login;
