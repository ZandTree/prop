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

//$(...).load(url,data,function(response,status,xhr))
$(".need_auth").submit(function(e){
        console.log('Inside need_auth');
        var loginZoo = $("#loginZoo");

        e.preventDefault();
         var but_submit = $(this);
         var url = $(this).attr('action');
         var data = $(this).serialize();
         $.ajax({
            url:url,
            type:'POST',
            data:data,
            success:function(res){
                //console.log("YEs!!!!!!!!!!!");
                window.location='/';
            },
            error:function(xhr,status,error){
                console.log('xhr',xhr);
                console.log(error); //Bad Request
                console.log(status); // error
                console.log('xhr state status',xhr.state);

                var errLogin = xhr.responseJSON.form.errors;
                if (errLogin){
                    loginZoo.html(errLogin);
                    loginZoo.addClass("alert alert-danger");
                }

                //console.log(res);
                var errMail = xhr.responseJSON.form.fields.email.errors;
                var errPsw1 = xhr.responseJSON.form.fields.password1.errors;
                var errPsw2 = xhr.responseJSON.form.fields.password2.errors;
                var errName = xhr.responseJSON.form.fields.username.errors;
                if(errPsw1){
                    psw1 = $("#psw1");
                    psw1.html(errPsw1);
                    psw1.addClass("alert alert-danger");

                }
                if(errPsw2){
                    $("#psw2").html(errPsw2);
                    $("#psw2").addClass("alert alert-danger");
                }
                if(errName){
                    $("#userName").html(errName);
                    $("#userName").addClass("alert alert-danger");
                }
                if(errMail){
                    $("#mail").html(errMail);
                    $("#mail").addClass("alert alert-danger");
                }

            }

        })

        });
//Option: make another css class instead of built-in
// bootstrap "alert alert-danger"
        // $('h3').css({
        //     "color":"blue",
        //     "border":"2px solid orange",
        //     "font-family":"sans-serif",
        //     "text-align":"center"
        // });
