import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './PostForm.css';
import { createPost, updatePost, getPostById } from '../api/posts';

class PostForm extends Component {
  state = {
    title: '',
    content: '',
    editing: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      getPostById(id).then(post => {
        this.setState({ title: post.title, content: post.content, editing: true });
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, editing } = this.state;
    const { id } = this.props.match.params;

    if (editing) {
      updatePost(id, { title, content }).then(() => {
        this.props.history.push('/');
      });
    } else {
      createPost({ title, content }).then(() => {
        this.props.history.push('/');
      });
    }
  };

  render() {
    const { title, content } = this.state;

    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <h2>{this.state.editing ? 'Edit Post' : 'New Post'}</h2>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={this.handleChange}
          placeholder="Content"
          required
        />
        <button type="submit">{this.state.editing ? 'Update' : 'Create'}</button>
      </form>
    );
  }
}

export default withRouter(PostForm);
