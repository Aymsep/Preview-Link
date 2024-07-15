import React, { useState } from 'react';
import Post from './Post';

const PostForm = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { content, url };
        setPosts([newPost, ...posts]); // Add new post at the top
        setContent('');
        setUrl('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Include a URL or image link"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
            <div>
                {posts.map((post, index) => (
                    <Post key={index} content={post.content} url={post.url} />
                ))}
            </div>
        </div>
    );
};

export default PostForm;
