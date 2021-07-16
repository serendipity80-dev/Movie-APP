import React from 'react'

const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
            <input type="text"
                   placeholder="type to search"
                   className="form-control"
                   value={props.value} 
                   onChange={(e) => props.setSearch(e.target.value)}

            />
        </div>
    )
}

export default SearchBox
