import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Person } from "./types";

interface IdynamicColumnProps {
  data: any;
  dataSelect: any;
  selectedColumn: string;
  makeSelectedColumnCellsADropDown: {
    istrue: boolean;
    key: string;
  };
}

export function dynamicColumn({
  data,
  selectedColumn,
  makeSelectedColumnCellsADropDown,
  dataSelect,
}: IdynamicColumnProps) {
  const columnHelper = createColumnHelper<Person>();
  const column = Object.keys(data[0]).map((item, idx) => {
    return columnHelper.accessor((row: any) => row[item], {
      id: item,
      header: () => (
        <div className="font-medium w-[29rem] cursor-pointer flex justify-between p-3 truncate    text-[#0A172A] text-opacity-40">
          {item}
          <button className="">X</button>
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
                    {dataSelect.map(
                      (item: any, idx: React.Key | null | undefined) => (
                        <option value={item} key={idx}>
                          {item}
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
