import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {NavLink} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import {withStyles} from '@material-ui/core/styles'
import history from '../history'

export default function AccountMenu(props) {
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      backgroundColor: '#F7F5FB',
      borderRadius: '1px',
    },
  })((props) => <Menu {...props} />)

  const {isLoggedIn, handleLogout} = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutAndClose = () => {
    handleClose()
    handleLogout()
  }

  const handleRedirect = (strMethod) => {
    handleClose()
    history.push(`/${strMethod}`)
  }

  return (
    <div>
      <Button className="container-center-column" onClick={handleMenu}>
        <div>Anderson</div>
        <div>Chan</div>
        <MenuIcon />
      </Button>
      {isLoggedIn ? (
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose /* handleRedirect('profile') */}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
          <hr />
          <MenuItem onClick={logoutAndClose}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </StyledMenu>
      ) : (
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleRedirect('login')}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            Login
          </MenuItem>
          <hr />
          <MenuItem onClick={() => handleRedirect('signup')}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            Sign Up
          </MenuItem>
        </StyledMenu>
      )}
    </div>
  )
}
