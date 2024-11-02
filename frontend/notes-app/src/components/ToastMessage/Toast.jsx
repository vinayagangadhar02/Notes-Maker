// import React from "react";
// import { LuCheck } from "react-icons/lu";
// import {MdDeleteOutline} from "react-icons/md"
// import { useEffect } from "react";

// const Toast = ({ isShown, message, type, onClose }) => {
//   useEffect(()=>{
//     const timeoutId=setTimeout(()=>{
//     onClose()

//   },3000)
// return()=>{
// clearTimeout(timeoutId)
// }
//   },[onClose])

//   return (
//     <div className={`absolute top-20 right-6 transition-all duration-400
//       ${isShown?"opacity-100":"opacity-0"}`}>
//     <div
//       className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
//         type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
//       }after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
//     >
//       <div className="flex items-center gap-3 py-2 px-4">
//         <div
//           className={`w-10 h-10 flex items-center justify-center rounded-full ${
//             type === "delete" ? "bg-red-50" : "bg-green-50"
//           }`}
//         >
//          {type==="delete" ? (<MdDeleteOutline className="text-xl text-red-500" />):
//          (<LuCheck className="text-xl text-green-500" />
//   )}
//         </div>
//         <p className="text-sm text-slate-800">{message}</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Toast;
import React, { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    if (isShown) {
      setRightPosition(0); // Reset right position when the toast is shown
      const intervalId = setInterval(() => {
        setRightPosition((prev) => {
          if (prev >= 100) {
            clearInterval(intervalId);
            return 100; // Prevents exceeding 100%
          }
          return prev + (100 / 30); // Increase the right position over 3 seconds
        });
      }, 100); // Update right position every 100ms

      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ${
        isShown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="min-w-52 bg-white border shadow-2xl rounded-md relative flex items-center overflow-hidden">
        {/* Green or red line on the left */}
        <div
          className={`w-[5px] h-full absolute left-0 top-0 rounded-l-md ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
        ></div>

        {/* Icon and message content */}
        <div className="flex items-center gap-3 py-2 px-4 pl-6">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className="text-sm text-slate-800">{message}</p>
        </div>

        {/* Timer bar at the bottom, decreasing from right to left */}
        <div
          className={`absolute bottom-0 right-0 h-[4px] ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{
            right: `${rightPosition}%`,
            width: '100%',
            transition: "right 0.1s linear",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
