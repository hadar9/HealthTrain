import { Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

export const FoodDiarySaveButton = ({saveDiary}) => {
    const foodDiary = useSelector(state => state.foodDiary)

    return (
        <>
            {foodDiary.nutrition ? <Button onClick={()=>saveDiary()} variant='contained' color='primary' style={{margin: '1rem'}}>Save Food Diary</Button> : null}
        </>
    )
}
