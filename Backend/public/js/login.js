let email= document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector(".loginBtn");

loginBtn.addEventListener("click", function(e){
    e.preventDefault;
    console.log(email.value);
    console.log(password.value);
    if(email.value && password.value)
    {
        console.log("dd");
        axios.post("http://localhost:3000/api/users/login", {email:email.value,password:password.value})
        .then(function(obj){
            console.log(obj)
        })
        .catch(function(err){
            console.log(err);
        }
        )
        
            
        
    }
    
})

