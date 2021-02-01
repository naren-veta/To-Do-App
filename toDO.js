let _username;
let new_task_array = [];
let completed_task_array = [];
let all_task_array = [];
let caption;

class ToDo {
    constructor(task, date, status) {
        this.taskvalue = task;
        this.datevalue = date;
        this.statusvalue = status;

    }
}

function onSelectionChange() {
    caption = document.getElementById("taskchoice");
    let i = caption.selectedIndex;
    document.getElementById("dispTblcaption").innerHTML = caption.options[i].text;

    switch (i) {
        case 0:

            if (new_task_array.length == 0) {
                cleartablebodyarea();
                document.getElementById("dispTblcaption").innerHTML = "No tasks";
            }
            else {
                cleartablebodyarea();
                alert("Select Option");
            }
            break;

        case 1:

            if (new_task_array.length == 0) {
                cleartablebodyarea();
                document.getElementById("dispTblcaption").innerHTML = "No incomplete tasks";

            }
            else {
                cleartablebodyarea();
                alert(caption.options[1].text);

                displayAllIncomplete(new_task_array);
            }
            break;
        case 2:
            if (completed_task_array.length == 0) {
                cleartablebodyarea();
                document.getElementById("dispTblcaption").innerHTML = "No Completed tasks";
            }
            else {
                cleartablebodyarea();
                alert(caption.options[2].text);
                displayAllCompleted(completed_task_array);
            }
            break;
        case 3:
            if (new_task_array.length == 0 && completed_task_array.length == 0) {
                cleartablebodyarea();
                document.getElementById("dispTblcaption").innerHTML = "No tasks";
            }
            else {
                cleartablebodyarea();
                alert(caption.options[3].text);
                allTaskview(new_task_array, completed_task_array);
            }
            break;
        default:
            alert("Something wrong....");
            break;
    }


}
function userLogin() {
    _username = document.getElementById("username").value;
    if (_username == "Enter name" || _username == "") {
        alert("Please enter your name.");
        document.getElementById("username").value = "";
        document.getElementById("username").focus();
    }
    else {
        document.getElementById("user").innerHTML = "Welcome, " + _username;
        document.getElementById("user").style.margin = "30px";
        document.getElementById("usernamelabel").innerHTML = _username;
        document.getElementById("userdiv").style.display = "none";
        document.getElementById("postloginfo").style.display = "inline";
    }
}

function logOut() {
    alert("bye bye......." + _username);
    document.getElementById("userdiv").style.display = "block";
    document.getElementById("postloginfo").style.display = "none";
    document.getElementById("username").value = "Enter name";
    document.getElementById("user").innerHTML = "";
    document.getElementById("usernamelabel").innerHTML = "";
    cleartablebodyarea();
    resetform();

}


function addTask() {
    let task = document.getElementById("toDoTask").value;
    let date = new Date(document.getElementById("toDoDate").value).toDateString();

    if (task == null || task == "" || date == null || date == "") {
        alert("Task not added");
        document.getElementById("toDoTask").focus();
    }
    else {
        let newTask = new ToDo(task, date, "Incomplete");
        new_task_array.push(newTask);
        alert("Successfully Added");
        resetform();
        console.log("Here is added task array" + JSON.stringify(new_task_array));

    }
    document.getElementById("dispTblcaption").innerHTML = 'LIST OF TASKS';
    appendTable(new_task_array);
}



function appendTable(new_task_array) {

    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var x = document.createElement('INPUT');
    x.setAttribute("type", "checkbox");
    x.setAttribute("class", "checkboxclass");
    if (new_task_array.length >= 1) {
        var text1 = document.createTextNode(new_task_array[new_task_array.length - 1].taskvalue);
        var text2 = document.createTextNode(new_task_array[new_task_array.length - 1].datevalue);
        var text3 = document.createTextNode(new_task_array[new_task_array.length - 1].statusvalue);
    }

    else {
        var text1 = document.createTextNode("Empty List");
        var text2 = document.createTextNode("Empty List");
        var text3 = document.createTextNode("Empty List");
    }


    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td4.appendChild(x);
    td4.style.textAlign = "center";
    tr.appendChild(td4);
    document.getElementById('select_data_body').appendChild(tr);
    x.addEventListener("change", () => {
        if (x.checked == true) {
            var prevsibling = x.parentNode.previousSibling;
            while (prevsibling.hasChildNodes()) {
                prevsibling.removeChild(prevsibling.childNodes[0]);
            }

            let datecompletion = "Completed on" + new Date();
            x.parentNode.previousSibling.appendChild(document.createTextNode(datecompletion));

            x.setAttribute("disabled", "true");

            let task_val_select_nodeValue = x.parentNode.parentNode.firstChild.childNodes[0].nodeValue;
            console.log("Selected Task value  Node Value   " + task_val_select_nodeValue);
            let indexofcompletedtask = (() => {
                for (i = 0; i < new_task_array.length; i++) {
                    if (new_task_array[i].taskvalue == task_val_select_nodeValue) {
                        return i;
                    }

                }
            })();
            console.log(`Selected Element found at ${indexofcompletedtask} is ${Object.values(new_task_array[indexofcompletedtask])}`);
            let cutslice = new_task_array.splice(indexofcompletedtask, 1);//returns spliced array part as array 
            console.log("Cut slice araray" + cutslice);
            console.log("Cut slice araray[0]" + JSON.stringify(cutslice[0]));
            cutslice[0].statusvalue = datecompletion;
            completed_task_array.push(cutslice[0]);//assigning to another array object inside spliced array
            /*The above step ensures only objects are stored in array. otherwise, array will be stored*/
            console.log("completed array   " + JSON.stringify(completed_task_array));
            console.log("new task afer delete   " + JSON.stringify(new_task_array));

        }

        if (x.checked == false) {
            alert("Checkbox Unclicked");
        }
    })


}

function displayAllIncomplete(new_task_array) {
    for (i = 0; i < new_task_array.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var x = document.createElement('INPUT');
        x.setAttribute("type", "checkbox");
        x.setAttribute("class", "checkboxclass");
        if (new_task_array.length >= 1) {
            var text1 = document.createTextNode(new_task_array[i].taskvalue);
            var text2 = document.createTextNode(new_task_array[i].datevalue);
            var text3 = document.createTextNode(new_task_array[i].statusvalue);
        }

        else {
            var text1 = document.createTextNode("Empty List");
            var text2 = document.createTextNode("Empty List");
            var text3 = document.createTextNode("Empty List");
        }


        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td4.appendChild(x);
        td4.style.textAlign = "center";
        tr.appendChild(td4);
        document.getElementById('select_data_body').appendChild(tr);
        x.addEventListener("change", () => {
            if (x.checked == true) {
                var prevsibling = x.parentNode.previousSibling;
                while (prevsibling.hasChildNodes()) {
                    prevsibling.removeChild(prevsibling.childNodes[0]);
                }

                let datecompletion = "Completed on" + new Date();
                x.parentNode.previousSibling.appendChild(document.createTextNode(datecompletion));

                x.setAttribute("disabled", "true");

                let task_val_select_nodeValue = x.parentNode.parentNode.firstChild.childNodes[0].nodeValue;
                console.log("Selected Task value  Node Value   " + task_val_select_nodeValue);
                let indexofcompletedtask = (() => {
                    for (i = 0; i < new_task_array.length; i++) {
                        if (new_task_array[i].taskvalue == task_val_select_nodeValue) {
                            return i;
                        }

                    }
                })();
                console.log(`Selected Element found at ${indexofcompletedtask} is ${Object.values(new_task_array[indexofcompletedtask])}`);
                let cutslice = new_task_array.splice(indexofcompletedtask, 1);//returns spliced array part as array 
                console.log("Cut slice araray" + cutslice);
                console.log("Cut slice araray[0]" + JSON.stringify(cutslice[0]));
                cutslice[0].statusvalue = datecompletion;
                completed_task_array.push(cutslice[0]);
                console.log("completed array   " + JSON.stringify(completed_task_array));
                console.log("new task afer delete   " + JSON.stringify(new_task_array));

            }

            if (x.checked == false) {
                alert("Checkbox Unclicked");
            }
        })
    }

}


function displayAllCompleted(completed_task_array) {
    console.log("Completed Arry Received  " + JSON.stringify(completed_task_array));
    for (i = 0; i < completed_task_array.length; i++) {
        // let completecopy= completed_task_array[i];
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        if (completed_task_array.length >= 1) {
            var text1 = document.createTextNode(completed_task_array[i].taskvalue);
            var text2 = document.createTextNode(completed_task_array[i].datevalue);
            var text3 = document.createTextNode(completed_task_array[i].statusvalue);
            /*All the below tests code used to find out spliced array debug */
            //  for (let index = 0; index < completecopy.length; index++) {
            // console.log("Complete copy  "+completecopy);
            // console.log("Complete copy is ary?? "+Array.isArray(completecopy));
            // console.log("Complete copy index is array??  "+Array.isArray(completecopy[index]));
            // console.log("Complete copy index val "+completecopy[index]);
            // console.log("Complete copy index val TASK VALUE "+completecopy[index].taskvalue);
            // console.log("Complete copy index val JSON "+JSON.stringify(completecopy[index]));
            // }



            // console.log("Completd task is array???  "+Array.isArray(completed_task_array[i]));
            // console.log("Completd task "+JSON.stringify(completed_task_array[i]));
            // console.log(completed_task_array[i].datevalue);
            // console.log("Completd task "+completed_task_array[i].statusvalue);

        }

        else {
            var text1 = document.createTextNode("Empty List");
            var text2 = document.createTextNode("Empty List");
            var text3 = document.createTextNode("Empty List");
        }


        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        // td4.appendChild(document.createTextNode("HEllo"));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        document.getElementById('select_data_body').appendChild(tr);

    }

}








function allTaskview(new_task_array, completed_task_array) {

    all_task_array = new_task_array.concat(completed_task_array);
    console.log("All Task Arry  " + JSON.stringify(all_task_array));
    for (i = 0; i < all_task_array.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');


        if (completed_task_array.length >= 1) {
            var text1 = document.createTextNode(all_task_array[i].taskvalue);
            var text2 = document.createTextNode(all_task_array[i].datevalue);
            var text3 = document.createTextNode(all_task_array[i].statusvalue);

        }

        else {
            var text1 = document.createTextNode("Empty List");
            var text2 = document.createTextNode("Empty List");
            var text3 = document.createTextNode("Empty List");
        }


        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        if (all_task_array[i].statusvalue == "Incomplete") {
            var x = document.createElement('INPUT');
            x.setAttribute("type", "checkbox");
            x.setAttribute("class", "checkboxclass");
            td4.appendChild(x);
            x.addEventListener("change", () => {
                if (x.checked == true) {
                    var prevsibling = x.parentNode.previousSibling;
                    while (prevsibling.hasChildNodes()) {
                        prevsibling.removeChild(prevsibling.childNodes[0]);
                    }
                    let datecompletion = "Completed on" + new Date();
                    x.parentNode.previousSibling.appendChild(document.createTextNode(datecompletion));
                    x.setAttribute("disabled", "true");

                    let task_val_select_nodeValue = x.parentNode.parentNode.firstChild.childNodes[0].nodeValue;
                    console.log("Selected Task value  Node Value   " + task_val_select_nodeValue);
                    let indexofcompletedtask = (() => {
                        for (i = 0; i < new_task_array.length; i++) {
                            if (new_task_array[i].taskvalue == task_val_select_nodeValue) {
                                return i;
                            }

                        }
                    })();
                    console.log(`Selected Element found at ${indexofcompletedtask} is ${Object.values(new_task_array[indexofcompletedtask])}`);
                    let cutslice = new_task_array.splice(indexofcompletedtask, 1);//returns spliced array part as array 
                    console.log("Cut slice araray" + cutslice);
                    console.log("Cut slice araray[0]" + JSON.stringify(cutslice[0]));
                    completed_task_array.push(cutslice[0]);//assigning to another array object inside spliced array
                    /*The above step ensures only objects are stored in array. otherwise, array will be stored*/
                    console.log("completed array   " + JSON.stringify(completed_task_array));
                    console.log("new task afer delete   " + JSON.stringify(new_task_array));

                }

                if (x.checked == false) {
                    alert("Checkbox Unclicked");
                }
            })
        }


        td4.style.textAlign = "center";
        tr.appendChild(td4);
        document.getElementById('select_data_body').appendChild(tr);



    }
}

function cleartablebodyarea() {
    const tabBody = document.getElementById("select_data_body");
    console.log(" table body" + tabBody.hasChildNodes());
    while (tabBody.lastChild) {
        tabBody.removeChild(tabBody.lastChild);
    }
}


function resetform()
{   document.getElementById("toDoTask").value="";
    document.getElementById("toDoDate").value="";
}