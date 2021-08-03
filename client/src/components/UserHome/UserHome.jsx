
import { Grid } from "@material-ui/core"

import ProfileTop from "./profiletop"
import Posts from "./Posts"


const UserHome = () => {
    return (
        <>
       
            <Grid container >
                <Grid container item  xs ={12} >
                  <ProfileTop/>
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>


            </Grid>

        </>
    )
}
// 
export default UserHome