
//get total
//create product
//save local storage
//clear inputs
//read
//count
//delete
//update
//search
//clean data
//==========================================================================================================================

let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById("ads");
let discount=document.getElementById('discount');
let total=document.getElementById('total'); 
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';
let temp;


//get total
function getTotal()
{


if(price.value !="")
{
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background="#09c";
}
else
{
    total.innerHTML="";
    total.style.background="#a00d02";
}


}



//create product
let addProduct;

if(localStorage.products!=null)
{
    addProduct=JSON.parse(localStorage.products);
}
else
{


    addProduct=[];
}

submit.onclick=function()
{
  

let myProduct={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),

}



if(title.value!='' &&  price.value!='' && category.value!='' && myProduct.count<100)
{
    if(mood=='create')
        {
        
            if(myProduct.count>1)
                {
                    for(let i=0;i<myProduct.count;i++)
                    {
                        addProduct.push(myProduct);
                    }
                }
                else
                {
                addProduct.push(myProduct);
                
                }
        }
        else
        {
        addProduct[temp]=myProduct;
        mood='create';
        submit.innerHTML="Create";
        count.style.display="block";
        }
 clearData();
        
}




 //save local storage
 localStorage.setItem("products",JSON.stringify(addProduct));


 displayProduct();
 


}














//clear inputs

function clearData()
{

title.value="";
price.value="";
taxes.value="";
ads.value="";
discount.value="";
total.innerHTML="";
count.value="";
category.value="";
}





//read



function displayProduct()
{

let contain='';
for(let i=0;i<addProduct.length;i++)
{
   contain+=
   `
   <tr>
    <td>${i+1}</td>
    <td>${addProduct[i].title}</td>
    <td>${addProduct[i].price}</td>
    <td>${addProduct[i].taxes}</td>
    <td>${addProduct[i].ads}</td>
    <td>${addProduct[i].discount}</td>
<td>${addProduct[i].total}</td>
<td>${addProduct[i].category}</td>
<td><button onclick="updateData(${i})" id="update">Update</button></td>
<td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
</tr>`;



}
document.getElementById("tbody").innerHTML=contain;
let deleteAllBtn=document.getElementById("deleteAll");
if(addProduct.length>0)
{
    deleteAllBtn.innerHTML=`
    
    <button onclick="deleteAll()">Delete All</button>
    
    `;

}
else
{
    deleteAllBtn.innerHTML=null;
}

}

displayProduct();




//delete one element


function deleteElement(i)
{
    
addProduct.splice(i,1);
localStorage.products=JSON.stringify(addProduct);
displayProduct();
}




//delete All
function deleteAll()
{
    addProduct.splice(0);
    localStorage.clear();
    displayProduct();

}


//update

function updateData(i)
{
title.value=addProduct[i].title;
price.value=addProduct[i].price;
taxes.value=addProduct[i].taxes;
ads.value=addProduct[i].ads;
discount.value=addProduct[i].discount;
category.value=addProduct[i].category;
count.style.display='none';
getTotal();

submit.innerHTML='Update';
mood='update';

temp=i;
scroll({
    top:0,
    behavior:"smooth"
});

}


 



//search
let moodSearch='title';


function getSearchMood(id)
{
    let search=document.getElementById("search");
    

if(id=='searchTitle')
{
    moodSearch='title';
}
else
{
    moodSearch='category';
  
}
search.placeholder='Search By'+ moodSearch;
search.focus();
search.value='';

displayProduct();

}




function searchData(value)
{
    let contain='';
if(moodSearch=='title')
{
    for(let i=0;i<addProduct.length;i++)
    {
        if(addProduct[i].title.includes(value.toLowerCase()))
        {
            
            contain+=
            `
            <tr>
             <td>${i}</td>
             <td>${addProduct[i].title}</td>
             <td>${addProduct[i].price}</td>
             <td>${addProduct[i].taxes}</td>
             <td>${addProduct[i].ads}</td>
             <td>${addProduct[i].discount}</td>
         <td>${addProduct[i].total}</td>
         <td>${addProduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">Update</button></td>
         <td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
         </tr>`;

        }
    
else
{
  if(addProduct[i].category.includes(value.toLowerCase()))
            {
                
                contain+=
                `
                <tr>
                 <td>${i}</td>
                 <td>${addProduct[i].title}</td>
                 <td>${addProduct[i].price}</td>
                 <td>${addProduct[i].taxes}</td>
                 <td>${addProduct[i].ads}</td>
                 <td>${addProduct[i].discount}</td>
             <td>${addProduct[i].total}</td>
             <td>${addProduct[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">Update</button></td>
             <td><button onclick="deleteElement(${i})" id="delete">Delete</button></td>
             </tr>`;
    
  }
        
}
    }
        
    }

    document.getElementById("tbody").innerHTML=contain;


}












