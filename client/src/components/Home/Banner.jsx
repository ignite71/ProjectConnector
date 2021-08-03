
import { makeStyles, Box, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme)=>({
    image:{
        background: `url(${'https://images.pexels.com/photos/4316/technology-computer-chips-gigabyte.jpg?cs=srgb&dl=pexels-j%C3%A9shoots-4316.jpg&fm=jpg'}) center/50% repeat-x #000`,
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
  
        '& :first-child':{
            fontSize: 66,
            color: '#FFFFFF',
            lineHeight : 1,
            wordWrap: 'break-word',
            [theme.breakpoints.down('xs')]: {
                fontSize: 20,
            },
            
            


            
        },
        '& :last-child':{
            fontSize: 20,
            background: '#FFFFFF',
            wordWrap: 'break-word',
            [theme.breakpoints.down('xs')]: {
                fontSize: 10,
            },
         

        }

    }
}))

const Banner = ()=>{
    const classes  = useStyles()
    
    return (
       <Box className={classes.image} >
           <Typography>ProjectConnector</Typography>
           <Typography>Connecting the brilliant minds</Typography>

       </Box>
    )
}

export default Banner