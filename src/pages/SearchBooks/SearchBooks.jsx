import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, {useState} from 'react';
import {GetBooksByText} from '../../api/Books';
const useStyles = makeStyles((theme)=>({
    paperSection: {
    },
    searchButton: {
        height: '100%'
    }
}))
const SearchBooks = () => {
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState(null);
    const classes = useStyles();
    const options = {
        selectableRows: 'none',
        download: false,
        print: false,
        search: false
      }
    const columns = [
        {
            name: "isbnId",
            label: "ISBN ID",
            options: {
            filter: true,
            sort: true
            }
        },
        {
            name: "bookName",
            label: "Book Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "author",
            label: "Author",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "count",
            label: "Count",
            options: {
                filter: true,
                sort: true
            }
        }
    ];
    const fetchBooks = () => {
        GetBooksByText(searchText).then((res)=>{
            setBooks(res.data.dataList)
            console.log("books",res.data.dataList)
        });
    }
    return(
    <Paper className={classes.paperSection}>
        <Grid container>
            <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Search Text"
                    variant="filled"
                    value={searchText}
                    onChange={ e => setSearchText(e.target.value) }/>
            </Grid>
            <Grid item xs={4}>
            <Button 
            className={classes.searchButton} 
            size="large" 
            variant="outlined" 
            color="primary"
            onClick={fetchBooks}>
                Search
            </Button>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12}>
                    <MUIDataTable
                    title={"Books"}
                    columns={columns}
                    options={options}
                    data={books!=null?books:[]}/>
            </Grid>
        </Grid>
    </Paper>
    )
}

export default SearchBooks;