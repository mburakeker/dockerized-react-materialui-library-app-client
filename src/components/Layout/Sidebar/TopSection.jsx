import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    topSection: {
        height: '120px'
    },
    headerText: {
        color: '#000',
        float: 'left',
        fontWeight: 'bolder',
        fontSize: theme.spacing(4)
    },
    headerSubtext: {
        color: '#00000060',
        float: 'left',
        fontWeight: 'bolder',
        fontSize: theme.spacing(2),
        marginTop: '-20px',
    }
}));

const DrawerTopSection = () =>  {
    const classes = useStyles();
    return(
    <List >
        <ListItem className={classes.topSection}>
        </ListItem>
        <ListItem>
            <Typography className={classes.headerText}component="h4">
            Library
            </Typography>
        </ListItem>
        <ListItem>
            <Typography className={classes.headerSubtext} component="p">
            MENU
            </Typography>
        </ListItem>
    </List>
    );
}
export default DrawerTopSection;