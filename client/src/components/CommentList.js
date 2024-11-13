import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <>
          {comment.status === 'approved' && <li>{comment.content}</li>}
          {comment.status === 'rejected' && <li>This comment was rejected</li>}
          {comment.status === 'pending' && (
            <li>This comment is awaiting moderation</li>
          )}
        </>
      ))}
    </div>
  );
};

export default CommentList;
