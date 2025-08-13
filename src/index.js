import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import Timeline from "./components/Timeline/";
import Modal from "./components/Modal/";

function App() {

  const [currentItems, setTimelineItems] = React.useState(timelineItems);
  const [addItemOpen, setAddItemOpen] = React.useState(false);

  const addTimelineItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const item = {
      id: Date.now(),
      name: formData.get("name"),
      start: formData.get("start"),
      end: formData.get("end"),
    };
    console.log(item);
    // setTimelineItems((prevItems) => [...prevItems, item]);
    setAddItemOpen(false);
  };

  return (
    <div>
      <h2>See the timeline below! {"\u2728"}</h2>
      <h3>{currentItems.length} timeline items to render</h3>

      <button type="button" onClick={() => setAddItemOpen(true)}>Add to chaos</button>

      <div className="horizontal-scroll">
        <Timeline items={currentItems} />
      </div>

      <Modal isOpen={addItemOpen} title={"New event"} onClose={() => setAddItemOpen(false)}>
        <form onSubmit={addTimelineItem}>
          <input required type="text" name="name" maxLength={50} placeholder="Add a new timeline item" />
          <input required type="date" name="start" placeholder="Add a new timeline item" />
          <input required type="date" name="end" placeholder="Add a new timeline item" />
          <button type="submit">Add</button>
        </form>
      </Modal>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);