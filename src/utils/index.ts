interface IhandleSelectColumnProps {
  stateValue: string;
  stateSetter: React.Dispatch<React.SetStateAction<{}>>;
  value: {
    id: number;
  };
}

/**
 * This function handles column selection
 * @param stateValue this represent the react state value
 * @param setStateAction this represent the react state setter value
 * @param value  this represent the id of the selected column
 */
export const handleSelectColumn = ({
  stateValue,
  stateSetter,
  value,
}: IhandleSelectColumnProps) => {
  !stateValue ? stateSetter(value?.id) : stateSetter("");
};

interface IhandleAddMoreColumnProps<T> {
  stateValue: string;
  columnName: string;
  tableData: T[];
  stateSetter: React.Dispatch<React.SetStateAction<{}>>;
}

export function handleAddMoreColumns<T>({
  stateSetter,
  stateValue,
  tableData,
  columnName,
}: IhandleAddMoreColumnProps<T>) {
  if (stateValue === "") {
    return;
  }
  let dummy: any = [];
  tableData?.map((item, idx: string | number) => {
    dummy[idx] = { ...item, [columnName]: "" };
    return dummy;
  });
  return stateSetter(dummy);
}
