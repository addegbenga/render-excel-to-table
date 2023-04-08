import React, { useState } from "react";
import { StepOneView } from ".";
import { IIndexTypes, stepType } from "./Steps/types";
import StepTwo from "./Steps/StepTwo";
import StepLayout from "./Steps/StepLayout";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";

export default function IndexView({
  allowedHeader,
  dropDownSelect,
  handleGetStateValues,
}: IIndexTypes) {
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
    errors: [],
    columnName: "",
  });

  return (
    <div className="overflow-y-hidden">
      <StepLayout setSharedState={setSharedState} props={sharedState}>
        <section className="">
          {sharedState.step === stepType.stepOne && (
            <StepOneView setSharedState={setSharedState} props={sharedState} />
          )}
          {sharedState.step === stepType.stepTwo && (
            <StepTwo
              handleGetStateValues={(prop) =>
                handleGetStateValues && handleGetStateValues(prop)
              }
              acceptedHeader={allowedHeader}
              setSharedState={setSharedState}
              props={sharedState}
            />
          )}
          {sharedState.step === stepType.stepThree && (
            <StepThree
              handleGetStateValues={(prop) =>
                handleGetStateValues && handleGetStateValues(prop)
              }
              setSharedState={setSharedState}
              dataSelect={dropDownSelect}
              props={sharedState}
              acceptedHeader={allowedHeader}
              headerValidation={true}
            />
          )}
          {sharedState.step === stepType.stepFour && (
            <StepFour
              handleGetStateValues={(prop) =>
                handleGetStateValues && handleGetStateValues(prop)
              }
              setSharedState={setSharedState}
              dataSelect={dropDownSelect}
              props={sharedState}
              acceptedHeader={allowedHeader}
              headerValidation={true}
            />
          )}
        </section>
      </StepLayout>
    </div>
  );
}

// function handleDrop(e: any) {
//   e.stopPropagation();
//   e.preventDefault();
//   var f = e.dataTransfer.files[0];
//   setFile(f);
//   /* f is a File */
//   var reader = new FileReader();
//   reader.onload = function (e: any) {
//     const data = e.target.result;
//     /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */

//     /* DO SOMETHING WITH workbook HERE */
//     const workbook = XLSX.read(data);
//     const workSheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsa = XLSX.utils.sheet_to_json(workSheet);
//     console.log(jsa);
//     setSheetData(jsa);
//   };
//   reader.readAsArrayBuffer(f);
// }

// const handleAddMoreColumns = ({ columnName }: IAddColumnsProps) => {
//   if (addColumnValue === "") {
//     return;
//   }
//   let dummy: any = [];
//   sheetData.map((item: any, idx: string | number) => {
//     dummy[idx] = { ...item, [columnName]: "" };
//     return dummy;
//   });
//   return setSheetData(dummy);
// };

// const handleSelectColumn = (value: any) => {
//   !selectedColumnLength
//     ? setSelectedColumn(value?.id)
//     : setSelectedColumn("");
// };
