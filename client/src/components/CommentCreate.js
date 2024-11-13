import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label>New comment</label>
        <input
          className='form-control'
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type='submi' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
