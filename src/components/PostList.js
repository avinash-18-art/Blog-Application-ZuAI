import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';
import { getPosts } from '../api/posts';

class PostList extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    getPosts().then(posts => this.setState({ posts }));
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="post-list">
        <h2>All Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <Link to="/new" className="new-post-button">New Post</Link>
      </div>
    );
  }
}

export default PostList;
