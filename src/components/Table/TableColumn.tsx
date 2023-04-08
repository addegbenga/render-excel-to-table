import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { ITableProps } from "./main";
import { Person } from "./types";

type IColumnExtendedTypes = Omit<ITableProps, "dynamicColumn">;

export function dynamicColumn({
  StateData,
  selectedColumn,
  makeSelectedColumnCellsADropDown,
  dataSelect,
  expectedHeader,
  handleSelectColumn,
}: IColumnExtendedTypes) {
  const columnHelper = createColumnHelper<Person>();
  const column = Object.keys(StateData.sheetData[0]).map((item, idx) => {
    return columnHelper.accessor((row: any) => row[item], {
      id: item,
      header: () => (
        <div
          onClick={() => handleSelectColumn(item)}
          className="font-medium  min-w-[30rem]  bg-white  z-20 p-4 sticky top-0 self-start  cursor-pointer flex justify-between  truncate    text-[#0A172A] text-opacity-40"
        >
          {expectedHeader && Object.keys(expectedHeader)[idx] !== item ? (
            <p className="grid">
              {item}
              {Object.keys(expectedHeader)[idx] ? (
                <span className="text-red-500 tracking-wide  text-sm">
                  Error: Header should be titled {}
                  <span className="uppercase underline">
                    {Object.keys(expectedHeader)[idx]}
                  </span>
                </span>
              ) : (
                <span className=" text-orange-400 tracking-wide  text-sm">
                  Warning: This column is not specified {}
                  <span className="uppercase underline">
                    {Object.keys(expectedHeader)[idx]}
                  </span>
                </span>
              )}
            </p>
          ) : (
            <span>{item}</span>
          )}
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
                    onChange={(e) => [
                      setValue(e.target.value),
                      console.log(e.target.value),
                    ]}
                    name="cars"
                    id="cars"
                    value={value as string}
                    onBlur={() => onBlur()}
                  >
                    {dataSelect.map(
                      (item: any, idx: React.Key | null | undefined) => (
                        <option value={item.id} key={idx}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              ) : (
                <input
                  accept=".csv,.xlsx"
                  className="w-full px-2"
                  value={value as string}
                  onChange={(e) => [setValue(e.target.value)]}
                  onBlur={() => onBlur()}
                />
              )
            ) : (
              <input
                className="w-full px-2"
                accept=".csv,.xlsx"
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
