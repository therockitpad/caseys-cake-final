module.exports = function prepareEmailFields(body) {
    const { name, email, phone, persons, date, time, message } = body;
    if (!(name && email && phone && persons && date))
        throw new Error('Empty fields');
    const subject = `For ${name} on ${date}`;
    const text = `
    Name: ${name}
    Email: ${email}
    Phone number: ${phone}
    Date: ${date}
    Time: ${time}
    Guests: ${persons}

    ${message}
    `;

    return {
        from    : process.env.SENDER_MAIL,
        to      : process.env.TO_MAIL,
        subject : subject,
        text    : text
    };
};
