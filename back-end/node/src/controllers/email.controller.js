import nodemailer from 'nodemailer';

export const envioCorreo = (user, address, orderDetails) => {
    try {
        //const htmlContent = `<h1>Hola ${user.name}, tu orden ha sido recibida y está siendo procesada</h1><p>Este es un correo electrónico de prueba con contenido HTML.</p>`;
        console.log('Envío correo exitosamente');

        // Obtener la fecha y hora actual en tiempo real
        const currentDate = new Date();

        // Formatear la fecha y hora actual según el formato deseado
        const formattedDate = currentDate.toLocaleString('es-ES', {
            timeZone: 'America/Bogota', // Especificar la zona horaria deseada
            day: '2-digit',  // Obtener el día en formato de dos dígitos
            month: '2-digit', // Obtener el mes en formato de dos dígitos
            year: 'numeric', // Obtener el año en formato de cuatro dígitos
            hour: '2-digit', // Obtener la hora en formato de dos dígitos
            minute: '2-digit', // Obtener el minuto en formato de dos dígitos
            second: '2-digit' // Obtener el segundo en formato de dos dígitos
        });

        // Concatenar la fecha y hora al asunto del correo electrónico
        const subjectWithDate = `CREATE SHOP: Orden pedido - ${formattedDate}`;

        // Usar el contenido del mensaje recibido desde el frontend
        const htmlContent = `<p>${address}</p><p>${JSON.stringify(orderDetails)}</p>`/*`<h1>prueba3</h1><p>Este es un correo electrónico de prueba con contenido HTML.</p>`;*/

        // Llamada a la función para enviar el correo electrónico
        sendEmail(user.email, subjectWithDate, htmlContent);/*sendEmail(body.email, 'Orden pedido', htmlContent); */
        console.log('envio correctamente');

    } catch (error) {
        console.log('error al enviar correo', error);
    }
};

const sendEmail = async (to, subject, htmlBody) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codepruebasprog@gmail.com',
            pass: 'eljkzwbnkxiujnix',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'codepruebasprog@gmail.com',
        to: to,
        subject: subject,
        html: htmlBody,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar email: ', error);
    }
};