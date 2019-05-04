
const loginModal = document.querySelector("#login");

if (localStorage.length > 0) {
    loginModal.style.display = 'none';
}

const loginFunc = {

    signIn: () => {
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
        localStorage.setItem("pass", user + pass);
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

    },
    isInputValid: () => {
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
    },
    register: () => {
        //    get inputs
        var username = registerUsernameInput.value;
        var password = registerPasswordInput.value;
        // encrypt
        var xusername = sha256(username);
        var xpassword = sha256(password);
        // console.log(xusername);
        // console.log(xpassword);
        // form validation
        if (username === '') {
            registerUsernameInput.classList.add('w3-red');
            registerUsernameInput.value = 'No input';
            return;
        }

        if (password.length <= 5) {
            registerPasswordInput.classList.add('w3-red');
            registerPasswordInput.value = 'No input';
            return;
        }

        publish('root', xusername, xpassword);
        alert(`Your input has been registered successfully!\n Welcome ${username}`);
        // console.log(users);
        // console.log(passwords);        
        location.reload();
    },
};

const loginTab = document.querySelector(".loginTab");
loginTab.addEventListener("click", () => {
    dom.openTabs('loginForm', 'start');
    loginTab.classList.add('w3-gray');
    registerTab.classList.remove('w3-gray');

});
const registerTab = document.querySelector(".registerTab");
registerTab.addEventListener("click", () => {
    dom.openTabs('registerForm', 'start');
    loginTab.classList.remove('w3-gray');
    registerTab.classList.add('w3-gray');
});

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        loginFunc.signIn();
    }
});

const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        loginFunc.register();
    }
});

const loginSubmit = document.querySelector("#loginSubmit");
loginSubmit.addEventListener("click", loginFunc.signIn);
const registerSubmit = document.querySelector("#registerSubmit");
registerSubmit.addEventListener("click", loginFunc.register);

