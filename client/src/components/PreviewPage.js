import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Player } from 'video-react';

export default class PreviewPage extends Component {
    render() {
        return (
            <div>
        <Link to={`/categories`} className='under'>       
        <div className="banner">
        <video playsinline='true' autoplay='true' muted='true' loop='true'> 
            <source src="client/public/Lightning.mp4" type='video/mp4' />
        </video> 
        <div className="content">
        <h1 className='neon' >Zip  <i class="fa fa-bolt"></i></h1>
        <h2 className='sub'>Unleash Your Thoughts</h2>
        </div>
        </div>
        </Link>     
        
    </div>
        )
    }
}

