import React, { Component } from 'react'
import Axios from 'axios';
export default class Comment extends Component {
    state = {
        comment: {}
    }
    componentDidMount() {
        this.getComment(this.props.match.params.id)
    }
    getComment = () => {
        Axios.get(`/api/v1/comments/${this.props.match.params.id}/`)
            .then((res) => {
                this.setState({
                    comment: res.data
                })
            })
    }
    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <h2>{this.state.comment.username}</h2>
                <p>{this.state.comment.response}</p>
            </div>
        )
    }
}
