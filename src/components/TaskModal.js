import React, { useState, useEffect } from "react";
import "./TaskModal.css";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function TaskModal({ task, onClose, onUpdate }) {
  const [status, setStatus] = useState(task.status);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(task.comments || []);

  useEffect(() => {
    setComments(task.comments || []);
  }, [task]);

  const handleStatusChange = (event) => setStatus(event.target.value);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: comment,
        created_at: new Date().toISOString(),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment("");

      onUpdate({ ...task, comments: updatedComments });
    }
  };

  const handleSave = () => {
    const updatedTask = { ...task, status, comments };
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <Modal open={!!task} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          mx: "auto",
          mt: "10%",
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {task.name}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Add Comment"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ mt: 1 }}
        >
          Add Comment
        </Button>

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Comments:
        </Typography>
        <List>
          {comments.map((c) => (
            <ListItem key={c.id}>
              <ListItemText
                primary={c.text}
                secondary={`Posted on: ${new Date(
                  c.created_at
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ ml: 2 }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TaskModal;
