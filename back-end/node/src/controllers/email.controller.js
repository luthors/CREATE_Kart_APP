import nodemailer from 'nodemailer';

export const envioCorreo = (req, res) => {
    try {
        let body = req.body;
        const htmlContent = `<h1>Angélica es hermosa</h1><p>Este es un correo electrónico de prueba con contenido HTML.</p>`;
        sendEmail(body.email, 'Orden pedido', htmlContent);
        return res.status(200).json({
            message: 'correo enviado exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
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