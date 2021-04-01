import React from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import { MealsModalContent } from "./MealsModalContent";



const useStyles = makeStyles((theme) => ({
    popover: {      
      position: "relative",
    },
    paper: {
      padding: theme.spacing(1),
    },
  }));



export const MealModal = ({ open, anchorEl, handlePopoverClose, foodIndex}) => {
    const classes = useStyles();

    return (
        <div className={classes.raised}>
            <Popover
                id="mouse-over-popover"
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
              <MealsModalContent 
                foodIndex={foodIndex} 
                handleClose={handlePopoverClose} 
            />
               
            </Popover>
        </div>
    )
}

