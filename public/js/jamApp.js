$(document).ready(() => {
  $("#modal-button").click(() => {
    $("./modal-body").html("");
    $.get("/jam/main?format=json", (data) => {
      data.forEach((jam) => {
        $("./modal-body").append(
          '<div>
          <span class="jam-title">
          <%= jam.title %>
          </span>
          <div class="jam-description">
          <%= jam.description %>
          </div>
          </div>'
        );
      });
    });
  });
});
