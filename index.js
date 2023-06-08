let title=document.getElementById("title");
let code=document.getElementById("code");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let discount=document.getElementById("discount");
let count=document.getElementById("count");
let categeory=document.getElementById("category");
let create=document.getElementById("create");
let deleteall=document.getElementById("delete");

//calcul total
function calcultotal()
{
    if(price.value!=""){
        let resultat=(+price.value+ +taxes.value)-((+discount.value/100)*(+price.value));
        total.innerHTML=resultat;
    }
    else{
        total.innerHTML="";
    }
}
//create product
let product_table;
if(localStorage.product !=null){
    product_table=JSON.parse(localStorage.product);
} 
else{
    product_table=[];
}
 create.onclick=function t(){
    let new_product={
        title:title.value,
        code:code.value,
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
    }
    //save in locale storage
    product_table.push(new_product);
    localStorage.setItem("product", JSON.stringify(product_table));
cleardata();
showdata();
}

//clear all inpute
function cleardata(){
title.value="";
code.value="";
price.value="";
taxes.value="";
discount.value="";
count.value="";
category.value="";
total.innerHTML="";
}
//read data
function showdata(){
       const tboody=document.getElementById("tbody");
      
         let tablee='';
           for(let i=0; i<product_table.lenght;i++){
          
             tablee += `
             <tr>
             <td>${i}</td>
             <td>${product_table[i].title}</td>
             <td>${product_table[i].code}</td>
             <td>${product_table[i].price}</td>
             <td>${product_table[i].taxes}</td>
             <td>${product_table[i].discount}</td>
             <td>${product_table[i].category}</td>
             <td>${product_table[i].total}</td>
             <td> <button id="update">update</button> </td>
             <td><button id="delete">delete</button></td>
             </tr>
              `
             ;
        } 
        tboody.innerHTML= tablee;
    }       
showdata ();
//count prod
//delete product
deleteall.onclick=function(){
    for(let i=0; i<product_table.lenght; i++){
           product_table.pop();
    }
    showdata();
}

//update product
//search data
//clean data 