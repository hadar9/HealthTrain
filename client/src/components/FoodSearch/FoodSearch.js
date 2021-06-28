import React, { useState } from 'react'
import { Typography, Input, Button } from '@material-ui/core'
import {SearchResult} from './SearchResult/SearchResult'
import axios from 'axios'

export const FoodSearch = () => {
    const [searchVal, setSearchVal] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const title = <Typography style={{margin: "2rem"}} align="center" variant="h5"><b>Food Search</b></Typography>

    const submitSearch = async (e) => {
        try {
            e.preventDefault()
            const {data} = await axios.get('api/...')
            console.log(data)
            if(data.length){
                setSearchResults(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const formJSX = <form onSubmit={((e)=>submitSearch(e))} align='center' style={{margin: '4rem'}}>
        <Typography style={{display: 'inline-block', marginRight: '1rem'}}><b>Search: </b></Typography>
        <Input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} />
        <Button size='small' style={{marginLeft: '1rem'}} color='primary' variant='contained' type='submit'>Search Food</Button>
    </form>

    const searchResultsMapping = searchResults.length ? searchResults.map(s=><SearchResult resultItem={s} />) : null

    return (
        <div>
            {title}
            {formJSX}
            {searchResultsMapping}

        </div>
    )
}
