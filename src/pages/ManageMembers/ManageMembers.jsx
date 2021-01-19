import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState} from 'react';
import * as moment from 'moment';
import {GetBooks, SaveBook} from '../../api/Books';
import { Alert } from '@material-ui/lab';
import { GetMembers, SaveMember, UpdateMember } from '../../api/Members';
const useStyles = makeStyles((theme)=>({
    searchButton: {
        height: '100%'
    }
}))
const initMemberForm = {
    memberId: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    homeAddress: "",
    birthDate: new Date()
}
const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [openSaveMemberFormDialog, setOpenSaveMemberFormDialog] = useState(false);
    const [createMemberForm, setCreateMemberForm] = useState(initMemberForm);
    const [saveMemberError, setSaveMemberError] = useState(null);
    const [createMemberFormValidation, setCreateMemberFormValidation] = useState(null);
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
            name: "memberId",
            label: "Member ID",
            options: {
            filter: true,
            sort: true
            }
        },
        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "lastName",
            label: "Last Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "phoneNumber",
            label: "Phone Number",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "emailAddress",
            label: "Email Address",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "homeAddress",
            label: "Home Address",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "birthDate",
            label: "Birth Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(new Date(value)).format("DD/MM/YYYY")
            }
        },
        {
            name: "registrationDate",
            label: "Registration Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(new Date(value)).format("DD/MM/YYYY")
            }
        },
        {
            name: "Update",
            label: "Update",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button variant="outlined" color="primary" onClick={() => handleUpdateMemberFormDialog(tableMeta.rowIndex)}>
                          Update
                      </Button>
                    );
            },
            }
        }
    ];
    useEffect(() => {
        fetchMembers();
    }, [])
    useEffect(() => {
        validateCreateMemberForm();
    }, [createMemberForm])

    const validateCreateMemberForm = () => {
        if(createMemberForm.firstName === ""){
            setCreateMemberFormValidation("First name is empty!");
            return;
        }
        if(createMemberForm.lastName === ""){
            setCreateMemberFormValidation("Last name is empty!");
            return;
        }
        if(createMemberForm.phoneNumber === ""){
            setCreateMemberFormValidation("Phone number is empty!");
            return;
        }
        if(createMemberForm.emailAddress === ""){
            setCreateMemberFormValidation("Email address is empty!");
            return;
        }
        if(createMemberForm.birthDate === ""){
            setCreateMemberFormValidation("Birth date is empty!");
            return;
        }
        return setCreateMemberFormValidation(null);
    }
    const fetchMembers = () => {
        GetMembers().then((res)=>{
            if(res.data.dataList != null){
                setMembers(res.data.dataList)
            }
        })
    }
    const handleCloseSaveMemberFormDialog = () => {
        setOpenSaveMemberFormDialog(false);
        setCreateMemberForm(initMemberForm);
        setTouched(false);
        setSaveMemberError(false);
    }
    const handleOpenSaveMemberFormDialog = () => {
        setOpenSaveMemberFormDialog(true);
    }
    const handleChangeCreateBookProperties = (e) => {
        setTouched(true);
        validateCreateMemberForm();
        const {name, value} = e.target;
        let newDict = {...createMemberForm};
        newDict[name] = value;
        setCreateMemberForm(newDict);
    }
    const handleSaveMember = () => {
        if(createMemberForm.memberId == 0){
            SaveMember(createMemberForm).then((res)=>{
                if(res.data.errorState === false){
                    fetchMembers();
                    handleCloseSaveMemberFormDialog();
                }else{
                    setSaveMemberError(res.data.errorList[0].message)
                }
            });
        }
        else
        {
            UpdateMember(createMemberForm).then((res)=>{
                if(res.data.errorState === false){
                    fetchMembers();
                    handleCloseSaveMemberFormDialog();
                }else{
                    setSaveMemberError(res.data.errorList[0].message)
                }
            });
        }
    }
    
    const handleUpdateMemberFormDialog = (memberId) =>{
        setCreateMemberForm(members[memberId]);
        setOpenSaveMemberFormDialog(true);
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
                onClick={handleOpenSaveMemberFormDialog}>
                    Save new member
                </Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                        <MUIDataTable
                        title={"Members"}
                        columns={columns}
                        options={options}
                        data={members!=null?members:[]}/>
                </Grid>
            </Grid>
        </Paper>
        {openSaveMemberFormDialog &&
        <Dialog open={openSaveMemberFormDialog} onClose={handleCloseSaveMemberFormDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Save Member</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please fill the details in order to save member.
            </DialogContentText>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    name="firstName"
                    onChange={handleChangeCreateBookProperties}
                    value={createMemberForm.firstName}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    name="lastName"
                    value={createMemberForm.lastName}
                    onChange={handleChangeCreateBookProperties}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    name="phoneNumber"
                    value={createMemberForm.phoneNumber}
                    onChange={handleChangeCreateBookProperties}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    name="emailAddress"
                    value={createMemberForm.emailAddress}
                    onChange={handleChangeCreateBookProperties}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    label="Home Address"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    name="homeAddress"
                    value={createMemberForm.homeAddress}
                    onChange={handleChangeCreateBookProperties}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="date"
                    label="Birth Date"
                    type="date"
                    name="birthDate"
                    defaultValue={ moment(createMemberForm.birthDate).format("YYYY-MM-DD")}
                    className={classes.textField}
                    onChange={handleChangeCreateBookProperties}
                    InputLabelProps={{
                    shrink: true,
                    }}/>
                </Grid>
            </Grid>
            {touched && createMemberFormValidation && <Alert severity="error">{createMemberFormValidation}</Alert>}
            {saveMemberError && <Alert severity="error">{saveMemberError}</Alert>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseSaveMemberFormDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSaveMember} color="primary" variant="contained" disabled={createMemberFormValidation != null}>
                Save
            </Button>
            </DialogActions>
        </Dialog> }
    </>
    )
}

export default ManageMembers;