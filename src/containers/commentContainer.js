import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addComment, removeComment } from './../actions';
import Comment from '../components/comment';

class CommentContainer extends Component {
  submitPost = (postData) => {
    let request = {
      ...postData,
      date: new Date()
    }
    this.props.addComment(request);
  }

  deletePost = (key) => {
    this.props.removeComment(key);
  }

  render = () => {
    return (
      <Comment comments={this.props.getComments} submit={this.submitPost} delete={this.deletePost} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      getComments: state.comments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (request) => dispatch(addComment(request)),
    removeComment: (key) => dispatch(removeComment(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);
