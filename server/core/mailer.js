const nodemailer = require('nodemailer'),
    {consoleLog} = require('./logs');

const config = { //FIXME remove data from git!
    host: process.env.MAILER_HOST || 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAILER_LOGIN || 'easyhotels24@gmail.com',
        pass: process.env.MAILER_PASSWORD || 'easyhotels24easyhotels24',
    },
};

const configLinux = {
    port: 25,
    host: 'localhost',
    tls: {
        rejectUnauthorized: false
    },
};

const adminData = {
    name: process.env.ADMIN_NAME || 'Neuronex support',
    email: process.env.ADMIN_EMAIL || 'easyhotels24@gmail.com'//'support@neuronex.pro', //FIXME create good account!
};

const configuration = process.env.NO_LINUX_MAILER ? config : configLinux;

let transport, lastMsg;

module.exports = (msg) => { //FIXME add cool connection controller
    if (!transport) {
        transport = nodemailer.createTransport(configuration);
        consoleLog('Created transport to ' + (configuration.auth ? configuration.auth.user : 'localhost'));
    }

    setTimeout(() => {
        if (!transport || lastMsg > (Date.now() - (10000 - 10))) return;

        transport.close();
        transport = null;

        consoleLog('Closed transport to ' + (configuration.auth ? configuration.auth.user : 'localhost'));
    }, 1000 * 10);

    msg.from = `${adminData.name} <${adminData.email}>`;

    return new Promise((resolve, reject) => {
        transport.sendMail(msg, (err, info) => {
            if (err) {
                consoleLog("Send email message error:");
                consoleLog(err);
                reject(err);
                return;
            }

            consoleLog('Sent message to ' + msg.to);
            consoleLog(info);
            resolve();
        });
    });
};