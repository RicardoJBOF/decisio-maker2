$(document).ready(function () {
  const data = {};
  $("#create-confirmation").hide();
  $("#password-confirmation").hide();

  $("#sendRegister").click(function () {
    data.name = $(`#register-user-name`).val();
    data.email = $(`#register-email`).val();
    data.password = $(`#register-password`).val();
    event.preventDefault();

    if ($(`#register-password`).val() !== $(`#register-check-password`).val()) {
      $("#password-confirmation").show();
    } else {
      $.ajax({
        type: "POST",
        url: "/register",
        data: data,
        async: false,
      }).done((res) => {
        if (res.token) {
          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("user", res.user);
          window.location = "/";
        } else {
          $("#create-confirmation").show();
        }
      });
    }
  });
});
