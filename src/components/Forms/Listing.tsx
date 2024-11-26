import React from 'react'

const Listing = () => {
  return (
    <div className='flex flex-col px-4 '>
        <h1 className='font-bold text-primary text-xl text-center'>Create a new Listing</h1>
        <form className='flex flex-col'>
            <div>
                <h1 className='font-bold font-primary text-primary' >Listing information</h1>
                {/* <div className='flex flex-row gap-4'>
                    <div>
                        <label htmlFor="name">First name:</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label htmlFor="name">Last Name:</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div> */}
            </div>
            <div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="name">Listing Title:</label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="name">Address:</label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="name">Property Type:</label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="name">Deposit:</label>
                    <input type="text" placeholder="$1000.00" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="name">Monthly Rent price:</label>
                    <input type="text" placeholder="$1000.00" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className='py-2'>
                    <label htmlFor="name">Listing Description:</label>
                    <textarea placeholder="Type here" className="textarea textarea-bordered w-full max-w-xs" />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='font-bold font-primary text-primary' >Add Your contact information (optional)</h1>
                <div className='flex flex-row gap-4'>
                <div className='flex flex-col'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Phone number:</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
               
                    <div className='flex flex-col' >
                        <label htmlFor="name">Instagram</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label htmlFor="name">Facebook</label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </div>

            </div>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />            <label>Upload Supporting Images</label>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </form>

    </div>
  )
}

export default Listing