import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from "./components/Table/main";

type IAddColumnsProps = {
  columnName: string;
};
export default function App() {
  const [addColumnValue, setAddColumnValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const rerender = React.useReducer(() => ({}), {})[1];
  const [sheetData, setSheetData] = useState<any>([]);
  const selectedColumnLength = selectedColumn.length > 0 ? true : false;
  function handleDrop(e: any) {
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    var f = e.dataTransfer.files[0];
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
  function handleExcelFileChange(event: any) {
    const file = event.target.files[0];

    // Use FileReader to read the file
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    // When FileReader finishes reading the file, parse the Excel data
    fileReader.onload = () => {
      const arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);

      /* DO SOMETHING WITH workbook HERE */
      const workbook = XLSX.read(data);
      const workSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsa = XLSX.utils.sheet_to_json(workSheet);
      console.log(jsa);
      setSheetData(jsa);
    };
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
  const handleDeleteColumn = () => {};

  const handleSelectColumn = (value: any) => {
    !selectedColumnLength
      ? setSelectedColumn(value?.id)
      : setSelectedColumn("");
  };

  return (
    <div className="  pt-5 px-3 mx-auto">
      <div className="flex items-center mb-10 border-b pb-3 justify-between">
        <div>
          <h1 className="text-2xl ">Excel Renderer</h1>
          <p>
            Simple utilty to render excel data on a table with the ability to
            add more columns.
          </p>
        </div>
        <div className="max-w-sm w-full flex-col  gap-2 flex">
          <label className="text-gray-400">Add more columns:</label>
          <div className="flex h-14 border">
            <input
              onChange={(e) => setAddColumnValue(e.target.value)}
              className=" p-2 px-4 focus:outline-none w-full placeholder:font-thin"
              placeholder="Add text here"
              value={addColumnValue}
            />
            <button
              onClick={() => [
                handleAddMoreColumns({ columnName: addColumnValue }),
                rerender(),
              ]}
              className="bg-gray-100 outline-none h-full text-black text-lg -ml-13  w-fit   px-5 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div>
        <input
          onChange={(e: any) => handleExcelFileChange(e)}
          onDrop={(e) => handleDrop(e)}
          type="file"
          placeholder="excel"
        />
      </div>
      <div>
        {sheetData.length > 0 && (
          <Table
            selectedColumn={selectedColumn}
            handleSelectColumn={handleSelectColumn}
            makeSelectedColumnCellsADropDown={{ istrue: true, key: "" }}
            StateData={sheetData}
            dynamicColumn={dynamicColumn}
          />
        )}
      </div>
    </div>
  );
}

export type Person = {
  Name: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

interface IdynamicColumnProps {
  data: any;
  selectedColumn: string;
  makeSelectedColumnCellsADropDown: {
    istrue: boolean;
    key: string;
  };
}

const dataSelect = [
  {
    name: "Food",
    id: 1,
  },
  {
    name: "Drinks",
    id: 1,
  },
  {
    name: "Beverages",
    id: 1,
  },
  {
    name: "Gums",
    id: 1,
  },
  {
    name: "Seafoods",
    id: 1,
  },
  {
    name: "Crunches",
    id: 1,
  },
];

function dynamicColumn({
  data,
  selectedColumn,
  makeSelectedColumnCellsADropDown,
}: IdynamicColumnProps) {
  const columnHelper = createColumnHelper<Person>();
  const column = Object.keys(data[0]).map((item, idx) => {
    return columnHelper.accessor((row: any) => row[item], {
      id: item,
      header: () => (
        <div className="font-medium flex justify-between p-3 truncate  w-full   text-[#0A172A] text-opacity-40">
          {item}
          <button>X</button>
        </div>
      ),
      footer: (info) => info.column.id,
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue);

        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          table.options.meta?.updateData(index, id, value);
        };

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <>
            {item === selectedColumn ? (
              makeSelectedColumnCellsADropDown.istrue ? (
                <div>
                  <select
                    className="w-full"
                    onChange={(e) => setValue(e.target.value)}
                    name="cars"
                    id="cars"
                    value={value as string}
                    onBlur={() => onBlur()}
                  >
                    {dataSelect.map((item, idx) => (
                      <option value={item.name} key={idx}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  className="w-full px-2"
                  value={value as string}
                  onChange={(e) => [setValue(e.target.value)]}
                  onBlur={() => onBlur()}
                />
              )
            ) : (
              <input
                className="w-full px-2"
                value={value as string}
                onChange={(e) => [setValue(e.target.value)]}
                onBlur={() => onBlur()}
              />
            )}
          </>
        );
      },
    });
  });
  return column;
}
