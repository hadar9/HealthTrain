import React from 'react'
import {TableCell, TableRow} from '@material-ui/core';
import {DeleteTableRow} from './DeleteTableRow/DeleteTableRow'

export const MealTableRow = ({row, mealIndex, rowIndex}) => {
    return (
             <TableRow key={row.id}>
               <TableCell component="th" scope="row">{row.name} </TableCell>
               <TableCell align="center">{row.amount}</TableCell>
               <TableCell align="center">{row.scaleUnit}</TableCell>
               <TableCell align="center">{row.calories}</TableCell>
               <TableCell align="center">{row.defaultAmount}</TableCell>
               <TableCell align="center">{row.foodType}</TableCell>
               <TableCell align="center"><DeleteTableRow mealIndex={mealIndex} rowIndex={rowIndex}/></TableCell>
             </TableRow>
    )
}
