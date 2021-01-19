import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState} from 'react';
import {ReturnBook, GetBookTransactions, GetReturnPriceByTransactionId} from '../../api/BookTransactions';
import { Alert } from '@material-ui/lab';
const BookTransactions = () => {
    const [bookTransactions, setBookTransactions] = useState([]);
    const [openReturnBookFormDialog, setOpenReturnBookFormDialog] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState("");
    const [selectedReturnPriceDto, setSelectedReturnPriceDto] = useState({daysOverdue:0,price:0});
    const [returnBookError, setReturnBookError] = useState(null);
    const options = {
        selectableRows: 'none',
        download: false,
        print: false
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
            name: "memberId",
            label: "Member Id",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "memberName",
            label: "Member Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "isActive",
            label: "Is Active?",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                    <Checkbox
                    color="primary"
                    checked={value}
                    />
                    );
            },
            }
        },
        {
            name: "Return",
            label: "Return",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button disabled={Boolean(bookTransactions[tableMeta.rowIndex]["isActive"]<1)} variant="outlined" color="primary" onClick={() => handleOpenReturnBookFormDialog(bookTransactions[tableMeta.rowIndex]["transactionId"])}>
                          Return
                      </Button>
                    );
            },
            }
        }
    ];
    useEffect(() => {
        fetchBookTransactions();
    }, [])
    const fetchBookTransactions = () => {
        GetBookTransactions().then((res)=>{
            if(res.data.dataList!=null){
                setBookTransactions(res.data.dataList)
            }
        });
    }
    const handleCloseReturnBookFormDialog = () => {
        setOpenReturnBookFormDialog(false);
    }
    const handleOpenReturnBookFormDialog = (transactionId) => {
        setSelectedTransactionId(transactionId);
        GetReturnPriceByTransactionId(transactionId).then((res)=>{
            if(res.data.data != null){
                setSelectedReturnPriceDto(res.data.data);
            }
        }).then( () => setOpenReturnBookFormDialog(true))
        
    }
    
      const handleReturnBook = () => {
        ReturnBook(selectedTransactionId).then((res)=>{
            if(res.data.errorState === false)
            {
                fetchBookTransactions();
                handleCloseReturnBookFormDialog();
            }
            else
            {
                setReturnBookError(res.data.errorList[0].message)
            }
        });
    }
    return(
        <>
        <Paper>
            <Grid container>
                <Grid item xs={12}>
                        <MUIDataTable
                        title={"Book Transactions"}
                        columns={columns}
                        options={options}
                        data={bookTransactions!=null?bookTransactions:[]}/>
                </Grid>
            </Grid>
        </Paper>
        <Dialog open={openReturnBookFormDialog} onClose={handleCloseReturnBookFormDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Complete Transaction</DialogTitle>
        <DialogContent>
            {selectedReturnPriceDto && (selectedReturnPriceDto.price > 0 ) ?
            <>
                <DialogContentText>
                This transaction is {selectedReturnPriceDto.daysOverdue} days overdue.
                </DialogContentText>
                <DialogContentText>
                Request {selectedReturnPriceDto.price}₺ before completing this transaction!
                </DialogContentText>
            </>
            :
            <DialogContentText>
                This book transaction is not overdue. Are you sure you would like to complete this transaction?
            </DialogContentText>}
        {returnBookError && <Alert severity="error">{returnBookError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReturnBookFormDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReturnBook} color="primary" variant="contained">
            Return
          </Button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default BookTransactions;