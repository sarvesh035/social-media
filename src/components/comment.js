import React, { Component } from 'react';
import Moment from 'react-moment';
import FeatherIcon from 'feather-icons-react';
import { Container, Card, CardTitle, CardSubtitle, CardText, FormGroup, Input, Button, Alert,
    Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../style/style.css';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                name: '',
                comment: ''
            },
            deleteId: '',
            deleteEnabled: false,
            error: ''
        }
    }

    deleteToggle = (key) => {
        this.setState({
            ...this.state,
            deleteId: String(key),
            deleteEnabled: !this.state.deleteEnabled
        });
    }

    handleChange = (event) => {
        let attribute = event.target.getAttribute('data-name');
        let value = event.target.value;

        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                [attribute]: value,
            },
            error: ''
        });
    }

    validatePost = () => {
        let isValidated = true;
        if(this.state.post.name === '') {
            isValidated = false;
            this.setState({
                ...this.state,
                error: 'Name is required.'
            });
        } else if(!this.state.post.name.match(/^[a-zA-Z .'-]+$/)) {
            isValidated = false;
            this.setState({
                ...this.state,
                error: 'Name is invalid.'
            });
        } else if(this.state.post.comment === '') {
            isValidated = false;
            this.setState({
                ...this.state,
                error: 'Comment is required.'
            });
        } else if(!this.state.post.comment.match(/^[a-zA-Z ,.'"-/\\!#$%^&\n]+$/)) {
            isValidated = false;
            this.setState({
                ...this.state,
                error: 'Comment is invalid.'
            });
        }
        
        return isValidated;
    }

    handleSubmit = () => {
        if(this.validatePost()) {
            this.setState({
                ...this.state,
                post: {
                    name: '',
                    comment: ''
                },
                error: ''
            });
            this.props.submit(this.state.post);
        }
    }

    handleDelete = () => {
        this.deleteToggle('');
        this.props.delete(this.state.deleteId);
    }

    renderAddComment = () => {
        return (
            <div className="px-3 pt-3 pb-3 add-comment-section">
                {this.state.error && <Alert color="danger" className="text-small">
                    Error: {this.state.error}
                </Alert>}
                <FormGroup>
                    <Input
                        type="text"
                        className="text-small"
                        data-name="name"
                        value={this.state.post.name}
                        onChange={this.handleChange}
                        placeholder="Tell me your name"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="textarea"
                        className="text-small"
                        data-name="comment"
                        value={this.state.post.comment}
                        onChange={this.handleChange}
                        placeholder="What's in your mind?"
                    />
                </FormGroup>
                <FormGroup className="d-flex justify-content-end">
                    <Button color="info" className="pull-right" onClick={this.handleSubmit}>
                        <FeatherIcon icon="plus" size="20" className="mr-1 mb-1" />Add Post
                    </Button>
                </FormGroup>
            </div>
        );
    }

    renderDeleteCommentModal = () => {
        if(this.state.deleteId !== "") {
            return (
                <Modal isOpen={this.state.deleteEnabled} toggle={() => this.deleteToggle('')} className={this.props.className}>
                    <ModalBody>
                        <div className="text-center">
                            <FeatherIcon icon="x-circle" size="50" className="mb-2 mt-3 text-danger" />
                        </div>
                        <h1 className="display-6 mx-1">
                            Are you sure you want to delete this Post ?
                        </h1>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger btn-auto" onClick={this.handleDelete}>
                            <FeatherIcon icon="trash-2" size="20" className="mb-1" /> Delete
                        </Button>
                        <Button color="secondary btn-auto" onClick={() => this.deleteToggle('')}>
                            <FeatherIcon icon="x" size="20" className="mb-1" /> Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    renderComments = () => {
        if(this.props.comments.length > 0) {
            return this.props.comments.map((item, index) => {
                return (
                    <Card body key={index} className="pt-3 border-bottom">
                        <CardTitle className="mb-1">
                            <h1 className="display-6">
                                <FeatherIcon icon="user" size="20" className="img-thumbnail mr-3 avatar" />
                                {item.name}
                                <FeatherIcon icon="x" size="20" className="float-right light pointer" onClick={() => this.deleteToggle(index)} />
                            </h1>
                        </CardTitle>
                        <CardText className="pt-2 mb-1 text-medium">
                            {item.comment}
                        </CardText>
                        <CardSubtitle className="mt-2 text-right text-small italic">
                            Posted at <Moment format="DD/MM/YYYY" date={item.date} />
                        </CardSubtitle>
                    </Card>
                );
            });
        } else {
            return (
                <p className="pt-3 text-center text-medium italic">No comment posted yet.</p>
            );
        }
    }

    render = () => {
        return (
            <Container fluid id="comment-wrapper" className="pt-3">
                <Container>
                    {this.renderAddComment()}
                    {this.renderComments()}
                    {this.state.deleteEnabled && this.renderDeleteCommentModal()}
                </Container>
            </Container>
        );
    }
}