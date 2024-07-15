import { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'imageLink') setImageLink(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let previewData = null;

    // Extract first URL from description if no imageLink is provided
    if (!imageLink) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = description.match(urlRegex);
      if (urls) {
        try {
          const response = await fetch(urls[0]);
          const data = await response.text();

          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const title = doc.querySelector('title')?.textContent || '';
          const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
          const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

          previewData = { title, description: desc, image };
        } catch (error) {
          console.error(error);
        }
      }
    }

    const newPost = {
      title,
      description,
      imageLink,
      previewData
    };

    setPosts([newPost, ...posts]);
    setTitle('');
    setDescription('');
    setImageLink('');
    setLoading(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="title" value={title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={description} onChange={handleChange} placeholder="Description" />
        <input name="imageLink" value={imageLink} onChange={handleChange} placeholder="Enter direct image link" />
        <button type="submit" disabled={loading}>Post</button>
      </form>

      <div>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.imageLink ? (
              <img width={65} src={post.imageLink} alt="User provided" />
            ) : post.previewData ? (
              <>
                {post.previewData.image && <img src={post.previewData.image} alt="Link preview" />}
                <h4>{post.previewData.title}</h4>
                <p>{post.previewData.description}</p>
              </>
            ) : <p>No preview available</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
