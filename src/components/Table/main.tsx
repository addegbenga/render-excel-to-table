import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { IStateTypes, IStepProps } from "../Steps/types";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export interface ITableProps {
  dynamicColumn: ({ data, editable }: any) => any;
  expectedHeader?: Object;
  selectedColumn: string;
  setStateValues: React.Dispatch<React.SetStateAction<IStateTypes>>;
  dataSelect: any;
  StateData: IStateTypes;
  handleSelectColumn: (value: any) => void;
  makeSelectedColumnCellsADropDown: {
    istrue: boolean;
    key: string;
  };
}

export default function MyTable({
  dynamicColumn,
  StateData,
  handleSelectColumn,
  dataSelect,
  selectedColumn,
  makeSelectedColumnCellsADropDown,
  expectedHeader,
  setStateValues,
}: ITableProps) {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: StateData.sheetData,
    columns: dynamicColumn({
      StateData: StateData,
      selectedColumn: selectedColumn,
      makeSelectedColumnCellsADropDown,
      dataSelect: dataSelect,
      handleSelectColumn: handleSelectColumn,
      expectedHeader: expectedHeader,
    }),
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setStateValues({
          ...StateData,
          sheetData: [
            ...StateData.sheetData.map((row: any, index: any) => {
              if (index === rowIndex) {
                return {
                  ...StateData.sheetData[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            }),
          ],
        });
      },
    },
    debugTable: true,
  });

  return (
    <div className=" w-full  rounded-xl">
      <table className=" w-full table-auto ">
        <thead className="sticky   self-start top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              onClick={(e) => console.log(e)}
              className="text-left w-full   "
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="border border-l-0 border-t-0"
                    onClick={(e) => handleSelectColumn(header)}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className="px-3 py-3 border-x border-b  truncate w-full text-ellipsis"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
