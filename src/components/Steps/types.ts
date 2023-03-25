export interface IStepProps<T> {
  setSharedState: React.Dispatch<React.SetStateAction<any>>;
  props: {
    addColumnValue: string;
    selectedColumn: string;
    columnData: string;
    excelFile: Object;
    isAddColumnData: boolean;
    selectedSheetIndex: number;
    sheetData: T[];
    multipleSheet: Object;
    filedata: Object;
    stepsCompleted: number[];
    step: stepType;
  };
}

export enum stepType {
  "stepOne" = 0,
  "stepTwo" = 1,
  "stepThree" = 2,
  "stepFour" = 3,
}
