import React from 'react'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    updateMode: {
      backgroundColor: "blue",
      "&:hover": { opacity: 0.7, backgroundColor: "blue" },
    },
    regularMode: {
      backgroundColor: "black",
    },
    redCalories: {
      marginRight: "2rem",  
      color: "red",
      display: 'inline-block'
     

    },
    calories: {
      color: "black",
      display: 'inline-block'
    
 
    },
    loading: {
      color: "black",
      margin: '2rem'
    
 
    },
  }));


export const DietHeader = ({handleClick, updateMode, loading, convertToUpdateMode}) => {
    const classes = useStyles();
    const nutrition = useSelector(state => state.userReducer.nutrition)
    const caloriesSum = useSelector(state => state.userReducer.caloriesSum)

    


    const caloriesTitle = (
        <>
            <Typography  style={{display: 'inline-block', marginRight : "1rem"}}  variant="h6"><b>Calories:</b></Typography>
            <Typography  className={updateMode ? classes.redCalories : classes.calories} variant="h6"><b>{caloriesSum ? caloriesSum : null }</b></Typography>
        </>
    )
    const saveChangeButton = (
        nutrition ? <Box alignItems="flex-end" justifyContent="flex-end" component={"span"} display="flex">
                <Button className={updateMode ? classes.updateMode : classes.regularMode} onClick={()=>convertToUpdateMode()} variant="contained"  color="primary">
                    {updateMode ? "Save Changes" : "Change Diet"}
                    </Button>
            </Box> : null
    )

    const createNewDiet = (
        <>
           
            {nutrition == null && !loading ? <Button onClick={()=>handleClick()} >Create new diet</Button> : null}
            {!nutrition && loading ? <CircularProgress className={classes.loading} /> : null }
        </>
    )


    return (
        <div>
            {caloriesTitle}
            {saveChangeButton}
            {createNewDiet}
            
        </div>
    )
}
