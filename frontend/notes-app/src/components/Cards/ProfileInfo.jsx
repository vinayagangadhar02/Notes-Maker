import React from 'react'
import {getInitials} from "../../utils/helper"

const ProfileInfo = ({userInfo,onLogout}) => {
 
  return (
userInfo && <div className="flex items-center gap-4 mx-5">
    <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(userInfo.username)}</div>
    <div>
        <p className='text-m m-1 font-medium'>{userInfo.username}</p>
        <button className="bg-teal-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-teal-600 transition duration-300 mt-1" onClick={onLogout}>Log Out</button>

        </div>
       
    </div>
 
  )
}

export default ProfileInfo