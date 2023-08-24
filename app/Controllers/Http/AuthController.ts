import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        // create validation schema for expected user form data
        const userSchema = schema.create({
            username: schema.string({ trim: true }, [
                rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
            ]),
            password: schema.string({}, [rules.minLength(8)]),
        })

        // get validated data by validating our userSchema
        // if validation fails the request will be automatically redirected back to the form
        const data = await request.validate({ schema: userSchema })

        // create a user record with the validated data
        const user = await User.create({
            username: data.username,
            password: await Hash.make(data.password),
        })

        response.json({ message: 'User registered successfully', data: user })
    }

    public async login({ request, response, auth }: HttpContextContract) {
        // validate the user credentials and retrieve the user
        const user = await auth.attempt(request.input('username'), request.input('password'), {
            expiresIn: '7days',
        })
        response.json({ message: 'User logged in successfully', data: user })
    }

    public async logout({ response, auth }: HttpContextContract) {
        // logout the user
        await auth.logout()
        response.json({ message: 'User logged out successfully' })
    }
}
