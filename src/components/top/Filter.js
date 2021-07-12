import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import SearchIcon from "@material-ui/icons/Search";
import './Filter.css'
function GlobalFilter({ filter, setFilter }) {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 500)
    return (
        <div className="mainPanel__search ">
            <SearchIcon />
            <input value={value || ''} placeholder="Search Table ... "
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }} />
        </div>
    )
}

export default GlobalFilter
