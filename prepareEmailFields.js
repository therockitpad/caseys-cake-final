module.exports = function prepareEmailFields(body) {
    return {
        from    : 'emailexpendable4@gmail.com',
        to      : 'archit.bhonsle@gmail.com',
        subject : 'Test mail',
        text    : body
    };
};
