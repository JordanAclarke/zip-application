// import React, { Component } from 'react'
// import axios from 'axios'
// import NewPostForm from './NewPostForm';
// export default class Api extends Component {
//     state = {
//         loading: true,
//         person: null,
//         links: null
//     }

//     async componentDidMount() {
//         const url = "https://api.randomuser.me/";
//         const response = await fetch(url);
//         const data = await response.json()
//         this.setState({ person: data.results[0], loading: false })
//         console.log(data.results[0]);
//     }
//     render() {
//         if(this.state.loading) {
//             return <div>Loading.....</div>
//         }
//         if(!this.state.person) {
//             return <div>Didnt find a person</div>
//         }
//         return (
//             <div>
//                     <div className="title">{this.state.person.login.username} </div>
//                     {/* <div className="title">{this.state.person.name.first} </div>
//                     <div className="title">{this.state.person.name.last} </div>
//                     <img src={this.state.person.picture.large} /> */}
                    
                

//             </div>
//         )
//     }
// }

