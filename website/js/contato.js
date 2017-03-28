function sendEnquire(fromModal){
    var message = "Requisicao do Site \n\n" +
                // "Tipo: " + $("#tipoSolicitacao").val() + "\n\n" +
                "Nome Contato: " + $("#nomeContato").val() + "\n\n" +
                "Empresa: " + $("#empresaContato").val() + "\n\n" +
                "Telefone Contato: " + $("#telefoneContato").val() + "\n\n" +
                "Email Contato: " + $("#emailContato").val() + "\n\n" +
                "Mensagem: " + $("#mensagem").val();

    var mail = {
      _replyto: $("#emailContato").val(),
      _subject: "Requisicao do Site " + $("#tipoSolicitacao").val(),
      message: message
    };

    $.ajax({
        url: "https://formspree.io/vendas@purewaterefluentes.com.br",
        method: "POST",
        data: mail,
        dataType: "json",
        success: function(data, textStatus, jqXHR){
          $(".alert-success").show();
          
          fromModal && $("#contatoModal").modal("hide");
        },
        error: function(jqXHR, textStatus, errorThrown){
          $(".alert-danger").show()
        }
    });  
}


// $('#contatoModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })
