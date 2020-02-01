(function () {
    
  var countQuantity = function (decr, incr, quantityElement, quantityValue) {
    decr.addEventListener('click', function (event) {
      event.preventDefault();
      quantityElement.value = (quantityValue > 1) ? --quantityValue : quantityValue;
    });
    incr.addEventListener('click', function (event) {
      event.preventDefault();
      quantityElement.value = ++quantityValue;
    });
  };

  var counters = document.querySelectorAll(".counter");

  for (var i = 0; i < counters.length; i++) {
    var decr = counters[i].querySelector(".counter__btn--decr");
    var incr = counters[i].querySelector(".counter__btn--incr");
    var quantityElement = counters[i].querySelector(".counter__value");
    var quantityValue = quantityElement.value;
    countQuantity(decr, incr, quantityElement, quantityValue);
  }

})();