import React, { useEffect } from "react";
import { IStepProps, stepType } from "./types";

import MyTable from "../Table/main";
import { dynamicColumn } from "../Table/TableColumn";

export default function StepThree<T>({ props, setSharedState }: IStepProps<T>) {
  const handleNext = () => {
    setSharedState({
      ...props,
      step: stepType.stepThree,
      stepsCompleted: [...props.stepsCompleted, stepType.stepTwo],
    });
  };

  return (
    <>
      <div className="px-4 p-4">
        <h1 className="text-3xl font-medium mt-[6rem] mb-6">Column Matching</h1>
        {props.sheetData.length > 0 && (
          <div className=" max-h-[77vh] snap-x   border overflow-x-auto ">
            <MyTable
              dataSelect={["hello"]}
              selectedColumn={"home"}
              handleSelectColumn={() => console.log("ll")}
              makeSelectedColumnCellsADropDown={{ istrue: true, key: "" }}
              StateData={props.sheetData}
              dynamicColumn={dynamicColumn}
            />
          </div>
        )}
      </div>
      <div className="bg-slate-300 flex items-center justify-center fixed h-[6rem] bottom-0 w-full">
        <button
          onClick={() => handleNext()}
          className="bg-blue-700 text-white p-4 w-[20rem] rounded-md"
        >
          Continue
        </button>
      </div>
    </>
  );
}
