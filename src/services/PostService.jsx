export const getAllPosts = () => {
    return fetch (`http://localhost:8088/posts`).then(res => res.json())
}

export const getAllLikes = () => {
    return fetch(`http://localhost:8088/likes`).then(res => res.json());
};
export const getAllTopics = () => {
    return fetch(`http://localhost:8088/topics`).then(res => res.json());
};
