import React, { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ fetchUser }: { fetchUser: Function }) {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);

    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    console.log(formData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const resp = await axios.post("api/login", formData);
    localStorage.setItem("token", resp.data.token);
    console.log("working?", resp);

    fetchUser();

    navigate("/movements");
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name={"email"}
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name={"password"}
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
          <button className="button">Login</button>
        </form>
      </div>
    </div>
  );
}
