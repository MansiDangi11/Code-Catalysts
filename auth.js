const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const confirmPassword = document.getElementById("confirmPassword");
const authBtn = document.getElementById("authBtn");

const switchText = document.querySelector(".switch-text");


loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    confirmPassword.style.display = "none";

    authBtn.textContent = "Enter MindBloom";

    switchText.innerHTML = `
        New here?
        <span>Create an account</span>
    `;

});


signupTab.addEventListener("click", () => {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    confirmPassword.style.display = "block";

    authBtn.textContent = "Create Account";

    switchText.innerHTML = `
        Already have an account?
        <span>Login</span>
    `;

});


// =========================
// AUTHENTICATION
// =========================


authBtn.addEventListener("click", async () => {


    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    const isSignup = signupTab.classList.contains("active");


    if(isSignup){


        const confirm = confirmPassword.value;


        if(password !== confirm){

            alert("Passwords do not match 🌸");
            return;

        }


        const { data, error } = await supabaseClient.auth.signUp({

            email: email,

            password: password

        });


        if(error){

            alert(error.message);

        }else{

            alert("Welcome to MindBloom 🌸");

            window.location.href = "index.html";

        }



    } else {


        const { data, error } = await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


        if(error){

            alert(error.message);

        }else{

            window.location.href = "index.html";

        }


    }


});