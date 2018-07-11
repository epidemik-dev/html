var auth_token;
var username_base = String(Math.random() * 100000000);

function test_create_acc(functions) {
  network_create_an_account(username_base, "testtest", 1, 1, "1981-03-02", "Female", function (token) {
    expect(typeof token, 'string', "Testing Create Account");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Create Account")
    throw error;
  });
}

function test_login(functions) {
  network_login(username_base, "testtest", function (token) {
    expect(typeof token, 'string', "Testing Login");
    auth_token = token;
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  })
}

function test_get_status(functions) {
  network_get_status(username_base, auth_token, function (is_sick) {
    expect(is_sick, false, "Testing Get Status");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  })
}

function test_report_sick(functions) {
  network_report_sick(username_base, "Common Cold", [4], auth_token, function (predict_disease) {
    expect(predict_disease, "Common Cold", "Testing Disease Reporting");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing report sick")
    throw error;
  })
}

function test_get_status2(functions) {
  network_get_status(username_base, auth_token, function (is_sick) {
    expect(is_sick, true, "Testing Get Status");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  })
}

function test_get_all_diseases(functions) {
  network_get_all_diseases(auth_token, function (diseases) {
    expect(diseases.length > 0, true, "Testing Get All Diseases");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  });
}

function test_get_all_trends(functions) {
  network_get_all_trends(username_base, auth_token, function (trends) {
    expect(trends.length > 0, true, "Testing Get All Trends");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  });
}

function test_mark_healthy(functions) {
  network_report_healthy(username_base, auth_token, function (diseases) {
    expect(1, 1, "Testing Report Healthy");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  })
}

function test_get_status3(functions) {
  network_get_status(username_base, auth_token, function (is_sick) {
    expect(is_sick, false, "Testing Get Status");
    functions.pop()(functions);
  }, function (error) {
    expect(1, 2, "Testing Login")
    throw error;
  })
}

function test_get_trends(functions) {

}

function end(functions) {

}

function start(functions) {
  functions.pop()(functions);
}

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


start([end,
  test_get_all_trends,
  test_get_status3,
  test_mark_healthy,
  test_get_all_diseases,
  test_get_status2,
  test_report_sick,
  test_get_status,
  test_login,
  test_create_acc
]);