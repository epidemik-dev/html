
var manager = new DiseaseBranch(-180, 180, -360, 360);

manager = addDisease(manager, 1, 1);
manager = addDisease(manager, 2, 3);
manager = addDisease(manager, 100, 1);
manager = addDisease(manager, -10, 20);
manager = addDisease(manager, -10, 50);
manager = addDisease(manager, 20, -100);
manager = addDisease(manager, 0, 0);

console.log(manager);

expect(getAll(manager), 7, "Get every disease");

expect(getWeightForRange(manager, -1000, 1000, -1000, 1000), 7, "Get every disease by range");
expect(getWeightForRange(manager, -0.1, 10, -0.1, 10), 3, "Get every disease by range");
expect(getWeightForRange(manager, -10, 10, -0.1, 40), 4, "Get every disease by range");


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