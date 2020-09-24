module.exports = function prepareEmailFields(body) {
    const { name, email, phone, occasions, date, time, message } = body;
    if (!(name && email && phone && occasions && date))
        throw new Error('Empty fields');
    const subject = `${occasions} cake on ${date}`;
    const text = `
    Name: ${name}
    Email: ${email}
    Phone number: ${phone}
    Date: ${date}
    Time: ${time}

    ${message}
    `;
    return {
        from    : 'emailexpendable4@gmail.com',
        to      : 'archit.bhonsle@gmail.com',
        subject : subject,
        text    : text
    };
};
