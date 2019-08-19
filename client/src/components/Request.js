import React, { Component } from 'react'
import axios from 'axios'
export default class Request extends Component {
    state = {
        repos: null,
    }
//https://api.github.com/users/jordan
    getUser = (evt) => {
        evt.preventDefault();
        const user = evt.target.elements.username.value
        console.log(user)

        axios.get(`https://api.github.com/users/${user}`)
        .then((res) => {
            console.log(res);
            const repos = res.data.public_repos;
            console.log(repos)
            this.setState({repos: repos})

        })
    }
    render() {
        // if(this.state.repose) {
        //     <p>Number of Repos: {this.state.repos}</p>
        // } else {
        //     <p>Please enter a username</p>
        // }
        return (
            <div>
                <form onSubmit={this.getUser}>
                    <input 
                    type="text"
                    name="username"
                    />
                    <input 
                    type="submit"
                    value="submit"
                    />
                </form>
                
                {
                    this.state.repos ?
                    <p className="title"># of Repos:
                    
                    {this.state.repos}
                    </p>:

                    <p className="title">Please Enter A Username.</p>
                }
            </div>
        )
    }
}
