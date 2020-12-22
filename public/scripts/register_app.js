$(document).ready(function () {

  const data = {};

  $("#sendRegister").click( function () {
    data.name = $(`#register-user-name`).val();
    data.email = $(`#register-email`).val();
    data.password = $(`#register-password`).val();
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: '/register',
      data: data,
      async:false
    }).done(
      resp => { console.log("Data received on my frontend--->", resp)

      // id = id.response;
      // const field = $(`
      // <hr>
      // <p>Submission link:</p> <a href="survey/${id}"> http://localhost:8080/survey/${id}</a>
      // <p>Share this link with the voters.</p>
      // <hr>
      // <p>Result link:</p> <a href="result/${id}"> http://localhost:8080/result/${id}</a>
      // <p>Use this link to track the result.</p>
      // <hr>
      // `);
      // $('#create-links').append(field);


    });
  })




});
