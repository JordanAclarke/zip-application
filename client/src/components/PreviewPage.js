import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class PreviewPage extends Component {
    render() {
        return (
            <div>
        <Link to={`/categories`} className='under'>       
        <div className="banner">
        <video playsinline='true' autoplay='true' muted='true' loop='true'>
        <source src='unleash.mp4' type='video/mp4' />
        </video>
        <div className="content">
        <h1 className='neon' data-text="Zip"><i class="fa fa-file-archive-o"></i></h1>
        <h2 className='sub'>Unleash Your Thoughts</h2>
        </div>
        </div>
        </Link>     
        
    </div>
        )
    }
}

