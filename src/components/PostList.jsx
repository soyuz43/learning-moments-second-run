// ./components/PostList.jsx
import { useState, useEffect } from 'react';
import { getAllPosts, getAllLikes, getAllTopics } from '../services/PostService';
import '../tailwind.css';
import { TopicDropdown } from './TopicDropdown';

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Promise.all([getAllPosts(), getAllLikes(), getAllTopics()])
            .then(([posts, likes, topics]) => {
                const topicsMap = new Map(topics.map(topic => [topic.id, topic.name]));
                const likesCount = likes.reduce((acc, like) => {
                    acc[like.postId] = (acc[like.postId] || 0) + 1;
                    return acc;
                }, {});

                const postsWithDetails = posts.map(post => ({
                    ...post,
                    topicName: topicsMap.get(post.topicId),
                    likes: likesCount[post.id] || 0
                }));

                setAllPosts(postsWithDetails);
                setDisplayPosts(postsWithDetails);
            })
            .catch(error => console.error("Error loading data: ", error));
    }, []);

    useEffect(() => {
        const filteredPosts = allPosts.filter(post => {
            return (selectedTopic ? post.topicId === parseInt(selectedTopic) : true) &&
                    post.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setDisplayPosts(filteredPosts);
    }, [selectedTopic, searchTerm, allPosts]);

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <TopicDropdown handleTopicChange={handleTopicChange} />
            <input
                type="text"
                placeholder="Search for posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-1 rounded"
            />
            {displayPosts.map(post => (
                <div 
                className="bg-white shadow-md rounded p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                key={post.id}
                >
                    <h2 className="text-2xl font-bold mb-2 ">{post.title}</h2>
                    <h4 className="text-lg text-gray-600">{post.topicName}</h4>
                    <p className="text-sm text-gray-500">Likes: {post.likes}</p>
                </div>
            ))}
        </div>
    );
};