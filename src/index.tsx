import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { StepOneView } from "./components";
import { IAddColumnsProps } from "./components/Table/types";
import { stepType } from "./components/Steps/types";
import StepTwo from "./components/Steps/StepTwo";
import StepLayout from "./components/Steps/StepLayout";
import StepThree from "./components/Steps/StepThree";

export function IndexView() {
  const [sharedState, setSharedState] = useState({
    addColumnValue: "",
    selectedColumn: "",
    columnData: "",
    excelFile: {},
    isAddColumnData: false,
    sheetData: [] as any,
    multipleSheet: {},
    filedata: {},
    selectedSheetIndex: 0,
    stepsCompleted: [],
    step: 0,
  });
  const [addColumnValue, setAddColumnValue] = useState("");
  const [multipleSheet, setMultipleSheet] = useState<any>({});
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [columnData, setColumnData] = useState<string>("");
  const columnDataTOArray = columnData.split(",");
  const [excelFile, setFile] = useState<any>();

  const [isAddColumnData, setIsAddColumnData] = useState<boolean>(false);
  const rerender = React.useReducer(() => ({}), {})[1];
  const [sheetData, setSheetData] = useState<any>([]);
  const selectedColumnLength = selectedColumn.length > 0 ? true : false;
  function handleDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    var f = e.dataTransfer.files[0];
    setFile(f);
    /* f is a File */
    var reader = new FileReader();
    reader.onload = function (e: any) {
      const data = e.target.result;
      /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */

      /* DO SOMETHING WITH workbook HERE */
      const workbook = XLSX.read(data);
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsa = XLSX.utils.sheet_to_json(workSheet);
      console.log(jsa);
      setSheetData(jsa);
    };
    reader.readAsArrayBuffer(f);
  }

  const handleAddMoreColumns = ({ columnName }: IAddColumnsProps) => {
    if (addColumnValue === "") {
      return;
    }
    let dummy: any = [];
    sheetData.map((item: any, idx: string | number) => {
      dummy[idx] = { ...item, [columnName]: "" };
      return dummy;
    });
    return setSheetData(dummy);
  };

  const handleSelectColumn = (value: any) => {
    !selectedColumnLength
      ? setSelectedColumn(value?.id)
      : setSelectedColumn("");
  };

  return (
    // <div className="  pt-5 px-3 mx-auto">
    //   <div className="flex items-center mb-10 border-b pb-3 justify-between">
    //     <div>
    //       <h1 className="text-2xl ">Excel Renderer</h1>
    //       <div>
    //         <p>
    //           Simple utilty to render excel data on a table with the ability to
    //           add more columns, kindly upload a csv or XLSX file for the table
    //           to render.
    //         </p>
    //         <span className="text-blue-500 italic">
    //           Click on any of the column header to change the cell display type
    //           to a select input.
    //         </span>
    //       </div>
    //     </div>

    //     <div className="flex max-w-4xl w-full gap-10">
    //       {isAddColumnData && (
    //         <div className="w-full ">
    //           <div className=" w-full flex-col  gap-2 flex">
    //             <label className="text-gray-400">
    //               Add column select dropdown:
    //             </label>
    //             <div className="flex h-14 border">
    //               <input
    //                 onChange={(e) => setColumnData(e.target.value)}
    //                 className=" p-2 px-4 w-full focus:outline-none  placeholder:font-thin"
    //                 placeholder="Text should be separated with commas"
    //                 value={columnData}
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //       <div className="flex-col   w-full  gap-2 flex">
    //         <label className="text-gray-400">Add more columns:</label>
    //         <div className="flex h-14 border">
    //           <input
    //             onChange={(e) => setAddColumnValue(e.target.value)}
    //             className=" p-2 px-4 focus:outline-none w-full placeholder:font-thin"
    //             placeholder="Add text here"
    //             value={addColumnValue}
    //           />
    //           <button
    //             onClick={() => [
    //               handleAddMoreColumns({ columnName: addColumnValue }),
    //               rerender(),
    //             ]}
    //             className="bg-gray-100 outline-none h-full text-black text-lg -ml-13  w-fit   px-5 rounded"
    //           >
    //             +
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <input
    //       onChange={(e: any) => handleExcelFileChange(e)}
    //       onDrop={(e) => handleDrop(e)}
    //       type="file"
    //       placeholder="excel"
    //     />
    //   </div>
    //   {selectedColumnLength && (
    //     <div className="bg-gray-100 border relative mt-2 items-center flex  justify-between p-3 rounded">
    //       <p>
    //         You just selected{" "}
    //         <span className="font-semibold italic">
    //           {selectedColumn} Column
    //         </span>{" "}
    //         click on the button to add your own drop down data for the selected
    //         column.
    //       </p>
    //       <button
    //         onClick={() => setIsAddColumnData(true)}
    //         className="bg-slate-500 text-white rounded px-10 py-2"
    //       >
    //         Add data
    //       </button>
    //       <button
    //         onClick={() => setSelectedColumn("")}
    //         className="absolute  -top-5 bg-black  text-white h-6 w-6 flex items-center justify-center rounded-full -right-1"
    //       >
    //         <span className="text-sm">X</span>
    //       </button>
    //     </div>
    //   )}
    //   {Object.keys(multipleSheet).length > 1 && (
    //     <div className="my-5">
    //       <h1 className="text-xl">
    //         This File contains multiple Sheets select a sheet to render
    //       </h1>
    //       <div>
    //         {Object.keys(multipleSheet).map((item, idx) => {
    //           return (
    //             <ul key={idx} className="list-disc cursor-pointer ml-4">
    //               <li onClick={() => handleRenderExcel(idx)}>{item}</li>
    //             </ul>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    //   <div>
    //     {sheetData.length > 0 && (
    //       <div className="overflow-x-auto ">
    //         <Table
    //           dataSelect={columnDataTOArray}
    //           selectedColumn={selectedColumn}
    //           handleSelectColumn={handleSelectColumn}
    //           makeSelectedColumnCellsADropDown={{ istrue: true, key: "" }}
    //           StateData={sheetData}
    //           dynamicColumn={dynamicColumn}
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="overflow-y-hidden">
      <StepLayout setSharedState={setSharedState} props={sharedState}>
        <section className="">
          {sharedState.step === stepType.stepOne && (
            <StepOneView setSharedState={setSharedState} props={sharedState} />
          )}
          {sharedState.step === stepType.stepTwo && (
            <StepTwo setSharedState={setSharedState} props={sharedState} />
          )}
          {sharedState.step === stepType.stepThree && (
            <StepThree setSharedState={setSharedState} props={sharedState} />
          )}
        </section>
      </StepLayout>
    </div>
  );
}
