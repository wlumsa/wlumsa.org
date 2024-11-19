//authentication testing
"use client"
import React from 'react'
import { useEffect, useState} from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import createClerkSupabaseClient from '@/lib/supabaseClient'

const initialValues = {
  title: '',
  description: '',
}
const page = () => {
  const { user } = useUser()
  const userId= user?.id
  const { session } = useSession()
  const [listings, setListings] = useState<any[]>([])
  const [userListings, setUserListings] = useState<any[]>([])
  const [formValues, setFormValues] = useState(initialValues)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')  
  const [loggedIn, setLoggedIn] = useState(false)
  const client = createClerkSupabaseClient()

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);
  useEffect(() => {
    async function loadListings() {
      console.log('loading listings')
      const { data, error } = await client.schema('custom_schema').from('listings').select('*')
      if (!error) setListings(data)
    } 
    async function loadMyListings() {
      console.log('loading listings')
      const { data, error } = await client.schema('custom_schema').from('listings').select('*').eq("user_id", userId)
      if (!error) setUserListings(data)
    } 
  
    
    loadListings()
    if(user) {
      loadMyListings()
    }
  }, [user])

  //submit a listing
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!user) {
      console.log('You must be signed in to submit a listing')
      return
    } else {
      console.log('You are signed in as')
      console.log(user)
      console.log('data', title, description)
      const { data, error } = await client.schema('custom_schema').from('listings').insert({ title: formValues.title, description: formValues.description })
      if (!error) {
        setListings([...listings, data])
        // setTitle('')
        // setDescription('')
      } else{
        console.log('error', error)
      }
    }
    
  }
//fetch all listings
console.log('listings', listings)
//fetch  listings
  return (
    <div className='flex flex-col items-center mt-20 px-4  text-primary '>
       <h1 className='text-4xl font-bold'> Laurier Roommate Service</h1>
    {/* LIST ALL LISTINGS */}
    <div >
    <div className='text-xl'>  {loggedIn ? <h1>Yay! You are logged in {userId} </h1> : <h1>You are not logged in</h1>} </div>
    </div>
   <div>
      <h1 className='text-xl font-bold'>Current Listings (All)</h1>
      <div className='flex flex-col gap-4'>
        {listings.map((listing: any) => (
          <div key={listing.id} className='rounded-lg border border-gray-300  p-4'>
            <h2 className='font-bold'>Title: {listing?.title}</h2>
            <p>Description: {listing?.description}</p>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h1 className='text-xl font-bold text-left'>Created By Me</h1>
      <div className='flex flex-col gap-4'>
        {userListings.map((listing: any) => (
          <div key={listing.id} className='rounded-lg border  border-primary p-4'>
            <h2>Title: {listing?.title}</h2>
            <p>Description: {listing?.description}</p>
          </div>
        ))}
      </div>
    </div>
{/* FORM  */}
        <div className="flex w-full items-center justify-center bg-base-100 py-2">
    
      <div className="max-w-xl px-2">
      <h1>Create a listing</h1>
        <form className="card-body" >
          <div className="flex flex-col gap-2 py-2">
            <input
              type="text"
              required
              value={formValues.title}
              onChange={handleInputChange}
              name="title"
              placeholder="Listing Title"
              className="input input-bordered w-full text-neutral focus:border-secondary"
            />
            <input
              type="text"
              value={formValues.description}
              onChange={handleInputChange}
              required
              name="description"
              placeholder="Description of Listing"
              className="input input-bordered w-full text-neutral focus:border-secondary"
            />
          </div>
          <div className="card-actions justify-end">
            <button
              type="submit"
              onChange={handleInputChange}
              onClick={handleSubmit}
              className="btn border-0 bg-primary text-secondary shadow duration-200 hover:scale-105 hover:bg-secondary hover:text-primary"   
            >
             submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default page