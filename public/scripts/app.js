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
    let field = $(`
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
    }).done((response) =>
    {
      id = response.id;
      //renderBtn();
    });
  })









});
