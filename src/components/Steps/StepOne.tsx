import * as XLSX from "xlsx";
import { MultipleSheetView } from "./MultipleSheet";

import { IStepProps, stepType } from "./types";

export default function StepOne<T>({
  props,
  setSharedState,
}: Omit<IStepProps<T>, "handleGetStateValues">) {
  function handleExcelFileChange(event: any) {
    const file = event.target.files[0];

    // props.setFile(file);
    // Use FileReader to read the file
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    // When FileReader finishes reading the file, parse the Excel data
    fileReader.onload = () => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);

      /* DO SOMETHING WITH workbook HERE */
      const workbook = XLSX.read(data);
      const length = Object.keys(workbook.Sheets).length;
      if (length > 1) {
        // setMultipleSheet(workbook.Sheets);

        return [
          setSharedState({
            ...props,
            multipleSheet: workbook.Sheets,
            filedata: file,
          }),
        ];
      } else {
        const workSheet = workbook.Sheets[workbook.SheetNames[0]];

        console.log(workSheet, "lll");
        const jsa = XLSX.utils.sheet_to_json(workSheet);

        setSharedState({
          ...props,
          sheetData: jsa,
          filedata: file,
          step: stepType.stepTwo,
          stepsCompleted: [...props.stepsCompleted, stepType.stepOne],
        });
        // setSheetData(jsa);
        console.log(jsa);
      }
    };
  }

  return (
    <>
      {Object.keys(props.multipleSheet).length === 0 ? (
        <div className="bg-white mt-10 px-4">
          <h1 className="text-3xl font-medium">Upload a file</h1>
          <div className="mt-7">
            <h2 className="text-2xl">Data that we expect:</h2>
            <p className="text-lg text-gray-500 ">
              (You will have a chance to rename or remove columns in next steps)
            </p>
          </div>

          <div className="h-[30rem] border-2 mt-16 border-dashed rounded-xl border-blue-600">
            <div className="h-full w-full gap-3 flex justify-center flex-col items-center">
              <p className="font-medium text-gray-600 text-2xl">
                Upload .xlsx, .xls, or csv file
              </p>
              <button className=" w-[10rem] flex justify-center items-center h-[3.5rem] relative bg-blue-600 rounded-lg text-white">
                <input
                  className=" file:mr-4 file:py-2 file:px-12
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-transparent"
                  onChange={(e: any) => handleExcelFileChange(e)}
                  // onDrop={(e) => handleDrop(e)}
                  type="file"
                  placeholder="excel"
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <MultipleSheetView props={props} setSharedState={setSharedState} />
      )}
    </>
  );
}
