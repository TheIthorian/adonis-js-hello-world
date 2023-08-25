import { CONFIG } from '@/config'
import React from 'react'
import { Box, Button, Card, Typography, Input } from '@mui/material'

async function getNotes() {
    const res = await fetch(CONFIG.API_URL + '/notes', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token') ?? '',
        },
    })

    if (!res.ok) {
        throw new Error('Error fetching data', { cause: await res.json() })
    }

    return (await res.json()).data
}

export function Notes() {
    const [notes, setNotes] = React.useState<Array<{ id: number; message: string }>>()

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
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 1,
                    p: 1,
                }}
            >
                <AddNote
                    onAdd={(id, message) => {
                        setNotes((oldNotes) => [{ id, message }, ...(oldNotes ?? [])])
                    }}
                />
            </Card>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {notes.map((note) => (
                    <Card key={note.id} sx={{ m: 1, p: 1 }}>
                        <Typography>{note.message}</Typography>
                    </Card>
                ))}
            </Box>
        </>
    )
}

function AddNote({ onAdd }: { onAdd: (id: number, message: string) => void }) {
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetch(CONFIG.API_URL + '/notes', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') ?? '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })

        const responseData = await res.json()
        console.log({ responseData })
        onAdd(responseData.data.note.id, responseData.data.note.message)
        setMessage('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a note"
                sx={{ width: '100%' }}
            />
            <Button sx={{ mt: 2 }} type="submit" disabled={error !== '' || !message}>
                Add
            </Button>
            {error && <p>{error}</p>}
        </form>
    )
}
