import React, { use, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { register } from '../../store/auth-slice'
import { MessageContaxt } from '../../context/message_context'
import { deepcopy } from '../../utils/deepCopy'
import { registerErrors } from '../../utils/errorobjects'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setIsSuccess,setMessage,setMessageDisplay }= useContext(MessageContaxt)
  const [formData,setFormData]=useState({
    username:'',
    email:'',
    password:'',
    
  })
  const [isLoading,setisLoading] =useState(false) 
  const [re_password,setRe_password]=useState("")
  const [fieldErrors,setFieldErrors]=useState(deepcopy(registerErrors))
  
   //  Submit form
  function handleSubmit(e){
    setisLoading(true)
    e.preventDefault()
    let has_error=false
    const error=deepcopy(registerErrors)
    if(formData.username===''){
      error.username.isRequired=true
      has_error=true
    }
    if (formData.email===''){
      error.email.isRequired=true
      has_error=true
    }
    if (formData.password.length < 8 ){
      error.password.lengthis=true
      has_error=true
    }
    if(formData.password===''){
      error.password.isRequired=true
      has_error=true
    }
    if(formData.password !== re_password && !error.password.lengthis ){
      error.password.match=true
      has_error=true
    }
    if(!has_error){
       dispatch(register(formData)).then((data)=>{
        
      if (data?.payload?.isSuccess){
        setMessageDisplay(true)
        setMessage(data.payload.message)
        setIsSuccess(data.payload.isSuccess)
        navigate('/auth/login')
        setisLoading(false)
         setFormData({
        email:'',
        username:"",
        password:""
       })
       setRe_password("")
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
       setFieldErrors({...registerErrors})
      },2000)
    }
  }
 
  return (
   <>
   
      <div className="text-center mb-8">
            <h1 className="form-heading">Create Account</h1>
            <p className="form-sub-heading">Join our platform today</p>
        </div>
        <form className="space-y-5" autoComplete='off'>
            <div>
                <label htmlFor="name" className="authform-label">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username}
                    className="authform-input"
                    placeholder="username"
                    onChange={(e)=>setFormData({...formData,username:(e.target.value).trim()})}
                />
               {fieldErrors.username.isRequired &&  <p className='text-red-700 mt-1 text-xs'>Username Field is Required</p>}
            </div>      
            <div>
                <label htmlFor="email" className="authform-label">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    className="authform-input"
                    placeholder="your@email.com"
                     onChange={(e)=>setFormData({...formData,email:(e.target.value).trim()})}
               />
               {fieldErrors.email.isRequired && <p className='text-red-700 mt-1 text-xs'>Email Field is Required</p>}
            </div>
            
          
            <div>
                <label htmlFor="password" className="authform-label">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    className="authform-input"
                    placeholder="••••••••"        
                    minLength="8"
                     onChange={(e)=>setFormData({...formData,password:(e.target.value).trim()})}
                />
                {fieldErrors.password.isRequired && <p className='text-red-700 mt-1 text-xs'>Password Field is Required</p>}
                {fieldErrors.password.lengthis && <p className="mt-1 text-xs text-red-700">Must be at least 8 characters long</p>}
            </div>
            
       
            <div>
                <label htmlFor="confirm-password" className="authform-label">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirm-password" 
                    name="confirm-password" 
                    className="authform-input"
                    value={re_password}
                    placeholder="••••••••"
                     onChange={(e)=>setRe_password(e.target.value)}
                />
                   {fieldErrors.password.match && <p className='text-red-700 mt-1 text-xs'>Password is not Match</p>}
            </div>
            
           
            <div className="flex items-start">
                <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    className="form-checkout"
                    
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="form-link">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                </label>
            </div>
            
           
            <div>
                <button 
                    type="submit" 
                    className="authform-btn"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? <div className='loader'></div>: "Create Account"}
                </button>
            </div>
        </form>
        
       
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
            </div>

        </div>
        
        
        <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
                Already have an account? 
                <Link to='/auth/login' className="form-link">
                    Sign in
                </Link>
            </p>
        </div>
   </>
  )
}

export default Register
