import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('http://posts.com/posts');
      setPosts(res.data);
      console.log(res.data);
    };
    getPosts();
  }, []);

  return (
    <section className='d-flex flex-row flex-wrap justify-content-between'>
      {Object.values(posts).map((post) => (
        <div
          key={post.id}
          className='card'
          style={{ width: '250px', marginBottom: '30px' }}
        >
          <div className='card-body'>
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default PostList;
