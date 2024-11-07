import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import TaskTable from "./components/TaskTable";
import TaskModal from "./components/TaskModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { mockData } from "./data/mockData";

const loadTasksFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");
  return data
    ? JSON.parse(data)
    : mockData.tasks.map((task) => ({ ...task, comments: [] }));
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [selectedTask, setSelectedTask] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [priorityFilter, setPriorityFilter] = useState("");
  const [labelFilter, setLabelFilter] = useState("");

  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handleSelectTask = (task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setSelectedTask(updatedTask);
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.status ===
        (activeTab === 0 ? "Open" : activeTab === 1 ? "In Progress" : "Closed")
    )
    .filter((task) =>
      priorityFilter ? task.priority === priorityFilter : true
    )
    .filter((task) => {
      if (labelFilter) {
        return task.labels.some((label) =>
          label.toLowerCase().includes(labelFilter.toLowerCase())
        );
      }
      return true;
    });

  useEffect(() => {
    setTasks(loadTasksFromLocalStorage());
  }, []);

  const loadMoreTasks = () => {
    if (!hasNextPage) return;
    const nextTasks = mockData.tasks.slice(tasks.length, tasks.length + 10);
    setTasks((prevTasks) => [...prevTasks, ...nextTasks]);
    setHasNextPage(nextTasks.length > 0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: 1,
          mb: 2,
          display: "flex",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              label="Priority"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Label"
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Open" />
          <Tab label="In Progress" />
          <Tab label="Closed" />
        </Tabs>
      </Box>
      <InfiniteScroll
        dataLength={filteredTasks.length}
        next={loadMoreTasks}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more tasks</p>}
      >
        <TaskTable tasks={filteredTasks} onSelectTask={handleSelectTask} />
      </InfiniteScroll>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTask}
        />
      )}
    </Box>
  );
}

export default App;
