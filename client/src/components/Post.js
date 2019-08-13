import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'


export default class Post extends Component {
    state = {
        post: {},
        comments: []
    }

    componentDidMount() {
        this.getPost(this.props.match.params.id)
    }

    getPost = () => {
        Axios.get(`/api/v1/posts/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({post: res.data,
                comments: res.data.comments
            })
            })
    }
    render() {
        let commentList = this.state.comments.map((comment) => {
            return (
                <Link to={`/comments/${comment.id}/`}>
                    {comment.username}
                    {comment.userphoto}
                    {comment.date}
                    {comment.response}
                </Link>
            )
        })
        return (
            <div>
                <h2>{this.state.post.username}</h2>
                <img src={this.state.post.user_photo} />
                <p>{this.state.post.date}</p>
                <p>{this.state.post.title}</p>
                <p>{this.state.post.text}</p>
                <h3>{this.state.post.location}</h3>
                <p>{this.state.post.mood}</p>
                <img src={this.state.post.text_photo} />

                <h2>Comments:</h2>
                {commentList}
            </div>
        )
    }
}
