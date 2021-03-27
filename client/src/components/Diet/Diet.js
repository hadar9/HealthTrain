import { Button } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BoxLoading } from 'react-loadingg';
import { SemipolarLoading } from 'react-loadingg';

export const Diet = () => {
    const user = useSelector(state => state.user)
    const [diet, setDiet] = useState(null)
    const [isDiet, setIsDiet] = useState(true)

    const handleClick = async () => {
        const res = await axios.get(`api/diet/createDiet/${user.user.id}`)
        console.log(res.data)
    }

    useEffect(() => {
        const fetchDiet = async () => {
            try {
                console.log(user.user)
                const res = await axios.get(`api/diet/getDiet/${user.user.id}`)
                console.log(res.data)
                if(res.data.error){
                    setDiet("No diet made for you yet")
                    setIsDiet(false)
                    console.log(res.data.error)
                }
                if(res.data.nutrition){
                    setDiet(JSON.stringify(res.data.nutrition))
                    setIsDiet(true)
                }
                   
            }
            catch(e){
                console.log(e)
            }
        }
        
        fetchDiet()

    }, [])

    return (
        <div>
            Diet <br/>
            {diet ? diet : null} <br/>
            {isDiet ? null : <Button onClick={()=>handleClick()} classes={{root : "textSizeSmall"}}>Create new diet</Button>}
            {isDiet ? null : <SemipolarLoading />};
        </div>
    )
}
