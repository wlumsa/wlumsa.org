import { FaSearch, FaChevronDown } from "react-icons/fa"; 
import { fetchHalalDirectory } from '../utils/datafetcher'; 

export default async function DirectoryPage() {
  return (
    <div className="flex flex-col items-center mt-20 md:mt-40 px-4 mx-auto w-full"> 
      <div className="text-center w-full md:w-1/2 mx-auto"> 
        <h1 className="font-sans text-2xl font-bold text-primary md:text-5xl">
          Halal Food Directory
        </h1>
        <p className="mt-2 text-gray-700 text-md md:text-base">Discover Halal Food spots near Laurier's Campus</p> 
      </div>

      {/* Google Maps Embed */}
      <div className="w-full md:w-1/2 mt-8 mx-auto"> 
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1uQfQqV85aYaziCWMs996FZOPkyIKvAw&usp=sharing" 
          width="100%"  
          height="400"  
          style={{ border: 0 }}
          allowFullScreen={true}  
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Search bar with an icon */}
      <div className="flex items-center border rounded-md p-2 w-full md:w-1/2 mt-20 mx-auto">  
        <input
          type="text"
          placeholder="Search"
          className="flex-grow outline-none text-gray-600 p-2"
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Dropdown buttons with arrow icons */}
      <div className="w-full md:w-1/2 flex flex-wrap justify-center mt-4 space-y-4 md:space-y-0 md:space-x-2 mx-auto mb-20 md:mb-40"> 
        <div className="dropdown w-full md:w-auto"> 
          <div tabIndex={0} role="button" className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary">
            All Cuisines <FaChevronDown className="ml-2" />  
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>

        <div className="dropdown w-full md:w-auto">
          <div tabIndex={0} role="button" className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary">
            Slaughter Methods <FaChevronDown className="ml-2" />  
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-sm z-[1] w-52 p-2 shadow ">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>

        <div className="dropdown w-full md:w-auto">
          <div tabIndex={0} role="button" className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary">
            Price Range <FaChevronDown className="ml-2" />  
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-sm z-[1] w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>

        <div className="dropdown w-full md:w-auto">
          <div tabIndex={0} role="button" className="btn btn-sm m-1 w-full flex items-center justify-between bg-secondary text-primary">
            Blank <FaChevronDown className="ml-2" />  
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-sm z-[1] w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}