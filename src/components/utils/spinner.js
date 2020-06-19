const spinner = (active) => {
  if (!active) {
    $(".spinner").addClass("hidden");
  } else {
    $(".spinner").removeClass("hidden");
  }
};

export default spinner;
