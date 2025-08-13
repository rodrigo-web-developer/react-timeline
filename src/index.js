import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import Timeline from "./components/Timeline/";
import Modal from "./components/Modal/";
import { Scrollable } from "./components/Layout/index.jsx";


const randomColor = () =>
  `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0")}`;

/* I'm crazy about performance, so I need to check if many items on the screen will affect rendering */
const getItems = (times) => {
  const items = [];
  for (let i = 0; i < times; i++) {
    const iterationColor = randomColor();
    items.push(...timelineItems.map(e => ({
      ...e,
      id: i * 1000 + e.id, // Ensure unique IDs
      color: iterationColor
    })))
  }
  return items;
}

function App() {

  const [currentItems, setTimelineItems] = useState(getItems(50));
  const [addItemOpen, setAddItemOpen] = useState(false);
  
  const [filter, setFilter] = useState("");

  const showItems = useMemo(() => {
    return currentItems.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, currentItems]);

  const addTimelineItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const item = {
      id: Date.now(),
      name: formData.get("name"),
      start: formData.get("start"),
      end: formData.get("end"),
      color: formData.get("color"),
    };

    setTimelineItems((prevItems) => [...prevItems, item]);
    setAddItemOpen(false);
  };

  const editItemName = (itemId, itemName) => {
    setTimelineItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && itemName ? { ...item, name: itemName } : item
      )
    );
  };

  return (
    <div className="app">
      <h2>See the timeline below! {"\u2728"}</h2>
      <h3>{showItems.length} timeline items to render</h3>

      <div className="row">
        <input type="search" onChange={(e) => setFilter(e.target.value)} name="search" placeholder="Search..." />
        <button type="button" onClick={() => setAddItemOpen(true)}>Add to chaos</button>
      </div>

      <Scrollable>
        <Timeline items={showItems} onChangeName={editItemName} />
      </Scrollable>

      <Modal isOpen={addItemOpen} title={"New event"} onClose={() => setAddItemOpen(false)}>
        <form onSubmit={addTimelineItem}>
          <input required type="text" name="name" maxLength={50} placeholder="Item description" />
          <input required type="date" name="start" placeholder="Start date" />
          <input required type="date" name="end" placeholder="End date" />
          <input required type="color" name="color" placeholder="Item color" />
          <button type="submit">Add</button>
        </form>
      </Modal>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);