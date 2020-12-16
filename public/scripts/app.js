$(document).ready(function () {

  let last_text = 3;
  let present_letter = 'C'

  //CREATE NEW FILD (INDEX.HTML)
  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1).toUpperCase();
  }

  const createField = () => {

    let field = $(`
    <div class="form-group form-group-answer"><p>${present_letter})</p>
      <textarea class="form-control" id="txtAreaanswer${last_text}"></textarea>
    </div>
    `);

    present_letter = nextChar(present_letter);
    last_text++;
    return field;
  };

  const renderNewField = () => {
    $('#new-field').append(createField());
  };

  $("#addMoreAnswers").click(function () {
    renderNewField();
  });





});
