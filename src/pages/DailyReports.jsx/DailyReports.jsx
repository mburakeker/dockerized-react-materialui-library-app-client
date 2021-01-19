import { Grid, Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState} from 'react';
import * as moment from 'moment';
import {GetDailyReport} from '../../api/Report';
const DailyReports = () => {
    const [dailyReports, setDailyReports] = useState([]);
    const options = {
        selectableRows: 'none',
        download: false,
        print: false
      }
    const columns = [
        {
            name: "bookName",
            label: "Book Name",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "endDate",
            label: "Return Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(new Date(value)).format("DD/MM/YYYY")
            }
        },
        {
            name: "daysOverdue",
            label: "Days Overdue",
            options: {
                filter: true,
                sort: true
            }
        }
    ];
    useEffect(() => {
        fetchDailyReports();
    }, [])
    const fetchDailyReports = () => {
        GetDailyReport().then((res)=>{
            if(res.data.dataList!=null){
                setDailyReports(res.data.dataList)
            }
        });
    }
    return(
        <>
        <Paper>
            <Grid container>
                <Grid item xs={12}>
                        <MUIDataTable
                        title={"Upcoming and Overdue Books"}
                        columns={columns}
                        options={options}
                        data={dailyReports!=null?dailyReports:[]}/>
                </Grid>
            </Grid>
        </Paper>
    </>
    )
}

export default DailyReports;