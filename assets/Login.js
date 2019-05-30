
 console.log(`Connect root for login`);    
connect('root');

const loginCreds = [];

const publish = (k, tx) => {
    multichain.publish({
        stream: 'root',
        key: k,
        data: {
            text: tx
        },
    }, (err, info) => {
        if (err) {
            console.log(err)
        }
        alert(`Your input has been registered successfully!\n
        \n You can now login with you credentials`);
        location.reload();
    });
};
const getItems = () => {
    multichain.listStreamItems({
        stream: 'root'
    }, (err, res) => {
        if (err) {
            console.log(err)
            return;
        }
        res.forEach((val) => {
            loginCreds.push(val)
        });
    });
}
const isUserValid = (n, p) => {
    for (var i = 0; i < loginCreds.length; i++) {
        if (n === loginCreds[i].keys[0] && p === loginCreds[i].data.text) {
            return true;
        }
    }
    return false;
};
const checkInput = (input) => {
    if (input.value === '') {
        input.classList.add('w3-red');
        input.value = 'No input';
    }
};
const checkPassword = (input) => {
    if (input.value.length <= 7) {
        console.log('password too short')
        return false;
    }
    return true;
}
const signIn = () => {
    let username = loginUsernameInput.value;
    let password = loginPasswordInput.value;
    checkInput(loginUsernameInput)
    checkInput(loginPasswordInput)

    var user = sha256(username);
    var pass = sha256(password);

    if (isUserValid(user, pass)) {
        location.assign(`${__dirname}\\chainBrowser.html`);        
    } else {
        error.textContent = 'Sorry, wrong username and password';
    }
};
const register = () => {
    //    get inputs
    var username = registerUsernameInput.value;
    var password = registerPasswordInput.value;
    checkInput(registerUsernameInput);
    checkInput(registerPasswordInput);
    var xusername = sha256(username);
    var xpassword = sha256(password);
    if (!(checkPassword(registerPasswordInput))) {
        return;
    }
    // form validation
    publish(xusername, xpassword);
};

// Tab select
loginTab.addEventListener("click", () => {
    getItems()
    dom.openTabs('loginForm', 'start');
    loginTab.classList.add('w3-gray');
    registerTab.classList.remove('w3-gray');
});
registerTab.addEventListener("click", () => {
    getItems()
    dom.openTabs('registerForm', 'start');
    loginTab.classList.remove('w3-gray');
    registerTab.classList.add('w3-gray');
});

// Key down function
loginForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"    
        signIn();
    }
});
registerForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        register();
    }
});

// Signin/register
loginSubmit.addEventListener("click", signIn);
registerSubmit.addEventListener("click", register);
