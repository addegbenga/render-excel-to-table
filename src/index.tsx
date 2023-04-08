import { ReactExcelViewer } from "./components";

export const allowedHeader = {
  name: "name",
  description: "description",
  status: "status",
  product: "product",
  price: "price",
};

const dropDownSelect = [
  {
    name: "FOod",
    id: 1,
  },
  {
    name: "Groceries",
    id: 2,
  },
  {
    name: "Snacks",
    id: 3,
  },
];

export function IndexView() {
  return (
    <ReactExcelViewer
      handleGetStateValues={(prop) => console.log(prop, "propss")}
      allowedHeader={allowedHeader}
      dropDownSelect={dropDownSelect}
    />
  );
}
