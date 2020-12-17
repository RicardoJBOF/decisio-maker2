$(document).ready(function () {

  let last_text = 3;
  let present_letter = 'C'

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
      <textarea class="form-control" ></textarea>
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

  const removeField = () => {
    if(last_text >= 1) {
      last_text--;
      present_letter = prevChar(present_letter);
      $(`#txtAreaanswer${last_text}`).remove();
    }
  };

  $("#RemoveAnswers").click(function () {
    removeField();
  });









});
