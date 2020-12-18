$(document).ready(function () {

  let last_text = 3;
  let present_letter = 'C';
  const data = {};
  let id = 0;

  //ADD AND REMOVE OPTIONS BUTTON (INDEX.HTML)
  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1).toUpperCase();
  }

  function prevChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1).toUpperCase();
  }

  const createField = () => {
    const field = $(`
    <div class="form-group form-group-answer" id="txtAreaanswer${last_text}">
    <p>${present_letter})</p>
      <textarea class="form-control" id="txtOption${last_text}"></textarea>
    </div>
    `);
    present_letter = nextChar(present_letter);
    last_text++;
    return field;
  };

  const renderNewField = () => {
    $('#new-field').append(createField());
  };

  $("#addMoreAnswers").click( () => {
    renderNewField();
  });

  const removeField = () => {
    if(last_text >= 1) {
      last_text--;
      present_letter = prevChar(present_letter);
      $(`#txtAreaanswer${last_text}`).remove();
    }
  };

  $("#RemoveAnswers").click( () => {
    removeField();
  });

  //SEND POLL BUTTON
  const collectAnswers = () => {
    const options = [];
    for (let i = 1; i < last_text; i++) {
      options.push($(`#txtOption${i}`).val())
    }
    return options;
  };

  $("#sendAnswers").click( function () {
    data.question = $(`#txtAreaQuestion`).val();
    data.options = collectAnswers();
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: '/',
      data: data,
      async:false
    }).done((id) => {
      id = id.response;
      const field = $(`
      <hr>
      <p>Submission link:</p> <a href="urls/${id}"> http://localhost:8080/urls/${id}</a>
      <p>Share this link with the voters.</p>
      <hr>
      <p>Result link:</p> <a href="urls/result/${id}"> http://localhost:8080/urls/result/${id}</a>
      <p>Use this link to track the result.</p>
      <hr>
      `);
      $('#create-links').append(field);
    });
  })
});
