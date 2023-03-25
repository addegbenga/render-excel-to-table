import React, { useEffect } from "react";
import { IStepProps, stepType } from "./types";
import * as XLSX from "xlsx";
import MyTable from "../Table/main";
import { dynamicColumn } from "../Table/TableColumn";

export default function StepTwo<T>({ props, setSharedState }: IStepProps<T>) {
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
      setSharedState({ ...props, sheetData: jsa });
      // setSheetData(jsa);
    };
  };
  useEffect(() => {
    handleRenderExcel(props.selectedSheetIndex);
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-medium my-7">Header Row</h1>
        {props.sheetData.length > 0 && (
          <div className="overflow-x-auto ">
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
    </>
  );
}
