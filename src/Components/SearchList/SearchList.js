import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 300,
        maxHeight: 230,
        overflow: 'auto',
        zIndex: 100,
        position: "absolute",
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    },
    demo: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    listItemCss: {
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    }
}));

export default function SearchList({ selectedItem, data }) {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);

    function renderListItem() {
        if (data && data.length > 0) {
            return data.map((item, index) => {
                const url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

                return <ListItem className={classes.listItemCss}>
                    <ListItemAvatar>
                        <img src={url} alt={item.title} title={item.overview} style={{
                            height: '30px',
                            width: '30px',
                            borderRadius: '15px'
                        }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={item.original_title}
                    />
                    <ListItemSecondaryAction onClick={() => selectedItem(item)}>
                        <IconButton edge="end" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            })
        } else {
            return <ListItem className={classes.listItemCss}>
                <ListItemText
                    primary='No Results Found'
                />
            </ListItem>
        }
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {renderListItem()}
                    </List>
                </div>
            </Grid>
        </div>
    );
}
