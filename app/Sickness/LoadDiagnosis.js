function loadDiagnosisData() {
    
}

function loadDiseases() {
    network_load_diagnosis(localStorage["token"], processDiseaseData, function (xhr) {
        displayLogin();
    })
}

function loadSymptoms() {
    network_load_diagnosis(localStorage["token"], processSymptomData, function (xhr) {
        displayLogin();
    })
}


function processSymptomData(toProcess) {
    var diseaseName = localStorage['disease_name']
    var symptomMap = toProcess.symptom_map;
    var symptoms = toProcess.disease_question_map[diseaseName];
    for(var i = 0; i < symptoms.length; i++) {
        addSymptom(symptomMap[symptoms[i]], symptoms[i]);
    }
}

function processDiseaseData(toProcess) {
    for(var i = 0; i < toProcess.disease_list.length; i++) {
        addDisease(toProcess.disease_list[i]);
    }
}

function addDisease(diseaseName) {
    var selector = document.getElementById("disease_selector");
    var item = document.createElement("option");
    item.value = diseaseName
    item.text = diseaseName
    selector.appendChild(item);
}

//String -> Void
//Adds the given system to the HTML doc
//EFFECT: modifies the HTML
function addSymptom(symptom, symID) {
    var toAddMain = document.createElement("div");
    toAddMain.id = symID;
    toAddMain.className = "checkbox";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + symID;
    checkbox.value = "1";

    var lable = document.createElement("label");
    lable.htmlFor = "checkbox" + symID;
    
    toAddMain.appendChild(checkbox);
    toAddMain.appendChild(lable);
    

    var superDoc = document.getElementById("symSelector");
    superDoc.appendChild(toAddMain);
    
    var label = document.createElement("p");
    label.textContent = symptom;
    label.className = "checkbox-label";
    superDoc.appendChild(label);
    superDoc.appendChild(document.createElement("br"));
}
