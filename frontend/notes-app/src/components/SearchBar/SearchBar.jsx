import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io"


const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {


  return (
    <div className='w-80 flex items-center px-4 border rounded-[500px] bg-slate-100'>
        
        <input 
        type="text"
        placeholder='Search Notes'
        value={value}
        className='w-full pl-2  text-xs bg-transparent py-[11px] outline-none'
        onChange={onChange}
        /> 
        {value && <IoMdClose className='cursor-pointer text-slate-400 hover:text-black mr-3' onClick={onClearSearch} />}
        
       <FaMagnifyingGlass className="cursor-pointer text-slate-400 hover:text-black" onClick={handleSearch}></FaMagnifyingGlass>
    </div>
  )
}

export default SearchBar