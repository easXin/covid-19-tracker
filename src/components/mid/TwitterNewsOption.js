import React from 'react'
import './TwitterNewsOption.css'

const checkMark = "https://i.kym-cdn.com/photos/images/newsfeed/001/476/144/030.jpg"

function TwitterNewsOption({ Icon, SrcFrom, twitterId, twitterName }) {
    return (
        <div className="twitterNewsOption">
            <p>Icon</p>
            <p>TwitterName</p>
            <p>TwitterId</p>
            <p>Twitter Logo</p>

        </div>
    )
}

export default TwitterNewsOption
