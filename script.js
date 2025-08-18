let lib = [];

class book {
    constructor(author, title , pages, status){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.ID = crypto.randomUUID();}
}


function addBook(author, title, pages, status) {
    let obj = new book(author, title, pages, status);
    lib.push(obj)
}

let addbtn = document.querySelector(".add");
addbtn.addEventListener("click", () => {
    document.querySelector(".invisible").classList.remove("invisible")
    document.querySelector(".error").classList.add("invisible")
})

document.querySelector("input[type='submit'] ").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".form").classList.add("invisible");
    let author = document.querySelector("input[id='author']").value;
    let title = document.querySelector("input[id='title']").value;
    let pages = document.querySelector("input[id='pages']").value;
    let stat;
    if (document.querySelector("input[type='checkbox']").checked) {
        stat = "READ";
    }
    else {
        stat = "NOT READ";
    }


    if (author && title && pages && stat) {
        addBook(author, title, pages, stat);
        display();

    }
    else {
        document.querySelector(".error").classList.remove("invisible")
    }
})

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".error").classList.add("invisible")
})

function display() {
    let body = document.querySelector(".body");

    body.removeChild(document.querySelector(".grid"));
    let gridmain = document.createElement("div")
    document.querySelector(".body").appendChild(gridmain)
    gridmain.classList.add("grid")
    lib.forEach((item) => {
        let gitem = document.createElement("div");
        document.querySelector(".grid").appendChild(gitem);
        gitem.classList.add(`lol-${item.ID}`)
        gitem.innerHTML = `<h3>The Book Name is ${item.title}</h3>
                    <p>Written by ${item.author}</p>
                    <p>Has ${item.pages} pages </p> 
                    <div class="status">${item.status}</div>
                    <button class="remove lol-${item.ID}" >REMOVE THIS</button>`;  /*RESEARCHED THIS */
        // document.querySelector(".remove").classList.add(`${item.ID}`)
    })
    Array.from(document.querySelectorAll(".remove")).forEach((item) => {
        item.addEventListener("click", (e) => {

            let imp = e.target.getAttribute("class").split(" ")[1];
            document.querySelector(".grid").removeChild(document.querySelector(`.${imp}`));
            lib.forEach((item,index)=>{
                if(lib[index].ID== imp.slice(4)){
                    lib.splice(index,1);
                    display();
                }
            })
                
            

        })
    })
}




// document.querySelector(".grid").addEventListener("click", (e) => {
//     if (e.target.classList.contains("remove")) {
//         let imp = e.target.getAttribute("class").split(" ")[1];
//         document.querySelector(".grid").removeChild(document.querySelector(".`${imp}`"));
//     }
// })