const date = new Date();
document.querySelector('.year').innerHTML = date.getFullYear();
// # do auto disappearance of aler messages
//function setTimeOut(2 args: func and time==3000 or 3 seconds)
setTimeout(
    function(){
        $('#message').fadeOut('slow');
    },3000);

// csrf_token settings
(function(){
    var csrf_token = Cookies.get('csrftoken');
    console.log('where is my token:',csrf_token);
    $.ajaxSetup(
        {headers:{'X-CSRFToken':csrf_token}}
    );

})();

$(".need_auth").submit(function(e){
        console.log('Inside need_auth');
        var loginZoo = $("#loginZoo");
        e.preventDefault();
         var but_submit = $(this);
         var url = $(this).attr('action');
         var data = $(this).serialize();
         var request = $.ajax({
            url:url,
            method:'POST',
            data:data
        })
        // success
        request.done(function(data, textStatus, xhr){
            //console.log(data); //{'html':"",form":{...},location:"/"}
            //console.log(textStatus); //success
            //console.log(xhr);        // xhr with all k,v{}
            window.location='/';
            }

        );
        //fail
        request.fail(function( jqXHR, textStatus ){
            console.log( "Request failed: " + textStatus );
            try {
                var errLogin = jqXHR.responseJSON.form.errors;
                if (errLogin){
                    loginZoo.html(errLogin);
                    loginZoo.addClass("alert alert-danger");
                }
            }
            catch{
                console.log("it's not login error");
            }
            try{

                var errName = jqXHR.responseJSON.form.fields.username.errors;
                var errMail = jqXHR.responseJSON.form.fields.email.errors;
                var errPsw1 = jqXHR.responseJSON.form.fields.password1.errors;
                var errPsw2 = jqXHR.responseJSON.form.fields.password2.errors;
                console.log(errName);
                if(errName){
                    $("#userName").html(errName);
                    $("#userName").addClass("alert alert-danger");
                }

                if(errPsw1){
                    psw1 = $("#psw1");
                    psw1.html(errPsw1);
                    psw1.addClass("alert alert-danger");
                }
                if(errPsw2){
                    $("#psw2").html(errPsw2);
                    $("#psw2").addClass("alert alert-danger");
                }

                if(errMail){
                    $("#mail").html(errMail);
                    $("#mail").addClass("alert alert-danger");
                }
            }
            catch{
                console.log("it was not signup call")
            }
        }); //end error

});
//Option: make another css class instead of built-in
// bootstrap "alert alert-danger"
        // $('h3').css({
        //     "color":"blue",
        //     "border":"2px solid orange",
        //     "font-family":"sans-serif",
        //     "text-align":"center"
        // });
