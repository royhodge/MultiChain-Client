
const Windows = require('./Windows');
// if (localStorage.pass === '' || localStorage.length === 0) {
//     loginModal.style.display = 'flex';
// } else {
//     loginModal.style.display = 'none';
// }


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
        alert(`Your input has been registered successfully!\n Welcome ${tx}`);
        // console.log(users);
        // console.log(passwords);
        location.reload();
    });
};

const signIn = () => {
    let modal = document.querySelector('#login');
    var username = loginUsernameInput.value;
    var password = loginPasswordInput.value;

    if (username === '' || password === '') {
        loginUsernameInput.classList.add('w3-red');
        loginUsernameInput.value = 'No input';
        loginPasswordInput.classList.add('w3-red');
        return;
    }
    var user = sha256(username);
    var pass = sha256(password);
    multichain.listStreamItems({
        stream: 'root'
    }, (err, res) => {
        if (err) {
            loginUsernameInput.classList.add('w3-red');
            loginUsernameInput.value = 'User or password is incorrect';
            loginPasswordInput.classList.add('w3-red');
            return;
        }
        res.forEach((val) => {
            if (user === val.keys[0] && pass === val.data.text) {
                modal.style.display = 'none';
                console.log(`Welcome ${username}`);
            }
        });
        localStorage.setItem("pass", user + pass);
        Windows.chainBrowser()
        window.close()
    });
};

const isUserValid = () => {
    let x = event.target;
    let n = x.value;
    var user = sha256(n);

    multichain.listStreamItems({
        stream: 'root'
    }, (err, res) => {
        res.forEach((val) => {
            if (user === val.keys[0] && pass === val.data.text) {
                modal.style.display = 'none';
                console.log("hey");
            } else {
                loginUsernameInput.classList.add('w3-red');
                loginUsernameInput.value = 'User or password is incorrect';
                loginPasswordInput.classList.add('w3-red');
            }
        });
    });

    users.forEach((val) => {
        if (user === val) {
            alert('That name has been used');
            registerUsernameInput.value = '';
            return;
        }
    });
};
const isRegisterValid = (username, password) => {
    if (username === '') {
        registerUsernameInput.classList.add('w3-red');
        registerUsernameInput.value = 'No input';
        return;
    }

    if (password.length <= 8) {
        registerPasswordInput.classList.add('w3-red');
        registerPasswordInput.value = 'No input';
        return;
    }
};

const register = () => {
    //    get inputs
    var username = registerUsernameInput.value;
    var password = registerPasswordInput.value;
    // encrypt
    var xusername = sha256(username);
    var xpassword = sha256(password);
    console.log(xusername);
    console.log(xpassword);
    // form validation
    isRegisterValid(username, password);
    publish(xusername,xpassword);
};

// Tab select
loginTab.addEventListener("click", () => {
    dom.openTabs('loginForm', 'start');
    loginTab.classList.add('w3-gray');
    registerTab.classList.remove('w3-gray');

});
registerTab.addEventListener("click", () => {
    dom.openTabs('registerForm', 'start');
    loginTab.classList.remove('w3-gray');
    registerTab.classList.add('w3-gray');
});

// Key down function
loginForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        signIn();
    }
});
registerForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        register();
    }
});

// Signin/register
loginSubmit.addEventListener("click", signIn);
registerSubmit.addEventListener("click", register);
