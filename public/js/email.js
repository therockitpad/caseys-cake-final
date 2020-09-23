function sendEmail() {
    let emailForm = document.getElementById('email-form').elements;
    let emailDetails = {};
    for (let i = 0; i < emailForm.length; ++i) {
        if (emailForm[i].value) {
            emailDetails[emailForm[i].name] = emailForm[i].value;
        }
    }
    console.log(emailDetails);
    fetch('/', {
        method      : 'POST',
        mode        : 'same-origin',
        cache       : 'no-cache',
        credentials : 'same-origin',
        headers     : {
            'Content-Type' : 'application/json'
        },
        //   redirect: 'follow',
        //   referrerPolicy: 'no-referrer',
        body        : JSON.stringify(emailDetails)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function setButtonText(text) {
    const btn = document.getElementById('submit-button');
    btn.innerHTML(text);
}
