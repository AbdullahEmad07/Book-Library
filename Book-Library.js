import { book } from "./BookClass.js";
import { author } from "./AuthorClass.js";

let numRegex = /^[0-9]+$/;
let charRegex = /^[A-Za-z]+$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let first_page = document.getElementsByClassName("first-page")[0];
let numOfBooks = document.getElementsByClassName("numOfBooks")[0];
let pFirstPage = document.getElementsByClassName("p-first-page")[0];
let okBtn = document.getElementsByClassName("ok")[0];
let second_page = document.getElementsByClassName("second-page")[0];
let bName = document.getElementsByClassName("bName")[0];
let errBName = document.getElementsByClassName("errBName")[0];
let price = document.getElementsByClassName("price")[0];
let errPrice = document.getElementsByClassName("errPrice")[0];
let auName = document.getElementsByClassName("auName")[0];
let errAuName = document.getElementsByClassName("errAuName")[0];
let auEmail = document.getElementsByClassName("auEmail")[0];
let errAuEmail = document.getElementsByClassName("errAuEmail")[0];
let addBtn = document.getElementsByClassName("addBtn")[0];
let bSubmitted = document.getElementsByClassName("bSubmitted")[0];
let third_page=document.getElementsByClassName("third-page")[0];
let tbody=document.getElementsByTagName("tbody")[0];
let tdEdit;
let tdDelete;
let tdName;
let tdPrice;
let tdAuName;
let tdAuEmail;
let bookArr=[];
let i=1;

okBtn.addEventListener("click", function () {
    if (numOfBooks.value == "") {
        pFirstPage.innerHTML = `<p>please enter books number</p>`;
        pFirstPage.classList.remove("displayNone");
    }
    else if (!numRegex.test(numOfBooks.value)) {
        pFirstPage.innerHTML = `<p>please enter numbers only</p>`;
        pFirstPage.classList.remove("displayNone");
    }
    else if (numOfBooks.value <= 0) {
        pFirstPage.innerHTML = `<p>min number is 1</p>`;
        pFirstPage.classList.remove("displayNone");
    }
    else {
        pFirstPage.classList.add("displayNone");
        first_page.classList.add("displayNone");
        second_page.classList.remove("displayNone");

    }
})

addBtn.addEventListener("click", function (e) {
    
    e.preventDefault();
    formValidation(bName,errBName,price,errPrice,auName,errAuName,auEmail,errAuEmail);
    
    if(charRegex.test(bName.value)&&numRegex.test(price.value)&&charRegex.test(auName.value)&&emailRegex.test(auEmail.value)){
        
        let author1=new author(auName.value,auEmail.value);
        let book1=new book(bName.value,price.value,author1);
        bookArr.push(book1);
        bSubmitted.innerText=`Book ${i++} submitted`;
        bSubmitted.classList.remove("displayNone");
        numOfBooks.value--;
        if(numOfBooks.value==0)
        {
            second_page.classList.add("displayNone");
            bookArr.forEach((element,i) => {
                let row=document.createElement("tr");
                row.setAttribute("id",i);
                fillRow(row,element.name,element.price,element.author.name,element.author.email);
                tbody.append(row);
            });
            third_page.classList.remove("displayNone");
            
        }
        
    }

})

tbody.addEventListener("click",function(e){
    let index=e.target.parentNode.parentNode.id;
    tdName=document.getElementsByClassName("tdName")[index];
    tdPrice=document.getElementsByClassName("tdPrice")[index];
    tdAuName=document.getElementsByClassName("tdAuName")[index];
    tdAuEmail=document.getElementsByClassName("tdAuEmail")[index];
    tdEdit=document.getElementsByClassName("tdEdit")[index];
    tdDelete=document.getElementsByClassName("tdDelete")[index];

    if(e.target.classList.contains("editBtn")){
        
        tdName.innerHTML=`<input type="text" value="${bookArr[index].name}"><p class="displayNone"></p>`;
        tdPrice.innerHTML=`<input type="text" value="${bookArr[index].price}"><p class="displayNone"></p>`;
        tdAuName.innerHTML=`<input type="text" value="${bookArr[index].author.name}"><p class="displayNone"></p>`;
        tdAuEmail.innerHTML=`<input type="text" value="${bookArr[index].author.email}"><p class="displayNone"></p>`;
        tdEdit.innerHTML=`<button class="saveBtn">Save</button>`;
        tdDelete.innerHTML=`<button class="cancelBtn">Cancel</button>`;
    }
    if(e.target.classList.contains("saveBtn")){
        formValidation(tdName.children[0],tdName.children[1],
                       tdPrice.children[0],tdPrice.children[1],
                       tdAuName.children[0],tdAuName.children[1],
                       tdAuEmail.children[0],tdAuEmail.children[1]);

        if(charRegex.test(tdName.children[0].value)&&numRegex.test(tdPrice.children[0].value)&&
            charRegex.test(tdAuName.children[0].value)&&emailRegex.test(tdAuEmail.children[0].value)){
                
                bookArr[index].name=tdName.children[0].value;
                bookArr[index].price=tdPrice.children[0].value;
                bookArr[index].author.name=tdAuName.children[0].value;
                bookArr[index].author.email=tdAuEmail.children[0].value;

                fillRow(e.target.parentNode.parentNode,bookArr[index].name,
                        bookArr[index].price,bookArr[index].author.name,
                        bookArr[index].author.email);
            }
    }

    if(e.target.classList.contains("cancelBtn")){
        fillRow(e.target.parentNode.parentNode,bookArr[index].name,
            bookArr[index].price,bookArr[index].author.name,
            bookArr[index].author.email);
    }

    if(e.target.classList.contains("deleteBtn")){
        bookArr.splice(index,1);
        e.target.parentNode.parentNode.remove();
    }
})


function formValidation(bName,errBName,price,errPrice,auName,errAuName,auEmail,errAuEmail){
    if (bName.value == "") {
        errBName.innerText = "This field is required";
        errBName.classList.remove("displayNone");
    }
    else if (!charRegex.test(bName.value)) {
        errBName.innerText = "please enter characters only";
        errBName.classList.remove("displayNone");
    }
    else {
        errBName.classList.add("displayNone");
    }

    if(price.value=="")
    {
        errPrice.innerText = "This field is required";
        errPrice.classList.remove("displayNone");
    }
    else if(!numRegex.test(price.value))
    {
        errPrice.innerText = "please enter numbers only";
        errPrice.classList.remove("displayNone");
    }
    else{
        errPrice.classList.add("displayNone");
    }

    if(auName.value==""){
        errAuName.innerText="This field is required";
        errAuName.classList.remove("displayNone");
    }
    else if(!charRegex.test(auName.value)){
        errAuName.innerText="please enter characters only";
        errAuName.classList.remove("displayNone");
    }
    else{
        errAuName.classList.add("displayNone");
    }
    if(auEmail.value=="")
    {
        errAuEmail.innerText="This field is required";
        errAuEmail.classList.remove("displayNone");
    }
    else if(!emailRegex.test(auEmail.value)){
        errAuEmail.innerText="please enter test@example.com";
        errAuEmail.classList.remove("displayNone");
    }
    else{
        errAuEmail.classList.add("displayNone");
    }
}


function fillRow(row,name,price,auName,auEmail){
    row.innerHTML=`<td class="tdName">${name}</td>
                    <td class="tdPrice">${price}$</td>
                    <td class="tdAuName">${auName}</td>
                    <td class="tdAuEmail">${auEmail}</td>
                    <td class="tdEdit"><button class="editBtn">Edit</button></td>
                    <td class="tdDelete"><button class="deleteBtn">Delete</button></td>`;
}