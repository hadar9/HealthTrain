import React, { useState } from 'react'
import { Typography, Input, Button } from '@material-ui/core'
import {SearchResult} from './SearchResult/SearchResult'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'

export const FoodSearch = () => {
    const [searchVal, setSearchVal] = useState('')
    const [searchResult, setSearchResult] = useState()
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const title = <Typography style={{margin: "2rem"}} align="center" variant="h5"><b>Food Search</b></Typography>

    const submitSearch = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const {data} = await axios.get(`api/search/${searchVal}`)
            console.log(data)
            setSearchResult(data)
            setLoading(false)
            
        } catch (e) {
            console.log(e)
        }
    }

    const formJSX = <form onSubmit={((e)=>submitSearch(e))} align='center' style={{margin: '4rem'}}>
        <Typography style={{display: 'inline-block', marginRight: '1rem'}}><b>Search: </b></Typography>
        <Input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} />
        <Button size='small' style={{marginLeft: '1rem'}} color='primary' variant='contained' type='submit'>Search Food</Button>
    </form>

    const loadingJsx = <div style={{textAlign: 'center'}} ><CircularProgress /></div>

    const searchResultsMapping = searchResult ? <SearchResult 
                                                    setMsg={setMsg} 
                                                    resultItem={searchResult}
                                                    setLoading={setLoading}
                                                     /> : null

    const msgJSX = <Typography style={{fontWeight: 'bold'}} align='center' variant='body1'>{msg}</Typography>



    return (
        <div>
            {title}
            {formJSX}
            {searchResultsMapping}
            {!loading ? msgJSX : null}
            {loading ? loadingJsx : null}

        </div>
    )
}
