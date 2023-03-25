import { useState } from "react";
import * as XLSX from "xlsx";
import { IStepProps, stepType } from "./types";

export function MultipleSheetView<T>({ props, setSharedState }: IStepProps<T>) {
  const handleNext = () => {
    setSharedState({
      ...props,
      step: stepType.stepTwo,
      stepsCompleted: [...props.stepsCompleted, stepType.stepOne],
    });
  };
  return (
    <div className="w-full flex  flex-col mt-[10rem]   justify-center items-center ">
      <h1 className="text-3xl font-semibold">Select the sheet to use</h1>
      <div className="mt-5 flex flex-col gap-2">
        {Object.keys(props.multipleSheet).map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() =>
                setSharedState({ ...props, selectedSheetIndex: idx })
              }
              className="flex cursor-pointer items-center gap-1"
            >
              <div
                className={`${
                  props.selectedSheetIndex === idx
                    ? "border-blue-500 border-[4px]"
                    : ""
                }  h-4 w-4 flex-shrink-0 flex-grow-0 rounded-full  border-2`}
              ></div>
              <p className="mt-1">{item}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleNext()}
        className="bg-blue-500 fixed bottom-14 text-white w-[18rem] p-3 rounded-md"
      >
        Next
      </button>
    </div>
  );
}
