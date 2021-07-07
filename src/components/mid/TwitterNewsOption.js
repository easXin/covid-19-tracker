import React from 'react'
import './TwitterNewsOption.css'

const checkMark = "https://i.kym-cdn.com/photos/images/newsfeed/001/476/144/030.jpg"
const twitterLogo = "https://image.flaticon.com/icons/png/512/733/733579.png"
function TwitterNewsOption({ Icon, SrcFrom, twitterId, twitterName }) {
    return (
        <div className="twitterNewsOption">
            <div className="twitterNewsOptionLeft">
                <Icon />
                <div className="twitterNewsOptionLeftInfo">
                    <h4>TwitterName
                        <img src={checkMark} alt="check marker" />
                    </h4>
                    <p>@TwitterId</p>
                </div>

            </div>
            <div className="twitterNewsOptionRight">
                <img src={twitterLogo} alt="twitter logo" />
            </div>
        </div>
    )
}

export default TwitterNewsOption
