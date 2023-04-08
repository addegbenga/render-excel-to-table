import React from "react";

export default function PreviewTable() {
  return (
    <div className=" w-full  rounded-xl">
      <table className="w-full table-auto">
        <thead className="sticky bg-red-200    self-start top-0">
          <tr className="text-left flex w-full">
            {/* <th className="font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
            Song
          </th> */}
            <div className="w-full font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
              <th>Name</th>
            </div>
            <div className="w-full font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
              <th>Price</th>
            </div>
            <div className="w-full font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
              <th>Stock</th>
            </div>
            <div className="w-full font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
              <th>Category</th>
            </div>
            <div className="w-full font-medium min-w-[20rem]  bg-white z-20 p-4  self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40">
              <th>Status</th>
            </div>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
