import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

const TaskTable = ({ tasks, onSelectTask }) => {
  const [focusedRowIndex, setFocusedRowIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("created_at");

  const rowRefs = useRef([]);

  const handleSortRequest = (field) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(field);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aDate = new Date(a[sortBy]);
    const bDate = new Date(b[sortBy]);
    return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
  });

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        if (focusedRowIndex < tasks.length - 1) {
          setFocusedRowIndex(focusedRowIndex + 1);
        }
        break;
      case "ArrowUp":
        if (focusedRowIndex > 0) {
          setFocusedRowIndex(focusedRowIndex - 1);
        }
        break;
      case "Enter":
        onSelectTask(tasks[focusedRowIndex]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const tableElement = document.getElementById("task-table");
    if (tableElement) {
      tableElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      const tableElement = document.getElementById("task-table");
      if (tableElement) {
        tableElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [focusedRowIndex]);

  useEffect(() => {
    if (rowRefs.current[focusedRowIndex]) {
      rowRefs.current[focusedRowIndex].focus();
    }
  }, [focusedRowIndex]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 500, overflowY: "auto" }}
    >
      <Table id="task-table" tabIndex={0}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Labels
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Priority
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Assignee
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              Due Date
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              <TableSortLabel
                active={sortBy === "created_at"}
                direction={sortBy === "created_at" ? sortOrder : "asc"}
                onClick={() => handleSortRequest("created_at")}
              >
                Created At
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f5f5f5",
                zIndex: 1,
              }}
            >
              <TableSortLabel
                active={sortBy === "updated_at"}
                direction={sortBy === "updated_at" ? sortOrder : "asc"}
                onClick={() => handleSortRequest("updated_at")}
              >
                Updated At
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks.map((task, index) => (
            <TableRow
              key={task.id}
              ref={(el) => (rowRefs.current[index] = el)}
              tabIndex={0}
              onClick={() => onSelectTask(task)}
              onMouseEnter={() => setFocusedRowIndex(index)}
              className={focusedRowIndex === index ? "highlighted-row" : ""}
            >
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.labels.join(", ")}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.due_date}</TableCell>
              <TableCell>
                {new Date(task.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(task.updated_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
