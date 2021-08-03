import { useTheme,Menu,MenuItem,FormGroup,FormControlLabel,Switch,IconButton,Typography,Toolbar,AppBar,makeStyles, useMediaQuery, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import React , {useContext,useRef,useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import { UserContext } from '../App';
import { UserContext } from '../App';

const useStyle = makeStyles((theme)=>({
    component: {
        background: '#FFFFFF',
        color: 'black',
        width:'100%'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    },
    title:{
        [theme.breakpoints.down("xs")]:{
            flexGrow: 1 
          }
    },
    headerOptions: {
        display:"flex",
        flex:1,
        justifyContent: "space-evenly",
     
  
    }
}))

const Header = () => {
    const classes = useStyle();
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
    const handleChange = (event) => {
        setAuth(event.target.checked);
      };
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleMenuClick = (pageURL) => {
        history.push(pageURL)
      setAnchorEl(null);
    };
    const handleButtonClick = (pageURL) => {
      history.push(pageURL)
   
     };

     const menuItems = [
        {
              menuTitle: 'Home',
              pageURL: '/'
        },
        {
           menuTitle: 'Login',
           pageURL: '/signin'
        },
        {
           menuTitle: 'Register',
           pageURL: '/signup'
        },
       {
       menuTitle: 'Profile',
       pageURL: '/home'
       },
       {
        menuTitle: 'CreateProjectTicket',
        pageURL: '/create'
        },
        {
          menuTitle: 'Logout',
          pageURL: '#'
          }
        
   
      
   
    ]
   
  const handle =()=>{
   console.log(state)
  }

  console.log(state)


  
    return (
        
        <AppBar className={classes.component} position="static">
            <Toolbar className={classes.container}>
            <Typography variant="h6" className={classes.title}>
           <Link to ='/' style={{textDecoration:'none',color:'inherit'}}> ProjectConnector</Link>
          </Typography>   

                {isMobile?(<>
               
               <IconButton
           edge="start"
           className={classes.menuButton} 
           color="inherit"
           aria-label="menu"
           onClick={handleMenu}
           // color="inherit"
         >
           <MenuIcon />
         </IconButton>

         <Menu
           id="menu-appbar"
           anchorEl={anchorEl}
           anchorOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           keepMounted
           transformOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           open={open}
           onClose={ ()=> setAnchorEl(null)}
         >
             { 
             menuItems.map((menuItem)=>{
                 const {menuTitle,pageURL}=  menuItem;
                if(state ){
               
                  if(menuTitle=='Logout'){
                    return(
                     <>
                     <MenuItem onClick={()=>{
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/')
                       }}>
                         {menuTitle}
                         </MenuItem>
                     </>
                 )
                      }
                 else if(menuTitle=='Login'||menuTitle=='Register'){
                     return(<></>)
                 }
                  else{
                    return(
                      <>
                      <MenuItem onClick={()=>handleMenuClick(pageURL)}>
                          {menuTitle}
                          </MenuItem>
                      </>
                  )
                  }
                     
                }else{
                  if(menuTitle!=='Logout' ){
                   if(menuTitle=='CreateProjectTicket'){
                    return(
                      <>
                     <MenuItem onClick={()=>{
                 
                      history.push('/signin')
                       }}>
                         {menuTitle}
                         </MenuItem>
                     </>
                  )
                   }

                    return(
                    <>
                    <MenuItem onClick={()=>handleMenuClick(pageURL)}>
                        {menuTitle}
                        </MenuItem>
                    </>
                )
                
                  }
                   
                }
                 
               //   <MenuItem onClick={()=> handleMenuClick('/')}>Home</MenuItem>
             })
 
             }
          
            
           {/* <MenuItem onClick={()=> handleMenuClick('/')}>Home</MenuItem>
           <MenuItem onClick={()=> handleMenuClick('/profile')}>Profile</MenuItem>
           <MenuItem onClick={()=> handleMenuClick('/signin')}>Login</MenuItem>
           <MenuItem onClick={()=> handleMenuClick('/signup')}>Regster</MenuItem> */}
         </Menu>
          
          
           </>
               ):(
                   <div className={classes.headerOptions}>
                  
                  { 
             menuItems.map((menuItem)=>{
                 const {menuTitle,pageURL}=  menuItem;
                if(state ){
                //   if(1){
                //     return(
                //      <>
                //      <MenuItem onClick={()=>handleMenuClick(pageURL)}>
                //          {menuTitle}
                //          </MenuItem>
                //      </>
                //  )
                //   }
                  if(menuTitle=='Logout'){
                    return(
                     <>
                     <MenuItem onClick={()=>{
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/signin')
                       }}>
                         {menuTitle}
                         </MenuItem>
                     </>
                 )
                  }
                  else if(menuTitle=='Login'||menuTitle=='Register'){
                    return(<></>)
                }else{
                    return(
                      <>
                      <MenuItem onClick={()=>handleMenuClick(pageURL)}>
                          {menuTitle}
                          </MenuItem>
                      </>
                  )
                  }
                     
                }else{
                  if(menuTitle!=='Logout' ){
                   if(menuTitle=='CreateProjectTicket'){
                    return(
                      <>
                     <MenuItem onClick={()=>{
                 
                      history.push('/signin')
                       }}>
                         {menuTitle}
                         </MenuItem>
                     </>
                  )
                   }

                    return(
                    <>
                    <MenuItem onClick={()=>handleMenuClick(pageURL)}>
                        {menuTitle}
                        </MenuItem>
                    </>
                )
                
                  }
                   
                }
                 
               //   <MenuItem onClick={()=> handleMenuClick('/')}>Home</MenuItem>
             })
 
             }

                 {/* <Button variant ="contained" onClick={()=> handleButtonClick('/')}>Home</Button>
                 <Button variant ="contained"  onClick={()=> handleButtonClick('/profile')}>profile</Button>
                 <Button variant ="contained"  onClick={()=> handleButtonClick('/signin')}>Login</Button>
                 <Button variant ="contained"  onClick={()=> handleButtonClick('/signup')}>Register</Button> */}
                   </div>
               )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;