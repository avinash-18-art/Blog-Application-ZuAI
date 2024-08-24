import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PostDetail.css';
import { getPostById } from '../api/posts';

class PostDetail extends Component {
  state = {
    post: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    getPostById(id).then(post => this.setState({ post }));
  }

  render() {
    const { post } = this.state;
    if (!post) return <div>Loading...</div>;

    return (
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <Link to={`/edit/${post.id}`} className="edit-post-button">Edit</Link>
      </div>
    );
  }
}

export default withRouter(PostDetail);
