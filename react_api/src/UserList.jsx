import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const UserList = () => {
  const [listOfUser, setListOfUser] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {listOfUser.map((user) => (
        <Card
          key={user.id}
          style={{
            width: "18rem",
            margin: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email} <br />
              <strong>Username:</strong> {user.username} <br />
              <strong>Website:</strong> {user.website}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
