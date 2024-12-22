import React, { useState, useEffect } from "react";
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function Item({ item, onClose }) {
  return (
    <div className="container pt-0 ">
      <div className=" pt-0 w-25 h-50 mx-auto d-flex align-items-center vh-100">

      <Card>
        <Card.Img variant="top" src={item.image} className="h-20" />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Card.Text>${item.price}</Card.Text>
          <Button variant="warning" onClick={onClose}>Close</Button>
        </Card.Body>
      </Card>

      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for details
  const [expandedCards, setExpandedCards] = useState({}); // Track expanded state for cards

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(`${err} error occurred`));
  }, []);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      {selectedItem === null ? (
        <div className="row m-auto ">
          {products.map((item) => (
            <Card key={item.id} className="mt-2 col-md-3">
              <Card.Img variant="top" src={item.image} className="h-50" />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {expandedCards[item.id]
                    ? item.description
                    : `${item.description.substring(0, 50)}...`}
                  <span
                    style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedCards[item.id] ? " See Less" : " See More..."}
                  </span>
                </Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => setSelectedItem(item)} // Set selected item for detailed view
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <Item item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;

