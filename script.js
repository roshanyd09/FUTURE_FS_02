function login(){

    let username=document.getElementById("username").value.trim();

    let password=document.getElementById("password").value.trim();

    // Admin Login

    if(username==="admin" && password==="admin123"){

        localStorage.setItem("currentUser","admin");

        window.location.href="admin.html";

        return;

    }

    let users=JSON.parse(localStorage.getItem("users")) || [];

    let valid=users.find(user=>user.username===username && user.password===password);

    if(valid){

        localStorage.setItem("currentUser",username);

        window.location.href="user.html";

    }

    else{

        document.getElementById("msg").innerHTML="Invalid Username or Password";

    }

}
function logout(){
    window.location.href="index.html";
}

let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead(){

    let currentUser = localStorage.getItem("currentUser");

    let lead = {

        owner: currentUser,

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        source: document.getElementById("source").value,

        status: document.getElementById("status").value

    };

    if(lead.name=="" || lead.email==""){

        alert("Fill all fields");

        return;

    }

    leads.push(lead);

    localStorage.setItem("leads",JSON.stringify(leads));

    displayLeads();

}
function displayLeads(){

    let currentUser = localStorage.getItem("currentUser");

    leads = JSON.parse(localStorage.getItem("leads")) || [];

    let table = document.getElementById("leadTable");

    table.innerHTML="";

    leads.forEach((lead,index)=>{

        if(lead.owner===currentUser){

            table.innerHTML += `

            <tr>

            <td>${lead.name}</td>

            <td>${lead.email}</td>

            <td>${lead.phone}</td>

            <td>${lead.source}</td>

            <td>${lead.status}</td>

            <td>

            <button onclick="editLead(${index})">Edit</button>

            <button onclick="deleteLead(${index})">Delete</button>

            </td>

            </tr>

            `;

        }

    });

}

function deleteLead(index){

    if(confirm("Delete this lead?")){

        leads.splice(index,1);

        localStorage.setItem("leads",JSON.stringify(leads));

        displayLeads();

    }

}

if(window.location.pathname.includes("dashboard.html")){
    displayLeads();
}
function editLead(index){

    let lead = leads[index];

    document.getElementById("name").value = lead.name;
    document.getElementById("email").value = lead.email;
    document.getElementById("phone").value = lead.phone;
    document.getElementById("source").value = lead.source;
    document.getElementById("status").value = lead.status;

    leads.splice(index,1);

    localStorage.setItem("leads",JSON.stringify(leads));

    displayLeads();

}
// Register User

function register(){

    let username=document.getElementById("regUser").value.trim();

    let password=document.getElementById("regPass").value.trim();

    if(username=="" || password==""){

        alert("Fill all fields");

        return;

    }

    let users=JSON.parse(localStorage.getItem("users")) || [];

    let exists=users.find(user=>user.username===username);

    if(exists){

        document.getElementById("regMsg").innerHTML="Username already exists";

        return;

    }

    users.push({

        username:username,

        password:password

    });

    localStorage.setItem("users",JSON.stringify(users));

    alert("Registration Successful");

    window.location.href="index.html";

}
if(window.location.pathname.includes("user.html")){

    document.getElementById("welcome").innerHTML =
    "Welcome, " + localStorage.getItem("currentUser");

    displayLeads();

}
function loadAdminPanel(){

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let leads = JSON.parse(localStorage.getItem("leads")) || [];

    document.getElementById("totalUsers").innerHTML =
    "Total Users : " + users.length;

    document.getElementById("totalLeads").innerHTML =
    "Total Leads : " + leads.length;

    let userTable = document.getElementById("userTable");

    userTable.innerHTML = "";

    users.forEach(user=>{

        userTable.innerHTML += `
        <tr>
            <td>${user.username}</td>
        </tr>
        `;

    });

    let leadTable = document.getElementById("adminLeadTable");

    leadTable.innerHTML = "";

    leads.forEach((lead,index)=>{

        leadTable.innerHTML += `

        <tr>

        <td>${lead.owner}</td>

        <td>${lead.name}</td>

        <td>${lead.email}</td>

        <td>${lead.phone}</td>

        <td>${lead.source}</td>

        <td>${lead.status}</td>

        <td>

            <button onclick="adminDeleteLead(${index})">
            Delete
            </button>

        </td>

        </tr>

        `;

    });

}
function adminDeleteLead(index){

    if(confirm("Delete this lead?")){

        let leads = JSON.parse(localStorage.getItem("leads")) || [];

        leads.splice(index,1);

        localStorage.setItem("leads",JSON.stringify(leads));

        loadAdminPanel();

    }

}
if(window.location.pathname.includes("admin.html")){

    loadAdminPanel();

}