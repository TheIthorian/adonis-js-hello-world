import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Note from 'App/Models/Note'

export default class NotesController {
    public async index({ response, auth }: HttpContextContract) {
        await auth.use('api').authenticate()

        const notes = await Database.from('notes')
            .select('*')
            .where('user', auth.use('api').user?.id!)
        response.json({ data: notes })
    }

    public async store({ request, response, auth }: HttpContextContract) {
        await auth.use('api').authenticate()

        const noteSchema = schema.create({
            message: schema.string({ trim: true }),
        })

        const data = await request.validate({ schema: noteSchema })

        const note = await Note.create({
            message: data.message,
            userId: auth.use('api').user!.id,
        })

        response.json({ data: { note } })
    }
}
