
var pw = {

    isEmail: function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },


    validateForm: function() {
        var deferred = new $.Deferred();

        // Clean state
        $(".has-error").each(function(){$(this).removeClass("has-error")});
        $(".help-block").hide();

        $(".validate-field").each(function(i,e){
            if (this.type == "email"){
                if (pw.isEmail($(this).val())) {
                    return true;
                }
            } else if ($(this).val().trim() != ""){
                return true;
            }
            
            $(this).parents(".form-group").addClass("has-error");
            $(this).siblings(".help-block").show();

            return true;

        })
        .promise()
        .done(function(){
            if ($(".has-error").length == 0) {
                deferred.resolve();
            } else {
                deferred.fail();    
            }
        });

        return deferred;
    },


    sendEnquire: function (fromModal){
        pw.validateForm().then(pw._sendMail(fromModal));
    },

    _urlParam: function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results && decodeURIComponent(results[1]) || null;
    },

    _origemContato: function(fromModal) {
        if (fromModal) {
          // header da pagina
          return $(".jumbotron-purewater h1").text();  
        } 

        //Parametro passado pelo link das paginas de produto
        return pw._urlParam("s");
    },

    _sendMail_deprecated: function (fromModal){
        return function() {

            var message = "Requisicao do Site \n\n" +
                        "Nome Contato: " + $("#nomeContato").val() + "<br><br>" +
                        "Empresa: " + $("#empresaContato").val() + "<br><br>" +
                        "Telefone Contato: " + $("#telefoneContato").val() + "<br><br>" +
                        "Email Contato: " + $("#emailContato").val() + "<br><br>" +
                        "Origem do contato: " + pw._origemContato(fromModal) + "<br><br>" +
                        "Mensagem: " + $("#mensagem").val();

            var postData = {
              nome: $("#nomeContato").val(),
              empresa: $("#empresaContato").val(),
              telefone: $("#telefoneContato").val(),
              email: $("#emailContato").val(),
              message: message
            };

            var cleanForm = function(){
                $("form input").val('');
                $("form textarea").val('');
                $("#sendMessage").prop('disabled', false);
            };

            $("#sendMessage").prop('disabled', true);

            $.ajax({
                url: "https://purewaterefluentes.websiteseguro.com/sendEmail.php",
                method: "POST",
                data: postData,
                dataType: "text",
                success: function(){
                    if(fromModal) {
                        $("#contatoModal").modal("hide");    
                    }
                    $("#confirmationModal").modal("show");
                    $("#confirmationModal").on('hidden.bs.modal', cleanForm);
                    gtagReportConversionContactForm();
                },
                error: function(){
                  $(".alert-danger").show();
                }
            });  
            
            ga('send', 'event', 'botao', 'clique');

            pw._sendMailJS(fromModal);

            return true;
        };
    },

    _sendMail: function (fromModal) {

        var cleanForm = function(){
            $("form input").val('');
            $("form textarea").val('');
            $("#sendMessage").prop('disabled', false);
        };

        $("#origemContato").val(pw._origemContato(fromModal));

        emailjs.sendForm('service_2grjoqj', 'template_x0vtmap', '#form-contato')
            .then(function() {
                if(fromModal) {
                    $("#contatoModal").modal("hide");    
                }
                $("#confirmationModal").modal("show");
                $("#confirmationModal").on('hidden.bs.modal', cleanForm);
                gtagReportConversionContactForm();
            }, function(error) {
                $(".alert-danger").show();
            });

        ga('send', 'event', 'botao', 'clique');
    },

    sendEnquireModal: function (){
        return pw.sendEnquire(true);
    },

    setup: function(){
        emailjs.init('UsifToQtVPwhXem35');

        $(".mail-sender").on("click", pw.sendEnquire);
        $(".mail-sender-modal").on("click", pw.sendEnquireModal);
    },
};

$(function() {
   pw.setup();
});




