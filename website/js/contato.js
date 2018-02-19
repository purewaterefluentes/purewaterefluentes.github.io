function sendEnquire(fromModal){
    var message = "Requisicao do Site \n\n" +
                "Nome Contato: " + $("#nomeContato").val() + "\n\n" +
                "Empresa: " + $("#empresaContato").val() + "\n\n" +
                "Telefone Contato: " + $("#telefoneContato").val() + "\n\n" +
                "Email Contato: " + $("#emailContato").val() + "\n\n" +
                "Origem do contato: " + $.urlParam("s") + "\n\n" +
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
        url: "http://purewaterefluentes.tempsite.ws/sendEmail.php",
        method: "POST",
        data: postData,
        dataType: "jsonp",
        success: function(){
            $("#confirmationModal").modal("show");
            $("#confirmationModal").on('hidden.bs.modal', cleanForm);
        },
        error: function(){
          $(".alert-danger").show()
        }
    });  
}

function sendEnquireFormspree(fromModal){
    var message = "Requisicao do Site \n\n" +
                "Nome Contato: " + $("#nomeContato").val() + "\n\n" +
                "Empresa: " + $("#empresaContato").val() + "\n\n" +
                "Telefone Contato: " + $("#telefoneContato").val() + "\n\n" +
                "Email Contato: " + $("#emailContato").val() + "\n\n" +
                "Origem do contato: " + $.urlParam("s") + "\n\n" +
                "Mensagem: " + $("#mensagem").val();

    var mail = {
      _replyto: $("#emailContato").val(),
      _subject: "Requisicao do Site - " + $("#nomeContato").val(),
      message: message
    };

    var cleanForm = function(){
        $("form input").val('');
        $("form textarea").val('');
        $("#sendMessage").prop('disabled', false);
    };

    $("#sendMessage").prop('disabled', true);

    $.ajax({
        url: "https://formspree.io/vendas@purewaterefluentes.com.br",
        method: "POST",
        data: mail,
        dataType: "json",
        success: function(){
            $("#confirmationModal").modal("show");
            $("#confirmationModal").on('hidden.bs.modal', cleanForm);
        },
        error: function(){
          $(".alert-danger").show()
        }
    });  
}


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results && decodeURIComponent(results[1]) || null;
}
