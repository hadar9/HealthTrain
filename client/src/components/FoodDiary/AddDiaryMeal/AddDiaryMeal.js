import React from 'react'
import { Button } from '@material-ui/core';

export const AddDiaryMeal = ({setIsAddingMeal}) => {


    const handleClick = () => {
        setIsAddingMeal(true)
    }

    return (
        <div align='center'>
            <Button style={{marginTop: '4rem'}} variant='outlined' onClick={()=>handleClick()}>Add New Meal</Button>
        </div>
    )
}
