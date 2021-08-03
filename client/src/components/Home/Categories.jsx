import { Button, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

import { categories } from '../../constants/data';
import { UserContext } from '../../App';
import { useContext } from 'react';

const useStyle = makeStyles({
    table: {
        border: '1px solid rgba(224, 224, 224, 1)',

        wordWrap: 'break-word'
    },
    write: {
        margin: 20,
        width: '85%',

        textDecoration: 'none'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        wordWrap: 'break-word'
    }
})

const Categories = ({ match }) => {
    const { state, dispatch } = useContext(UserContext)
    const classes = useStyle();
    const location = useLocation();
    let params = new URLSearchParams(location.search);
    return (
        <>
            {state ? (<Link to={`/create/${location.search}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color='secondary' className={classes.write}>Create Ticket</Button>
            </Link>) : (<Link to={'/signin'} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color='secondary' className={classes.write}>Create Ticket</Button>
            </Link>)}

            <Table className={classes.table}>
                <TableHead>
                    <TableCell>
                        <Link to={"/"} className={classes.link}>
                            All Categories
                        </Link>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell>
                                    <Link to={`/?category=${category}`} className={classes.link}>
                                        {category}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Categories;