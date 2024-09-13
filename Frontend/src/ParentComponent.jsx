import { useState } from "react";
import App from "./App";
import Data from "./Data";

function ParentComponent() {
  const [data, setData] = useState([]);

  const addData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <div>
      <App addData={addData} />
      <Data data={data} />
    </div>
  );
}

export default ParentComponent;
