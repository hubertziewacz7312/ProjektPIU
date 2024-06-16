const name_ = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const login_submit = document.querySelector('.login-submit');
const register_submit = document.querySelector('.register-submit');


    login_submit.addEventListener('click', () => {
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })

    register_submit.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name_.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.name_) {
                alert("Pomyślnie zarejestrowano");
            } else {
                alert(data);
            }
        })
    });
    

const validateData = (data) => {
    if(!data.name_){
        alertBox(data);
    } else{
        sessionStorage.name_ = data.name_;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}    
