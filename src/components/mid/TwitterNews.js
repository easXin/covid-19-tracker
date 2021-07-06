import React from 'react'
import { Avatar } from '@material-ui/core';
import TwitterNewsOption from './TwitterNewsOption';
import './TwitterNews.css'

function TwitterNews() {
    return (
        <div className="twitterNews">
            <div className="twitterNews__header">
                <TwitterNewsOption Icon={Avatar} SrcFrom="Twitter Logo " twitterId="CNN" twitterName="CNN"/>
            </div>

            <div className="twitterNews__body">
                {/* paragraph */}
                <p>
                    The resort, which reopened on June 18, is shutting down again after Hong 
                    Kong tightened its social-distancing measures following a rise of 52 new 
                    coronavirus cases in the city
                </p>
                {/* img */}
                <div className="twitterNews__headerLine">
                    <img src="" alt="coming soon ... "/>
                    <h4>Hong Kong Disneyland will close again after a surge in coronavirus cases</h4>
                    <p>cnn.com</p>
                </div>
                <p>12:01pm - Jul 13,2020</p>
            </div>
            <div className="twitterNews__footer">
                <p>1.1k   See the latest COVID 19 information</p>
            </div>
        </div>
    )
}

export default TwitterNews
