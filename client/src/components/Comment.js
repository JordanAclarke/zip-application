import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom'
export default class Comment extends Component {
    state = {
        comment: {},
        redirectToHome: false
    }
    
    componentDidMount() {
        this.getComment(this.props.match.params.id)
    }
    getComment = () => {
        axios.get(`/api/v1/comments/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    comment: res.data
                })
            })
    }
    handleDeleteComment = () => {
            axios.delete(`/api/v1/comments/${this.state.comment.id}/`, this.state.comment)
                .then(() => {
                    this.setState({
                        redirectToHome: true
                    })
                })
        }
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                
                <h1>Hello World</h1>
                <h2>{this.state.comment.username}</h2>
                <p>{this.state.comment.response}</p>
                <button onClick={this.handleDeleteComment}>Delete Comment</button>
            </div>
        )
    }
}
