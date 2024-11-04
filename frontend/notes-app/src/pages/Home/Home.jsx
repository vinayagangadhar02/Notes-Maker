import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";

const Home = () => {
  const [openAddEditModel, setOpenAddEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();
  const [IsSearch, setIsSearch] = useState(false);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-note", {
        params: { query },
      });
      if (response?.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/pinned-note/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });
      if (response?.data?.note) {
        if (!noteData.isPinned) showToastMessage("Note Pinned Successfully");
        else showToastMessage("Note Unpinned Successfully");
        await getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = async () => {
    setIsSearch(false);
    await getAllNotes();
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModel({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  const showToastMessage = (message, type) => {
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
      console.log("hello");
      const response = await axiosInstance.get("/get-all-notes");
      if (response?.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Unexpected error has occured.please try again");
    }
  };

  const deleteNote = async (noteData) => {
    try {
      const response = await axiosInstance.delete(
        `/delete-note/${noteData._id}`
      );
      console.log(response)
      if (response?.data?.message) {
        showToastMessage("Note Deleted Successfully", "delete");
        await getAllNotes();
      }
    } catch (error) {
      if (!error?.response?.data?.error) {
        console.log("An unexpected error has occured");
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container mx-auto ">
        {allNotes.length > 0 ? (
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
                onDelete={() => {
                  deleteNote(note);
                }}
                onPinNote={() => {
                  updateIsPinned(note);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard IsSearch={IsSearch} />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-teal-700 absolute right-10 bottom-10"
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
        className="w-[45%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
        appElement={document.getElementById("root")}
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
          showToastMessage={showToastMessage}
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
