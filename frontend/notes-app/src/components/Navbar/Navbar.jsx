import React from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { useState } from 'react'
import DarkLightMode from '../DarkLightMode/DarkLightMode'


const Navbar=({userInfo,onSearchNote,handleClearSearch,isLight,toggleTheme})=> {

const navigate=useNavigate();
const [searchQuery,setSearchQuery]=useState("");
const onLogout=()=>{
 localStorage.clear()
  navigate("/login");
}

const handleSearch=()=>{
if(searchQuery){
  onSearchNote(searchQuery)
}
}


const onClearSearch=()=>{
  setSearchQuery("");
  handleClearSearch()
  }
  

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
      <SearchBar value={searchQuery}
       onChange={({target})=>{
        setSearchQuery(target.value)}}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />
        <div className=' flex items-center justify-between  px-6 py-2 drop-shadow'>
     <DarkLightMode isLight={isLight} toggleTheme={toggleTheme} />
      <ProfileInfo userInfo={userInfo} OnLogout={onLogout} />
      </div>
    </div>
    
  )
}

export default Navbar