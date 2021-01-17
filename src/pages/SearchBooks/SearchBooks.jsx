import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useState} from 'react';
import * as moment from 'moment';
import {GetBooksByText} from '../../api/Books';
import {GetSuggestedReturnDate} from '../../api/Transaction';
const useStyles = makeStyles((theme)=>({
    searchButton: {
        height: '100%'
    }
}))
const SearchBooks = () => {
    const [searchText, setSearchText] = useState('');
    const [books, setBooks] = useState(null);
    const [openLendBookFormDialog, setOpenLendBookFormDialog] = useState(false);

    // Initally adding 30 days from now on using moment but this will be overwritten by /api/Transaction/GetSuggestedReturnDate 
    const [suggestedReturnDate,setSuggestedReturnDate] = useState(moment().add(1, 'M').format('YYYY-MM-DD')); 
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
        },
        {
            name: "Lend",
            label: "Lend",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button disabled={Boolean(books[tableMeta.rowIndex]["count"]<1)} variant="outlined" color="primary" onClick={handleOpenLendBookFormDialog}>
                          Lend
                      </Button>
                    );
            },
            }
        }
    ];
    const fetchBooks = () => {
        GetBooksByText(searchText).then((res)=>{
            setBooks(res.data.dataList);
        });
    }
    const handleCloseLendBookFormDialog = () => {
        setOpenLendBookFormDialog(false);
    }
    const handleOpenLendBookFormDialog = () => {
        setOpenLendBookFormDialog(true);
        GetSuggestedReturnDate().then((res)=>{
            if(res.data.data !== null){
                setSuggestedReturnDate(res.data.data.returnDate);
            }
        });
    }
    return(
        <>
        <Paper>
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
        <Dialog open={openLendBookFormDialog} onClose={handleCloseLendBookFormDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To lend this book to a member, please enter the return date and the ID of the member here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Member ID"
            type="username"
            fullWidth
          />
          <TextField
            id="date"
            label="Return Date"
            type="date"
            defaultValue={suggestedReturnDate}
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLendBookFormDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseLendBookFormDialog} color="primary" variant="contained">
            Lend
          </Button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default SearchBooks;