import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
const menus = [
    { label: "Book Search",     url: "book-search"      },
    { label: "Save Books",      url: "manage-books"     },
    { label: "Save Members",    url: "manage-members"   },
    { label: "Book Transaction",url: "book-transaction" },
    { label: "Daily Report",    url: "daily-report"     }
]
const DrawerRouteButtons = () => {
  return (
    <List>
        {
            menus.map((menu,index)=>{
                return(
                    <ListItem key={index} button component={RouterLink} to={`/${menu.url}`}>
                        <ListItemText primary={menu.label} />
                    </ListItem>
                )
            })
    }
    </List>
  );
}
export default DrawerRouteButtons;