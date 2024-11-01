import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Toast from "../../components/ToastMessage/Toast";

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  const showToastMesssage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response?.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response?.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Unexpected error has occured.please try again");
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto ">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.createdOn}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {
                handleEdit(note);
              }}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModel({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModel.isShown}
        onRequestClose={() =>
          setOpenAddEditModel({ ...openAddEditModel, isShown: false })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {},
        }}
        contentLabel=""
        className="w-[45%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditNotes
          type={openAddEditModel.type}
          noteData={openAddEditModel.data}
          onClose={() => {
            setOpenAddEditModel({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMesssage={showToastMesssage}
        />
      </Modal>
      <Toast
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
