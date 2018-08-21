

//onclick event of button click
$("#sign-in").on("click", function(event){
    event.preventDefault(); 
    $("#login-view").empty();
    $("#landing-header-view").empty();
    var a = $("<form>");
    a.addClass("signin-user-view")
    //sign in username and password and sign in button and sign up link.
    //TODO - check the form labels for correctness.  
    //TODO - how is the form data being transfered.  Updated needed?
    a.append("<div class='row'><div class='col-sm-4'></div><div class='col-sm-4 sign-in-form'><h3>Sign In</h3><br><input type='text' name='username' value='UserName'><br><br><input type='text' name='Password' value='password'><br><br><input type='submit' id='submit-user' href='UserPage.html' value='Submit'><br><br> <button class='new-user'>New? Sign up Now.</button> <div class='col-sm-4'></div></div>");
    $("#login-view").append(a);
    
})

//onclick event of button click
$("#new-user").on("click", function(event){
    event.preventDefault(); 
    $("#login-view").empty();
    $("#landing-header-view").empty();
    $("#sign-in").empty();
    var a = $("<form>");
    a.addClass("new-user-view")
    //sign up first last, username, email, password, create acount button, already user, sign in link
    //create account button send to user dashboard page and load html
        //TODO - check the form labels for correctness.  
    //TODO - how is the form data being transfered.  Updated needed?
    //Sign in or create user button in form needs to go user dashboard.
    a.append("<div class='row'><div class='col-sm-3'></div><div class='col-sm-6 sign-in-form'><h3>Create Account</h3><br><input type='text' name='firstname' value='FirstName'><br><br><input type='text' name='lastname' value='LastName'><br><br><input type='text' name='username' value='UserName'><br><br><input type='text' name='zipcode' value='ZipCode'><br><br><input type='text' name='email' value='Email'><br><br><input type='text' name='password' value='Password'><br><br><input type='submit' id='submit-user' value='Submit'></div><div class='col-sm-3'></div></div>");
    $("#login-view").append(a);
})

//onclick event of - send to user dashboard 
$("#submit-user").on("click", function(event){
    event.preventDefault(); 
    window.location = "UserPage.html";

})

