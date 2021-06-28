import React from 'react'
import {Select, MenuItem  } from '@material-ui/core';


export const SimpleSelect = ({makeUpperTag, ...props}) => {
    
    return (
        <Select {...props}>
            {props.values.map((v, index)=>{
                const tagVal = v.slice(-2)
                const tagJSX = makeUpperTag ? <sup style={{verticalAlign: 'super',fontSize: 'smaller'}}>{tagVal}</sup> : null
                const value = makeUpperTag ? v.slice(0, -2) : v
                return <MenuItem key={index} value={index}>{value}{tagJSX}</MenuItem>
                } )}
        </Select>
    )
}
