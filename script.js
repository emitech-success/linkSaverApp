const inputBtn = document.getElementById("input-btn");
const inputItem = document.getElementById("input-item");
const list = document.getElementById("ul-item");
const deleteBtn =document.getElementById("delete-btn"); 
const saveBtn =document.getElementById("save-btn"); 
let myLead = [];

let leadFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if (leadFromLocalStorage) {
  myLead = leadFromLocalStorage;
  render(myLead);
}

inputBtn.addEventListener("click", function () {
  myLead.push(inputItem.value);
  inputItem.value ='';
  localStorage.setItem("myleads", JSON.stringify(myLead))
  render(myLead);
  console.log(localStorage.getItem("myleads"));
});
function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    listItem += `<li>
    <a target= "_blank" href ="${leads[i]}">
    ${leads[i]} </a></li>`;
  }
  list.innerHTML = listItem;
}
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  render(myLead);
});

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLead.push(tabs[0]["url"])
    localStorage.setItem("myleads", JSON.stringify(myLead));
    render(myLead);
  })
})