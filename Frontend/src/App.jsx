import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App({ addData }) {
  const initialValues = { name: "", id: "", time: "" };
  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setFormError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (Object.keys(formData).length !== 0) {
        try {
          const res = await axios.post("http://localhost:6060/data", formData);
          addData(formData);
          setFormData(initialValues);
        } catch (error) {
          console.error("There was an error submitting the form:", error);
        }
        setFormData(initialValues);
      }
    }
  };

  function validateForm(formData) {
    let error = {};

    if (!formData.name) {
      error.name = "Student Name is Required";
    }
    if (!formData.id) {
      error.id = "Student Id is required";
    }
    if (!formData.time) {
      error.time = "Time taken is Required";
    }
    return error;
  }

  return (
    <div className="form-body">
      <h1>SCORE CARD</h1>
      <form>
        <label htmlFor="student">Student Name: </label>
        <br />
        <input
          type="text"
          required
          placeholder="Student Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>{formError.name}</p>
        <br />
        <label htmlFor="student">Student Id: </label>
        <br />
        <input
          type="text"
          required
          placeholder="Student Id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        <p>{formError.id}</p>
        <br />
        <label htmlFor="student">Time in(sec): </label>
        <br />
        <input
          type="number"
          required
          placeholder="Time taken in Sec"
          name="time"
          value={formData.time}
          onChange={handleChange}
          min={0}
        />
        <p>{formError.time}</p>
        <br />
        <button type="submit" onClick={handleClick}>
          Add Me
        </button>
      </form>
    </div>
  );
}

export default App;
