var loginModal = document.querySelector("#login");

if (!(sessionStorage.length === 0)) {
    loginModal.style.display = 'none';
}

const loginFunc = {

    signIn: () => {
        let modal = document.querySelector('#login');
        var username = loginUsernameInput.value;
        var password = loginPasswordInput.value;
        console.log(users);
        console.log(passwords);
        if (username === '' || password === '') {
            alert('No name or password');
            return;
        }
        var user = sha256(username);
        var pass = sha256(password);

        let check = 0;

        users.forEach((val, i) => {
            if (user === val && pass === passwords[i]) {
                check = 1;
                return true;
            }
        });
        switch (check) {
            case 1:
                console.log('Welcome');
                modal.style.display = 'none';
                sessionStorage.setItem("user", user);
                sessionStorage.setItem("pass", pass);
                location.reload();
                break;
            default:
                alert('Sorry. Incorrect username or password');
                break;
        }
    },
    isInputValid: () => {
        let x = event.target;
        let n = x.value;
        var user = sha256(n);

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
        users.push(xusername);
        passwords.push(xpassword);
        alert(`Your input has been registered successfully!\n Welcome ${username}`);
        // console.log(users);
        // console.log(passwords);
        listUsers();
        listPasswords();
        location.reload();
    },
};

var loginTab = document.querySelector(".loginTab");
loginTab.addEventListener("click", () => {
    dom.openTabs('loginForm', 'tab');
});
var registerTab = document.querySelector(".registerTab");
registerTab.addEventListener("click", () => {
    dom.openTabs('registerForm', 'tab');
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

