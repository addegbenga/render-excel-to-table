import { IStepProps, stepType } from "./types";
import MyTable from "../Table/main";
import { dynamicColumn } from "../Table/TableColumn";
import { allowedHeader } from "../..";
import { handleAddMoreColumns } from "../../utils";

export default function StepFour<T>({
  props,
  setSharedState,
  headerValidation,
  dataSelect,
  acceptedHeader,
  handleGetStateValues,
}: IStepProps<T> & {
  headerValidation: boolean;
  acceptedHeader: Object;
  dataSelect: any;
}) {
  const handleNext = () => {
    setSharedState({
      ...props,
      //   step: stepType.stepThree,
      //   stepsCompleted: [...props.stepsCompleted, stepType.stepTwo],
    });
    handleGetStateValues(props);
  };

  return (
    <>
      <div className="px-4 p-4 w-full">
        <div className="flex items-center mt-[6rem] mb-6 justify-between">
          <div>
            <h1 className="text-3xl font-medium ">Add Columns</h1>
            <p className="text-sm text-gray-500">
              The selected item will be used as a header for matching columns.
            </p>
          </div>
          <div className="flex gap-1 ">
            <input
              onChange={(e) =>
                setSharedState({ ...props, columnName: e.target.value })
              }
              type="text"
              className="border p-2 w-[20rem]"
              placeholder="Add column"
            />
            <button
              onClick={(prop) => {
                const result = handleAddMoreColumns({
                  columnName: props.columnName,
                  stateValue: props.columnName,
                  tableData: props.sheetData,
                });

                setSharedState({ ...props, sheetData: result });
              }}
              className="bg-blue-500 text-white p-2 text-sm rounded"
            >
              Add Columns
            </button>
          </div>
        </div>

        {props.sheetData.length > 0 && (
          <div className=" w-full  ">
            {headerValidation && (
              <div className=" snap-x  overflow-x-auto  ">
                <h1 className="text-slate-600">
                  Expected Column Header NB:(The defined column header must
                  match before you can proceed)
                </h1>
                <div className={`flex w-full gap-1`}>
                  {Object.keys(acceptedHeader).map((item, idx) => (
                    <div
                      className=" flex-shrink-0 flex-grow w-[20rem] bg-slate-100  p-4"
                      key={idx + "shs"}
                    >
                      <p className="text-slate-600">
                        {`Col-${idx + 1}: `}
                        <span className=" uppercase">{item}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className=" max-h-[77vh] snap-x mt-1   border overflow-x-auto ">
              <MyTable
                expectedHeader={allowedHeader}
                dataSelect={dataSelect}
                selectedColumn={props.selectedColumn}
                handleSelectColumn={(item) => {
                  [
                    setSharedState({
                      ...props,
                      selectedColumn: !props.selectedColumn ? item.id : "",
                    }),
                  ];
                }}
                setStateValues={setSharedState}
                makeSelectedColumnCellsADropDown={{ istrue: true, key: "" }}
                StateData={props}
                dynamicColumn={dynamicColumn}
              />
            </div>
          </div>
        )}
      </div>
      <div className="bg-slate-300 flex items-center justify-center fixed h-[6rem] bottom-0 w-full">
        {props.errors.length !== 0 ? (
          <button
            // onClick={() => handleNext()}
            className="bg-red-600 text-white p-4 w-[20rem] rounded-md"
          >
            Fix error to continue
          </button>
        ) : (
          <button
            onClick={() => handleNext()}
            className="bg-blue-700 text-white p-4 w-[20rem] rounded-md"
          >
            Continue
          </button>
        )}
      </div>
    </>
  );
}
