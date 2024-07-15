import React from 'react';

const Post = ({ content, url }) => {
    const isImageUrl = (url) => {
        return /\.(jpeg|jpg|gif|png)$/.test(url);
    };

    return (
        <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <p>{content}</p>
            {url && isImageUrl(url) ? (
                <img src={url} alt="User posted" style={{ maxWidth: '100%' }} />
            ) : (
                <LinkPreview url={url} />
            )}
        </div>
    );
};

export default Post;
