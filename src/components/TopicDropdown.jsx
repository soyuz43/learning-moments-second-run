// ./components/TopicDropdown.jsx
import { useState, useEffect } from "react";
import { getAllTopics } from "../services/PostService";
import PropTypes from 'prop-types';
import '../tailwind.css';

export const TopicDropdown = ({ handleTopicChange }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTopics()
      .then((topics) => setTopics(topics))
      .catch((error) => console.error("Error loading topics: ", error));
  }, []);

  return (
    <select
      className="bg-white border border-gray-300 rounded py-2 px-4"
      onChange={handleTopicChange}
    >
      <option value="">Select a topic</option>
      {topics.map((topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.name}
        </option>
      ))}
    </select>
  );
};
TopicDropdown.propTypes = {
  handleTopicChange: PropTypes.func.isRequired,
};