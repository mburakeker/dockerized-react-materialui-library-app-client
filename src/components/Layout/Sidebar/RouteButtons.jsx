import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
const menus = [
    { label: "Book Search",     url: "search-books"     },
    { label: "Manage Books",      url: "manage-books"     },
    { label: "Manage Members",    url: "manage-members"   },
    { label: "Book Transactions",url: "book-transactions" },
    { label: "Daily Reports",    url: "daily-reports"     }
]
const DrawerRouteButtons = () => {
  return (
    <List>
        {
            menus.map((menu,index)=>{
                return(
                    <ListItem key={index} button component={RouterLink} to={`/${menu.url}`}>
                        <Typography  color="secondary" component="p">
                            {menu.label}
                        </Typography>
                    </ListItem>
                )
            })
    }
    </List>
  );
}
export default DrawerRouteButtons;