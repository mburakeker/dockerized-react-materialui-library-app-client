import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState} from 'react';
import * as moment from 'moment';
import {GetBooks, SaveBook} from '../../api/Books';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme)=>({
    searchButton: {
        height: '100%'
    }
}))
const initBookForm = {
    isbnId: "",
    bookName: "",
    author: "",
    count: 1
}
const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [openSaveBookFormDialog, setOpenSaveBookFormDialog] = useState(false);
    const [createBookForm, setCreateBookForm] = useState(initBookForm);
    const [saveBookError, setSaveBookError] = useState(null);
    const [createBookFormValidation, setCreateBookFormValidation] = useState(null);
    const [touched, setTouched] = useState(false);
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
    useEffect(() => {
        fetchBooks();
    }, [])
    useEffect(() => {
        validateCreateBookForm();
    }, [createBookForm])
    const validateCreateBookForm = () => {
        if(createBookForm.isbnId === ""){
            setCreateBookFormValidation("Isbn Id is empty!");
            return;
        }
        if(createBookForm.bookName === ""){
            setCreateBookFormValidation("Book name is empty!");
            return;
        }
        if(createBookForm.author === ""){
            setCreateBookFormValidation("Author is empty!");
            return;
        }
        if(createBookForm.count === null){
            setCreateBookFormValidation("Count is invalid!");
            return;
        }
        if(createBookForm.count < 1){
            setCreateBookFormValidation("Count can't be lower than 1!");
            return;
        }
        return setCreateBookFormValidation(null);
    }
    const fetchBooks = () => {
        GetBooks().then((res)=>{
            setBooks(res.data.dataList);
        });
    }
    const handleCloseSaveBookFormDialog = () => {
        setOpenSaveBookFormDialog(false);
        setCreateBookForm(initBookForm);
        setTouched(false);
    }
    const handleOpenSaveBookFormDialog = () => {
        setOpenSaveBookFormDialog(true);
    }
    const handleChangeCreateBookProperties = (e) => {
        setTouched(true);
        validateCreateBookForm();
        const {name, value} = e.target;
        let newDict = {...createBookForm};
        newDict[name] = value;
        setCreateBookForm(newDict);
    }
    const handleSaveBook = () => {
        SaveBook(createBookForm).then((res)=>{
            if(res.data.errorState === false){
                fetchBooks();
                handleCloseSaveBookFormDialog();
            }else{
                setSaveBookError(res.data.errorList[0].message)
            }
        });
    }
    return(
        <>
        <Paper>
            <Grid container>
                <Grid item xs={4}>
                <Button 
                className={classes.searchButton} 
                size="large" 
                variant="contained" 
                color="primary"
                onClick={handleOpenSaveBookFormDialog}>
                    Add New Book
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
        <Dialog open={openSaveBookFormDialog} onClose={handleCloseSaveBookFormDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Lend Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the book details in order to save this book.
          </DialogContentText>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                label="ISBN ID"
                variant="outlined"
                fullWidth
                className={classes.textField}
                name="isbnId"
                onChange={handleChangeCreateBookProperties}
                value={createBookForm.isbnId}
                InputLabelProps={{
                shrink: true,
                }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                label="Book Name"
                variant="outlined"
                fullWidth
                className={classes.textField}
                name="bookName"
                value={createBookForm.bookName}
                onChange={handleChangeCreateBookProperties}
                InputLabelProps={{
                shrink: true,
                }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                label="Author"
                variant="outlined"
                fullWidth
                className={classes.textField}
                name="author"
                value={createBookForm.author}
                onChange={handleChangeCreateBookProperties}
                InputLabelProps={{
                shrink: true,
                }}/>
              </Grid>
              <Grid item xs={12}>
                <TextField
                label="Count"
                variant="outlined"
                fullWidth
                className={classes.textField}
                name="count"
                value={createBookForm.count}
                type="number"
                onChange={handleChangeCreateBookProperties}
                InputLabelProps={{
                shrink: true,
                }}/>
              </Grid>
          </Grid>
        {touched && createBookFormValidation && <Alert severity="error">{createBookFormValidation}</Alert>}
        {saveBookError && <Alert severity="error">{saveBookError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveBookFormDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveBook} color="primary" variant="contained" disabled={createBookFormValidation != null}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default ManageBooks;