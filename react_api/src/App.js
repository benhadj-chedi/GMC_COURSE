import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./UserList";

const App = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>User List</h1>
      <UserList />
    </div>
  );
};

export default App;
