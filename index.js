
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count= document.getElementById('count');
let categories=document.getElementById('categories');
let submit=document.getElementById('submit');
let mod='create';
let tmp;

// get total

function gettotal()
{ 
   
   if(price.value != ''){
      let result= (+price.value + +taxes.value + +ads.value)- +discount.value;
       total.innerHTML = result;
       total.style.backgroundColor='#040';
  }
  else{
   total.innerHTML='';
   total.style.backgroundColor='brown';
  }
}
// create product
let data;
if(localStorage.product!= null){
   data=JSON.parse(localStorage.product);
}else{
 data=[];
}
submit.onclick= function(){

   let prod= {
      title:title.value,
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      categories:categories.value,
   } 

    if(mod==='create'){
     
    if(prod.count>1){
        for(let i=0; i<prod.count; i++){
         data.push(prod)
        }
    }

    else{
      data.push(prod);
    }
} else{
   data[temp]=prod;
   mod='create';
   submit.innerHTML='create';
   count.style.display='default';

}
  
   //save data in local storage
  localStorage.setItem('product', JSON.stringify(data));
  //clear inputs
  clearinput();
  //read data
  showdata();
}


//save data in local storage
//clear inputs
function clearinput(){
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   count.value='';
   total.innerHTML='';
   count.value='';
   categories.value='';
}
//read data
function showdata(){
   gettotal();
   let tab=``;
  
   for(let i=0; i<data.length; i++){
      tab+= `
         <tr>
         <td>${i}</td>
         <td>${data[i].title}</td>
         <td>${data[i].price}</td>
         <td>${data[i].taxes}</td>
         <td>${data[i].ads}</td>
         <td>${data[i].discount}</td>
         <td>${data[i].total}</td>
         <td>${data[i].categories}</td>
         <td><button id ='update' onclick='updatedata(${i})' >update</button></td>
         <td><button onclick='deletedata(${i})'  id='delete' >delete</button></td>
         </tr>
         `
   }
         document.getElementById('tbody').innerHTML= tab;
         let btn=document.getElementById('deleteall');
         if(data.length>0){
            btn.innerHTML=`
            <button onclick='deleteall()' >delete ALL</button>
            `
         }  else{
            btn.innerHTML=''
         } 
}  
 
showdata();
//count product


//delete product
function deletedata(i){

  data.splice(i,1);

  localStorage.product=JSON.stringify(data);
  showdata()
}
//delte all
     function deleteall(){
      localStorage.clear();
      //if parametre =o the funcltiom splice delete all data from array

      data.splice(0);

      showdata();
     }
//update
function updatedata(i)
{
   temp=i;
   title.value=data[i].title;
  price.value=data[i].price;
   taxes.value=data[i].taxes;
   ads.value=data[i].ads;
  discount.value=data[i].discount;
   categories.value=data[i].categories;
   gettotal();
   count.style.display='none';
   submit.innerHTML=`update`;
   mod='update';
   scroll({
      top:0,
      behavior:'smooth',
   })

}

//search
let searchmod='bytitle';
function getsearchmod(id){
   let search=document.getElementById('search');
   if(id == 'searchtitle'){
      searchmod='bytitle';
      search.placeholder='search by title';


   }
   else{
      searchmod='bycategories';
      search.placeholder='search by categories';

   }
   search.focus();
   search.value= '';


}
function searchdata(value){
   let tab=``;
   if(searchmod == 'bytitle'){
         for(let i=0; i<data.length; i++){
            if(data[i].title.includes(value)) {
              tab +=` <tr>
               <td>${i}</td>
               <td>${data[i].title}</td>
               <td>${data[i].price}</td>
               <td>${data[i].taxes}</td>
               <td>${data[i].ads}</td>
               <td>${data[i].discount}</td>
               <td>${data[i].total}</td>
               <td>${data[i].categories}</td>
               <td><button id ='update' onclick='updatedata(${i})' >update</button></td>
               <td><button onclick='deletedata(${i})'  id='delete' >delete</button></td>
               </tr>
               `
            }
            document.getElementById('tbody').innerHTML= tab;
         }

   }else{
      for(let i=0; i<data.length; i++){
         if(data[i].categories.includes(value)){
           tab +=` <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].categories}</td>
            <td><button id ='update' onclick='updatedata(${i})' >update</button></td>
            <td><button onclick='deletedata(${i})'  id='delete' >delete</button></td>
            </tr>
            `
         }
         document.getElementById('tbody').innerHTML= tab;

   }
   document.getElementById('tbody').innerHTML= tab;
}
}
