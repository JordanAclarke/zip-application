import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Card, Button, Form, Row, Col} from 'react-bootstrap';
export default class NewCommentForm extends Component {
    state = {
        newComment: {
            username: '',
            user_photo: '',
            date: '',
            response: '',
            user_location: '',
            post: this.props.match.params.id
        },
        redirectToHome: false
    }


    handleChange = (evt) => {
        let copiedComment = {...this.state.newComment}

        copiedComment[evt.target.name] = evt.target.value
        this.setState({
            newComment: copiedComment
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.post(`/api/v1/comments/`, this.state.newComment)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
    }
    async componentDidMount() {
        const url = "https://api.randomuser.me/";
        const response = await fetch(url);
        const data = await response.json()
        let nickName = {...this.state.newComment}
        nickName.username=data.results[0].login.username
        this.setState({ newComment: nickName, loading: false })
        console.log(data.results[0]);
    }
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to={`/posts/${this.state.newComment.post}/`} />
        }
        if(this.state.loading) {
            return <div>Loading.....</div>
        }
        return (
            <div>
                <h2 className="comment-header" className="title">Add A New Comment</h2>
                <div className="comment-form">
                <form onSubmit={this.handleSubmit} className="title">
                    <div className="txtb">
                    <label htmlFor='comment-username'>Username:</label>
                    <input 
                    type='text'
                    name='username'
                    id='comment-username'
                    onChange={this.handleChange}
                    value={this.state.newComment.username}
                    />
                    </div>


                    <div className="txtb">
                    <label htmlFor='comment-response'>Response:</label>
                    <textarea 
                    type='text'
                    name='response'
                    id='comment-response'
                    cols="30" rows="5"
                    onChange={this.handleChange}
                    value={this.state.newComment.response}
                    />
                    </div>

                    <div className="txtb">
                    <input
                    type='submit'
                    value='Add Comment'
                    />
                    </div>

                </form>
                </div>
            </div>
        )
    }
}
