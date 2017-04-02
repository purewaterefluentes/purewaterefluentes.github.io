function sendEnquire(fromModal){
    var message = "Requisicao do Site \n\n" +
                "Nome Contato: " + $("#nomeContato").val() + "\n\n" +
                "Empresa: " + $("#empresaContato").val() + "\n\n" +
                "Telefone Contato: " + $("#telefoneContato").val() + "\n\n" +
                "Email Contato: " + $("#emailContato").val() + "\n\n" +
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
