import { useEffect, useState } from "react";
import "./Data.css";
import axios from "axios";

export default function Data({ data }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:6060/data");
        const fetchedData = response.data;
        const sortedData = fetchedData.sort((a, b) => a.time - b.time); // Sort data before setting state
        setSortedData(sortedData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data, handleDelete]);

  async function handleDelete(id) {
    const res = await axios.delete(`http://localhost:6060/data/${id}`);
  }

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Id</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.time}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
