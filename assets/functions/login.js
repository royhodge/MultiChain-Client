
var loginModal = document.querySelector("#login");

if (sessionStorage.length > 0) {
    loginModal.style.display = 'none';
}

const loginFunc = {

    signIn: () => {
        let modal = document.querySelector('#login');
        var username = loginUsernameInput.value;
        var password = loginPasswordInput.value;

        if (username === '' || password === '') {
            alert('No name or password');
            return;
        }

        var user = sha256(username);
        var pass = sha256(password);
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
            alert('No username given');
            return false;
        }

        if (password.length <= 5) {
            alert('Your password is too short');
            return false;
        }

        publish('root', xusername, xpassword);
        alert(`Your input has been registered successfully!\n Welcome ${username}`);
        // console.log(users);
        // console.log(passwords);        
        location.reload();
    },
};

var loginTab = document.querySelector(".loginTab");
loginTab.addEventListener("click", () => {
    dom.openTabs('loginForm', 'tab');
    loginTab.classList.add('w3-gray');
    registerTab.classList.remove('w3-gray');

});
var registerTab = document.querySelector(".registerTab");
registerTab.addEventListener("click", () => {
    dom.openTabs('registerForm', 'tab');
    loginTab.classList.remove('w3-gray');
    registerTab.classList.add('w3-gray');
});

var loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        loginFunc.signIn();
    }
});

var loginSubmit = document.querySelector("#loginSubmit");
loginSubmit.addEventListener("click", loginFunc.signIn);


var registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        loginFunc.register();
    }
});

var registerSubmit = document.querySelector("#registerSubmit");
registerSubmit.addEventListener("click", loginFunc.register);

