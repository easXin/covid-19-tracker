import React from 'react'
import SearchIcon from "@material-ui/icons/Search";
import './MainPanel.css'

function MainPanel() {
    const imgUrl = "https://www.holbrooklife.com/wp-content/uploads/2020/03/covid-2.jpg"
    return (
        <div className="mainPanel">
            <div className="mainPanel__top">
                <img
                    className="mainPanel__logo"
                    src={imgUrl}
                    alt="C19 logo"
                />
                <div className="mainPanel__search">
                    <SearchIcon className="mainPanel__searchIcon" />
                    <input className="mainPanel__searchInput" type="text" />
                </div>
            </div>
            <div className="mainPanel__mid">
                <p>Map</p>
            </div>
            <div className="mainPanel__bottom">
                <div>Info</div>
                <div>Cases</div>
                <div>Recovered</div>
                <div>Death</div>
            </div>
        </div>
    )
}

export default MainPanel
