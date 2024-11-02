import React from 'react';
import img1 from "../../assets/Empty-Note.svg";
import img2 from "../../assets/No-Search.svg";

const EmptyCard = ({ IsSearch,isLight }) => {
  console.log(IsSearch)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
     
      {IsSearch ? (
        // This block executes when `isSearch` is true
        <>
          <div className="flex justify-center mb-6">
            <img src={img2} alt="No Search" className="w-24 h-24 md:w-32 md:h-32 opacity-80 " />
          </div>

          <div className="max-w-md mx-auto p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-gray-800 text-2xl font-semibold mb-3">Oops! No Matches Found</h2>
            <p className="text-gray-600 mb-4">
              It seems we couldn’t find any notes that match your search. <br />
              But don’t worry, you can <span className="font-semibold text-teal-500">create new notes</span> and add your thoughts! 
              Try a different keyword or <span className="font-semibold text-teal-500">explore your notes</span> for inspiration.
            </p>
          </div>
        </>
      ) : (
       
        <>
          <div className="flex justify-center mb-6">
            <img src={img1} alt="Empty Note" className="w-24 h-24 md:w-32 md:h-32 opacity-80" />
          </div>

          <div className="max-w-md mx-auto p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-gray-800 text-2xl font-semibold mb-3">Unleash Your Creativity!</h2>
            <p className="text-gray-600 mb-4">
              You haven’t added any notes yet. <br />
              Click the <span className="font-semibold">'Add'</span> button and start documenting your journey today!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EmptyCard;
