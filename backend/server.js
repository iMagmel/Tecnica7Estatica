const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar conexión de email
transporter.verify((error, success) => {
    if (error) {
        console.log('Error configurando email:', error);
    } else {
        console.log('Servidor de email listo');
    }
});

// Ruta para preinscripciones
app.post('/enviar-preinscripcion', async (req, res) => {
    try {
        const formData = req.body;
        console.log('📨 Recibiendo preinscripción:', formData.estudiante.nombre);

        // Email al tutor
        const emailTutor = {
            from: `"Escuela Técnica 7" <${process.env.EMAIL_USER}>`,
            to: formData.tutor.email,
            subject: 'Confirmación de Preinscripción - Escuela Técnica 7',
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; }
        .header { background: #1a2a6c; color: white; padding: 25px; text-align: center; }
        .content { padding: 25px; }
        .info-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { background: #1a2a6c; color: white; padding: 20px; text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Escuela Técnica N°7 de Banfield</h1>
        <p>Formando técnicos profesionales desde 1948</p>
    </div>
    
    <div class="content">
        <h2>¡Preinscripción Recibida Exitosamente!</h2>
        
        <p>Estimado/a <strong>${formData.tutor.nombre} ${formData.tutor.apellido}</strong>,</p>
        
        <p>Hemos recibido la preinscripción de <strong>${formData.estudiante.nombre} ${formData.estudiante.apellido}</strong> para el ciclo lectivo 2025.</p>
        
        <div class="info-box">
            <h3>📋 Resumen de la Preinscripción:</h3>
            <p><strong>Estudiante:</strong> ${formData.estudiante.nombre} ${formData.estudiante.apellido}</p>
            <p><strong>DNI:</strong> ${formData.estudiante.dni}</p>
            <p><strong>Curso solicitado:</strong> ${formData.estudiante.curso}</p>
            <p><strong>Fecha de envío:</strong> ${new Date().toLocaleDateString('es-AR')}</p>
        </div>
        
        <h3>🔄 Próximos Pasos:</h3>
        <ol>
            <li>Nos pondremos en contacto en los próximos 5 días hábiles</li>
            <li>Te enviaremos la documentación requerida</li>
            <li>Coordinaremos una entrevista informativa</li>
        </ol>
        
        <p><strong>📞 Contacto:</strong></p>
        <p>Teléfono: +54 11 4241-5678<br>
           Email: contacto@tecnica7banfield.edu.ar<br>
           Dirección: Manuel Acevedo 1864, Banfield</p>
    </div>
    
    <div class="footer">
        <p>© 2024 Escuela Técnica N°7 de Banfield</p>
        <p>Este es un email automático, por favor no responder</p>
    </div>
</body>
</html>`
        };

        // Email al colegio
        const emailColegio = {
            from: `"Sistema de Preinscripciones" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_COLEGIO,
            subject: `📝 NUEVA PREINSCRIPCIÓN - ${formData.estudiante.nombre} ${formData.estudiante.apellido}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .header { background: #b21f1f; color: white; padding: 20px; }
        .content { padding: 20px; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #1a2a6c; min-width: 200px; display: inline-block; }
        .urgent { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 NUEVA PREINSCRIPCIÓN RECIBIDA</h1>
        <p>Sistema Automático de Preinscripciones</p>
    </div>
    
    <div class="content">
        <div class="urgent">
            <strong>⚠️ ACCIÓN REQUERIDA:</strong> Contactar al tutor dentro de las próximas 72 horas.
        </div>
        
        <div class="section">
            <h2>👤 DATOS DEL ESTUDIANTE</h2>
            <div class="field"><span class="label">Nombre completo:</span> ${formData.estudiante.nombre} ${formData.estudiante.apellido}</div>
            <div class="field"><span class="label">DNI:</span> ${formData.estudiante.dni}</div>
            <div class="field"><span class="label">Fecha nacimiento:</span> ${formData.estudiante.fechaNacimiento}</div>
            <div class="field"><span class="label">Curso solicitado:</span> ${formData.estudiante.curso}</div>
            <div class="field"><span class="label">Especialidad:</span> ${formData.estudiante.especialidad || 'No especificada'}</div>
        </div>
        
        <div class="section">
            <h2>👨‍👩‍👧‍👦 DATOS DEL TUTOR</h2>
            <div class="field"><span class="label">Tutor:</span> ${formData.tutor.nombre} ${formData.tutor.apellido}</div>
            <div class="field"><span class="label">DNI tutor:</span> ${formData.tutor.dni}</div>
            <div class="field"><span class="label">Parentesco:</span> ${formData.tutor.parentesco}</div>
            <div class="field"><span class="label">Email:</span> ${formData.tutor.email}</div>
            <div class="field"><span class="label">Teléfono:</span> ${formData.tutor.telefono}</div>
        </div>
        
        <div class="section">
            <h2>📞 INFORMACIÓN DE CONTACTO</h2>
            <div class="field"><span class="label">Domicilio:</span> ${formData.contacto.domicilio}</div>
            <div class="field"><span class="label">Localidad:</span> ${formData.contacto.localidad}</div>
            <div class="field"><span class="label">Tel. alternativo:</span> ${formData.contacto.telefonoAlternativo || 'No especificado'}</div>
        </div>
        
        <div class="section">
            <h2>📊 INFORMACIÓN ACADÉMICA</h2>
            <div class="field"><span class="label">Escuela anterior:</span> ${formData.academico.escuelaAnterior}</div>
            <div class="field"><span class="label">Último curso:</span> ${formData.academico.ultimoCurso}</div>
            <div class="field"><span class="label">Promedio:</span> ${formData.academico.promedio || 'No especificado'}</div>
        </div>
        
        <div class="section">
            <h2>📋 DATOS DEL REGISTRO</h2>
            <div class="field"><span class="label">Fecha de envío:</span> ${new Date().toLocaleDateString('es-AR')}</div>
            <div class="field"><span class="label">Hora de envío:</span> ${new Date().toLocaleTimeString('es-AR')}</div>
        </div>
    </div>
</body>
</html>`
        };

        // Enviar ambos emails
        await transporter.sendMail(emailTutor);
        console.log('✅ Email de confirmación enviado al tutor');

        await transporter.sendMail(emailColegio);
        console.log('✅ Notificación enviada al colegio');

        res.status(200).json({ 
            success: true, 
            message: 'Preinscripción enviada y emails distribuidos correctamente' 
        });

    } catch (error) {
        console.error('❌ Error enviando emails:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al enviar los emails: ' + error.message 
        });
    }
});

// Ruta para consultas de contacto
app.post('/enviar-consulta', async (req, res) => {
    try {
        const consultaData = req.body;
        console.log('📧 Recibiendo consulta de:', consultaData.nombre);

        // Email al colegio
        const emailColegio = {
            from: `"Sistema de Contacto" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_COLEGIO,
            subject: `📞 NUEVA CONSULTA - ${consultaData.asunto}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .header { background: #1a2a6c; color: white; padding: 20px; }
        .content { padding: 20px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #1a2a6c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📞 NUEVA CONSULTA RECIBIDA</h1>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="label">Nombre:</span> ${consultaData.nombre}
        </div>
        <div class="field">
            <span class="label">Email:</span> ${consultaData.email}
        </div>
        <div class="field">
            <span class="label">Teléfono:</span> ${consultaData.telefono || 'No especificado'}
        </div>
        <div class="field">
            <span class="label">Asunto:</span> ${consultaData.asunto}
        </div>
        <div class="field">
            <span class="label">Mensaje:</span><br>
            ${consultaData.mensaje}
        </div>
        <div class="field">
            <span class="label">Fecha:</span> ${new Date().toLocaleDateString('es-AR')}
        </div>
    </div>
</body>
</html>`
        };

        await transporter.sendMail(emailColegio);
        console.log('Notificación de consulta enviada al colegio');

        res.status(200).json({ 
            success: true, 
            message: 'Consulta enviada correctamente' 
        });

    } catch (error) {
        console.error('Error enviando consulta:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al enviar la consulta: ' + error.message 
        });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Servidor de Técnica 7 funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});