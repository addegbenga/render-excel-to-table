import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { Person } from "./makeData";

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

interface ITableProps {
  dynamicColumn: ({ data, editable }: any) => any;
  selectedColumn: string;
  dataSelect: any;
  StateData: any;
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
}: ITableProps) {
  const [data, setData] = React.useState(() => StateData);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns: dynamicColumn({
      data: StateData,
      selectedColumn: selectedColumn,
      makeSelectedColumnCellsADropDown,
      dataSelect: dataSelect,
    }),
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old: any[]) =>
          old.map((row: any, index: number) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }

            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="w-full bg-white  ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              onClick={(e) => console.log(e)}
              className="text-left truncate text-ellipsis overflow-x-auto"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    onClick={(e) => handleSelectColumn(header)}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
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
