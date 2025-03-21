import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {

    const Suredelete = () => {
        const confirmed = window.confirm(`Are you sure you want to delete the note "${title}"?`);
        if (confirmed) {
          onDelete();
        }
      };
      
  return (
    <div className='border m-5 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className="text-sm font-medium">{title}</h1>
          <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}
          onClick={onPinNote}
        />
      </div>
      <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className='text-xs text-slate-600'>
          {tags.map((item, index) => (
            <span key={index}>#{item} </span>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit} />
          <MdDelete className='icon-btn hover:text-red-500' onClick={Suredelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
