import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class NotesController {
    public async index({ response }: HttpContextContract) {
        const notes = await Database.from('notes').select('*')
        response.json({ data: notes })
    }

    public async store({ request, response }: HttpContextContract) {
        const { message } = request.body()
        response.json({ message })
    }
}
