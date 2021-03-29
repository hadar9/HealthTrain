import { Box, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

export const DietNotes = ({dietNotes}) => {

    useEffect(() => {
        console.log(dietNotes.length)
    }, [dietNotes])

    return (
        <Box m={6}>
            {  <Typography><b>Diet Notes:</b></Typography>}
            {  dietNotes.map(note => 
                <Typography key={note}>{note}</Typography>
                )
               }
        </Box>
    )
}
