import React, { Component } from 'react'

export default class PreviewPage extends Component {
    render() {
        return (
            <div>
                


        <div className='section'> 
        <h1 class='name'>Zip</h1>
        <video playsinline='true' autoplay='true' muted='true' loop='true'>
        <source src='subway.mp4' type='video/mp4' />
        </video>
        </div>
                <h2>Unleash Your Thoughts</h2>
    </div>
        )
    }
}

