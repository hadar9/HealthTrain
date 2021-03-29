import { Typography } from '@material-ui/core'
import React from 'react'

export const FoodNotes = ({notes}) => {
    return (
        <>
            <Typography><b>Notes:</b></Typography>
            {notes.map((n, index)=>
                    <Typography key={index} style={{marginLeft : "1rem"}}> 
                        {n}
                    </Typography>
                )}
        </>
    )
}
