
import { Grid} from "@material-ui/core"

import UserPosts from "./userpost"
import UserTop from "./userTop"

const Profile= () => {
    return (
        <>
       
            <Grid container >
                <Grid container item  xs ={12} >
                  <UserTop />
               
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <UserPosts/>
                </Grid>


            </Grid>

        </>
    )
}
// 
export default Profile