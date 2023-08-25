import { CONFIG } from '@/config'
import React from 'react'
import { Box, Card, Typography } from '@mui/material'

async function getNotes() {
    const res = await fetch(CONFIG.API_URL + '/notes', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token') ?? '',
        },
    })

    if (!res.ok) {
        throw new Error('Error fetching data', { cause: await res.json() })
    }

    return await res.json()
}

export function Notes() {
    const [notes, setNotes] = React.useState<{ data: Array<{ id: number; message: string }> }>()

    React.useEffect(() => {
        getNotes()
            .then(setNotes)
            .catch((error) => {
                console.error(error)
            })
    }, [])

    if (!notes) {
        return <p>Loading...</p>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {notes.data.map((note) => (
                <Card key={note.id} sx={{ m: 1, p: 1 }}>
                    <Typography>{note.message}</Typography>
                </Card>
            ))}
        </Box>
    )
}
