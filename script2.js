// code set email to localstorage

$(document).ready(function () {
  $("#emailBtn").on("click", function () {
    localStorage.setItem("myContent", $("#email").val());
    console.log(localStorage.getItem("myContent"));
  });
});
