
import {makeStyles, Grid } from "@material-ui/core"

import Banner from "./Banner"
import Categories from "./Categories"
import Posts from "./post/Posts"

const useStyle = makeStyles(theme => ({

   
    Barpoint: {
       
        [theme.breakpoints.down('sm')]: {
            
            // marginRight:'1px'
        },
    },
    Barleft:{

        [theme.breakpoints.down('sm')]: {
            
            marginLeft:'1px',
            padding:'20px'
        },

    }
   
    
}));




const Home = () => {
    const classes =useStyle()
    return (
        <>
        <Banner />
        <Grid container>
            <Grid item lg={2} xs={12} sm={2} className={classes.Barpoint} >
                <Categories />
            </Grid>
            <Grid container item xs={12} sm={9} lg={10} className={classes.Barleft}  >
                <Posts />
            </Grid>
        </Grid>
    </>
    )
}
// 
export default Home