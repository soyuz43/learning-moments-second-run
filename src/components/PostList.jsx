// ./components/PostList.jsx
import { useState, useEffect } from 'react';
import { getAllPosts, getAllLikes, getAllTopics } from '../services/PostService';
import '../tailwind.css';
export const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Promise.all([getAllPosts(), getAllLikes(), getAllTopics()])
            .then(([posts, likes, topics]) => {
                // Creating a map of topics for quick lookup
                const topicsMap = new Map(topics.map(topic => [topic.id, topic.name]));

                // Creating a map of likes counts keyed by postId
                const likesCount = likes.reduce((acc, like) => {
                    acc[like.postId] = (acc[like.postId] || 0) + 1;
                    return acc;
                }, {});

                // Merging posts with topics and likes
                const postsWithDetails = posts.map(post => ({
                    ...post,
                    topicName: topicsMap.get(post.topicId),
                    likes: likesCount[post.id] || 0
                }));

                setPosts(postsWithDetails);
            })
            .catch(error => console.error("Error loading data: ", error));
    }, []);

return (
    <div className="flex flex-col gap-4">
        {posts.map(post => (
            <div className="bg-white shadow-md rounded p-4" key={post.id}>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <h4 className="text-lg text-gray-600">{post.topicName}</h4>
                <p className="text-sm text-gray-500">Likes: {post.likes}</p>
            </div>
        ))}
    </div>
);
};