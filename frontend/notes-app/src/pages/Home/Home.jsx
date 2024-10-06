import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard"
import {MdAdd} from "react-icons/md" 
import AddEditNotes from './AddEditNotes';

const Home = () => {
      const [openAddEditModel,setOpenAddEditModel]=useState({
            isShown:false,
            type:"add",
            data:null
      })
  return (
    <>
    <Navbar />
    <div className='container mx-auto '>
      <div className="grid grid-cols-3 gap-4 mt-8">
      <NoteCard title="meeting"
      date="12"
      content="meeting on ghsgdhjsgdhj"
      tags="#meeting"
      isPinned={true}
      onEdit={()=>{

      }}
      onDelete={()=>{

      }}
      onPinNote={()=>{

      }}
      />

<NoteCard title="meeting"
      date="12"
      content="meeting on ghsgdhjsgdhj"
      tags="#meeting"
      isPinned={true}
      onEdit={()=>{

      }}
      onDelete={()=>{

      }}
      onPinNote={()=>{

      }}
      />

<NoteCard title="meeting"
      date="12"
      content="meeting on ghsgdhjsgdhj"
      tags="#meeting"
      isPinned={true}
      onEdit={()=>{

      }}
      onDelete={()=>{

      }}
      onPinNote={()=>{

      }}
      />

<NoteCard title="meeting"
      date="12"
      content="meeting on ghsgdhjsgdhj"
      tags="#meeting"
      isPinned={true}
      onEdit={()=>{

      }}
      onDelete={()=>{

      }}
      onPinNote={()=>{

      }}
      />
      </div>
    </div>
<button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{}}>


<MdAdd className="text-[32px] text-white"/>

</button>

<AddEditNotes />
   </>

  )

}

export default Home