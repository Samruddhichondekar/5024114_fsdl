import { useState } from "react";

function UserForm({ title }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hello " + name);
  };

  return (
    <div>
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;