import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'

import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import { Dashboard, QuestionMark, Upload } from '@mui/icons-material'
import Link from 'next/link'
import { CONFIG } from '@/config'

const i18n = {
    login: 'Login',
    appTitle: 'Notes',
}

export function Nav() {
    const [auth, setAuth] = React.useState(false)

    const handleLogin = (authData: boolean) => {
        setAuth(authData)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
                        <Link href="/">{i18n.appTitle}</Link>
                    </Typography>
                    <UserProfileButton auth={auth} handleLogin={handleLogin} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

function UserProfileButton({
    auth,
    handleLogin,
}: {
    auth: boolean
    handleLogin: (authData: boolean) => void
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogout = async () => {
        handleLogin(false)
        await fetch(CONFIG.AUTH_BASE + '/logout', {
            method: 'POST',
            headers: { jwt: localStorage.getItem('jwt') ?? '' },
        })
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    if (!auth) {
        return (
            <Button color="inherit" onClick={() => handleLogin(true)}>
                Login
            </Button>
        )
    }

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => handleLogout()}>Log out</MenuItem>
            </Menu>
        </div>
    )
}
