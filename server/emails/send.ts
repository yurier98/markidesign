import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'MarkiDesign <markidesign@gmail.com>',
      to: ['markidesign@gmail.com'],
      subject: 'Nuevo mensaje desde MarkiDesign',
      html: `
      <p>Se ha enviado un nuevo mensaje desde el formulario de contacto de MarkiDesign.</p>
      <p>Aquí están los detalles del mensaje:</p>
      <ul>
        <li>Nombre : ${fullname}</li>
        <li>Correo : ${email}</li>
        <li>Teléfono : ${phone}</li>
        <li>Asunto : ${subject}</li>
        <li>Mensaje : ${message}</li>
      </ul>
      `
    })
  } catch (error) {
    return { error }
  }
})
