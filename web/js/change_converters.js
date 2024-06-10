const heading = document.getElementById("converter-heading");
const select = document.getElementById("alternate-headings");
const string = " Font Converter"

select.addEventListener("change", function () {
    const selectedValue = select.value;
    setConverterName(selectedValue);
    heading.textContent = selectedValue + string;
});


//# sourceMappingURL = ../js/change_converters.js.map
