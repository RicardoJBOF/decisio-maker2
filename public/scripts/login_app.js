$(document).ready(function () {

  const data = {};
  $("#wrong-password").hide();
  $("#invalid-email").hide();

  $("#sendLogin").click(function () {
    data.email = $(`#login-email`).val();
    data.password = $(`#login-password`).val();
    event.preventDefault();

    console.log('Enviando data para meu backend--->', data)

    $.ajax({
      type: "POST",
      url: "/login",
      data: data,
      async: false,
    }).done(
      res => {

      console.log('retorno para o front-end--->', res)

      if(res.redirect) {
        //setToken(res.token);
        window.location = res.redirect

      } else if (res.noRegister) {
        $("#invalid-email").show()
      } else if (res.wrongPassword) {
        $("#wrong-password").show()
      }


      })

  });

});
