import React from 'react'
import { useState } from 'react'
const Signup = ({handleFormType}:{handleFormType:string}) => {
    return (
        <div>
              <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-2xl py-4 text-primary">Sign up</h3>
    <form>
        <div className='flex flex-row gap-4' >
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">First name</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered bg-[#F2F2F2] w-full max-w-xs"  required/>
  <div className="label">

  </div>
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last name</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered bg-[#F2F2F2] w-full max-w-xs" required />
  <div className="label">
  </div>
</label>

        </div>

    <div className='flex flex-col'>
            <label className="form-control w-full ">
        <div className="label">
            <span className="label-text">Student ID</span>
        </div>
        <input type="text" placeholder="123456789" className="input input-bordered bg-[#F2F2F2] w-full" required />
        <div className="label">
        </div>
        </label>

        <label className="form-control w-full ">
        <div className="label">
            <span className="label-text">Laurier email</span>
        </div>
        <input type="text" placeholder="email@mylaurier.ca" className="input input-bordered bg-[#F2F2F2] w-full " required />
        <div className="label">
        </div>
        </label>

        <label className="form-control w-full ">
        <div className="label">
            <span className="label-text">Password</span>
        </div>
        <input  type="text" placeholder="i promise i wont hack u" className="input input-bordered  w-full bg-[#F2F2F2]  "  required/>
    
        </label>
        <button className="btn btn-block bg-primary text-white mt-4">Sign up</button>
        <span className='py-4 flex flex-row gap-2'>Have an account? <p className='text-secondary cursor-pointer' onClick={() => handleFormType("login")}>Login here</p></span>


    </div>

    </form>
        </div>
    )
}
const Login = ({handleFormType}:{handleFormType:string}) => {
    return (
        <div>
              <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-2xl py-4 text-primary">Log in </h3>
    <form>
    
    <div className='flex flex-col'>

        <label className="form-control w-full ">
        <div className="label">
            <span className="label-text">Laurier email</span>
        </div>
        <input type="text" placeholder="email@mylaurier.ca" className="input input-bordered bg-[#F2F2F2] w-full " required />
        <div className="label">
        </div>
        </label>

        <label className="form-control w-full ">
        <div className="label">
            <span className="label-text">Password</span>
        </div>
        <input  type="text" placeholder="i promise i wont hack u" className="input input-bordered  w-full bg-[#F2F2F2]  "  required/>
        <div className="label">

        <span className="label-text-alt text-secondary">Forgot password?</span>

        </div>
        </label>
        <button className="btn btn-block bg-primary text-white mt-4">Sign up</button>
        <span className='py-4 flex flex-row gap-2'>Dont have an account? <p className='text-secondary cursor-pointer' onClick={() => handleFormType("signup")}>Sign up here</p></span>


    </div>

    </form>
        </div>
    )
}

const LoginPage = () => {
    const [formType, setFormType] = useState("login");
  return (
    <div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>(document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>Login</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box px-16">
    {formType === "login"? <Login handleFormType={setFormType}/> :<Signup handleFormType={setFormType}/> }
  </div>
</dialog>
    </div>
  )
}

export default LoginPage