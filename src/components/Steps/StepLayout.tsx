import { IStepProps } from "./types";

interface IStepLayoutProps {
  children: React.ReactNode;
}

type ILayoutPropsExtend<T> = IStepLayoutProps & IStepProps<T>;

const data = [
  "Upload File",
  "Select Header Row",
  "Column Matching",
  "Validate data",
];

export default function StepLayout<T>({
  props,
  children,
}: ILayoutPropsExtend<T>) {
  return (
    <section className="bg-white w-full h-full">
      <div className=" bg-slate-200 flex p-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex gap-2 w-full items-center">
            <div
              className={` ${
                props.stepsCompleted.includes(idx)
                  ? "bg-blue-600 border-white text-white"
                  : "text-blue-600 "
              } w-14 flex-shrink-0 flex-grow-0 border-blue-700 border-2 bg-white shadow h-14 rounded-full flex items-center  text-center justify-center`}
            >
              {props.stepsCompleted.includes(idx) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                idx + 1
              )}
            </div>
            <div className="flex gap-1 w-full items-center">
              <p className="w-fit text-gray-600 flex-shrink-0 flex-grow-0">
                {item}
              </p>
              <div
                className={`${
                  props.stepsCompleted.includes(idx) ? "bg-blue-600" : ""
                } h-[2px] w-full bg-white`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
}
