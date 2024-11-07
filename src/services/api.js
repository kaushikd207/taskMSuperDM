// src/api.js
import { mockData } from "../data/mockData";

export function fetchComments(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData.comments[taskId] || []);
    }, 1000); // Simulate network delay
  });
}
