import { makeStyles, Popover } from '@material-ui/core';
import React from 'react'
import {AddFoodModalContent} from './AddFoodModalContent'


const useStyles = makeStyles((theme) => ({
    popover: {      
      position: "relative",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));

export const Modaltmp = ({ open, anchorEl, handlePopoverClose, mealIndex}) => {
    const classes = useStyles();
    
    return (

        <div className={classes.raised}>
        <Popover
            id="popover"
            className={classes.popover}
            classes={{
            paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
            }}
            transformOrigin={{
            vertical: "top",
            horizontal: "center",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
          <AddFoodModalContent 
            mealIndex={mealIndex} 
        /> 
           
        </Popover>
    </div>
    )
}
