import React from "react";
import { ReactSortable } from "react-sortablejs";
import ReorderIcon from "@mui/icons-material/Reorder";
export default function AnagramOptions({ options }) {

  options = options?.sort(() => Math.random() - 0.5);
  const [items, setItems] = React.useState(
    options?.map((option) => ({
      id: option._id,
      name: option.text,
    }))
  );

  return (
    <ReactSortable list={items} setList={setItems}>
      {items.map((item) => (
        <div className="border border-gray-300 py-2" key={item.id}>
          <ReorderIcon /> {item.name}
        </div>
      ))}
      <div className="pt-1">
        Your answer: {items.map((item) => item.name).join(" ")}
      </div>
    </ReactSortable>
  );
}
