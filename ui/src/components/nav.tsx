import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'

import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { Dashboard, QuestionMark, Upload } from '@mui/icons-material'
import Link from 'next/link'
import { CONFIG } from '@/config'
import { useRouter } from 'next/router'

const i18n = {
    login: 'Login',
    appTitle: 'Notes',
}

export function Nav() {
    const [auth, setAuth] = React.useState(false)
    const router = useRouter()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
                        <Link href="/">{i18n.appTitle}</Link>
                    </Typography>
                    <UserProfileButton auth={auth} onLogout={() => router.push('/login')} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

function UserProfileButton({ auth, onLogout }: { auth: boolean; onLogout: () => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleLogout = async () => {
        await fetch(CONFIG.AUTH_BASE + '/logout', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') ?? '' },
        })
        localStorage.removeItem('token')
        handleClose()
        onLogout()
    }

    const handleClose = () => {
        setAnchorEl(null)
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
                <MenuItem onClick={() => handleLogout()}>Log out</MenuItem>
            </Menu>
        </div>
    )
}
