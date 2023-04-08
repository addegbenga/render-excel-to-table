export interface IStepProps<T> {
  setSharedState: React.Dispatch<React.SetStateAction<any>>;
  handleGetStateValues: (item: any) => void;
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
    errors: string[];
    columnName: string;
  };
}
export interface IStateTypes {
  addColumnValue: string;
  selectedColumn: string;
  columnData: string;
  excelFile: Object;
  isAddColumnData: boolean;
  selectedSheetIndex: number;
  sheetData: any;
  multipleSheet: Object;
  filedata: Object;
  stepsCompleted: number[];
  step: stepType;
  errors: string[];
  columnName: string;
}

export enum stepType {
  "stepOne" = 0,
  "stepTwo" = 1,
  "stepThree" = 2,
  "stepFour" = 3,
  "stepFive" = 4,
}

export interface IIndexTypes {
  /**
   * This type is use for validation purpose
   */
  allowedHeader: Object;
  /**
   * This is use to populate dropdown input box
   */
  dropDownSelect?: string[] | any;
  handleGetStateValues?: (item: any) => void;
}
