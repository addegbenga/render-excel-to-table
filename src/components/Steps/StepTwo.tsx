import React, { useEffect } from "react";
import { IStepProps, stepType } from "./types";
import * as XLSX from "xlsx";
import MyTable from "../Table/main";
import { dynamicColumn } from "../Table/TableColumn";
import { handleSelectColumn } from "../../utils";

export default function StepTwo<T>({
  props,
  setSharedState,
  acceptedHeader,
  handleGetStateValues,
}: IStepProps<T> & { acceptedHeader: Object }) {
  const handleRenderExcel = (selectedSheetIdx: number) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(props.filedata as any);
    // When FileReader finishes reading the file, parse the Excel data
    fileReader.onload = () => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);
      /* DO SOMETHING WITH workbook HERE */
      const workbook = XLSX.read(data);

      const workSheet = workbook.Sheets[workbook.SheetNames[selectedSheetIdx]];
      const jsa = XLSX.utils.sheet_to_json(workSheet);
      const keys = jsa[0] as Object;
      let temp: any = [];
      Object.keys(acceptedHeader).map((item, idx) => {
        if (item !== Object.keys(keys)[idx]) {
          temp = [...temp, item];
        }
      });
      setSharedState({ ...props, sheetData: jsa, errors: temp });
      handleGetStateValues(props);
    };
  };
  useEffect(() => {
    handleRenderExcel(props.selectedSheetIndex);
  }, []);

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
        <h1 className="text-3xl font-medium mt-[6rem] mb-6">Excel Sheet</h1>
        {props.sheetData.length > 0 && (
          <div className=" max-h-[77vh] snap-x   border overflow-x-auto ">
            <MyTable
              dataSelect={["hello"]}
              selectedColumn={"home"}
              setStateValues={setSharedState}
              handleSelectColumn={(item) => {
                [
                  setSharedState({
                    ...props,
                    selectedColumn: !props.selectedColumn ? item : "",
                  }),
                  console.log(item),
                ];
              }}
              makeSelectedColumnCellsADropDown={{ istrue: true, key: "" }}
              StateData={props}
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
