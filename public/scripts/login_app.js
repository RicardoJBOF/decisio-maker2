$(document).ready(function () {

  const data = {};
  $("#wrong-password").hide();
  $("#invalid-email").hide();

  $("#sendLogin").click(function () {
    data.email = $(`#login-email`).val();
    data.password = $(`#login-password`).val();
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/login",
      data: data,
      async: false,
    }).done(
      res => {
        console.log('retorno para o front-end--->', res)

        if(res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", res.user);
          window.location = "/";

        } else if (res.noRegister) {
          $("#invalid-email").show()
        } else if (res.wrongPassword) {
          $("#wrong-password").show()
        }
      })
  });
});
