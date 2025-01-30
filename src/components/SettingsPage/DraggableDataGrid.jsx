import React, { useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ROW";

// Draggable row component
const DraggableRow = ({ row, index, moveRow, columns }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {columns.map((column) => (
        <div key={column.field} style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
          {row[column.field]}
        </div>
      ))}
    </div>
  );
};

// Main DataGrid component with drag & drop functionality
const DraggableDataGrid = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ]);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
  ];

  const moveRow = useCallback((fromIndex, toIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      const [movedRow] = updatedRows.splice(fromIndex, 1);
      updatedRows.splice(toIndex, 0, movedRow);
      return updatedRows;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {rows.map((row, index) => (
          <DraggableRow key={row.id} row={row} index={index} moveRow={moveRow} columns={columns} />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableDataGrid;
