
var manager = new DiseaseManager();

manager.addDisease(1, 1);
/*manager.addDisease(2, 3);
manager.addDisease(100, 1);
manager.addDisease(-10, 20);
manager.addDisease(-10, 50);
manager.addDisease(20, -100);
manager.addDisease(0, 0);*/
console.log(manager);

expect(manager.getAll(), 6, "Get every disease");

expect(manager.getWeightForRange(-1000, 1000, -1000, 1000), 6, "Get every disease by range");

function expect(a, b, title) {
  var html_element = document.getElementById('test_output');
  if (a === b) {
    const to_add = document.createElement("p")
    to_add.textContent = title + " Passed";
    html_element.appendChild(to_add);
  } else {
    const to_add = document.createElement("p")
    to_add.textContent = title + " Failed";
    to_add.textContent += "/n" + a + " is not equal to " + b;
    html_element.appendChild(to_add);
  }
}