let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='create';
let tmp; 




//get total
function getTotal(){
    if (price.value!=''){
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHtml= result;
        total.style.background= '#040';
    }
    else{
        total.innerHtml='';
        total.style.background= 'red';
    }
}
//creat product
 let datapro;
if(localStorage.product !=null){
    datapro=JSON.parse(localStorage.product)
}
else{
    datapro=[]
}

submit.onclick= function(){
    let newpro={
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHtml,
        count: count.value,
        category: category.value,

    }
    if ( title.value !=''&& price.value !=''){
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
        
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }
   
    //count


//save localstorage
localStorage.setItem('product', JSON.stringify (datapro)  )
cleardata()
ShowData()
}





//clear inputs

function cleardata(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHtml='';
count.value='';
category.value='';
}


//read
function ShowData() {
let table='';
for(let i=0; i< datapro.length; i++){
    table+=`
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`
}
document.getElementById('tablebody').innerHTML = table; 
let btndelete= document.getElementById('deleteAll');
if (datapro.length>0){
    btndelete.innerHTML=`<button onclick="deleteAll()">delete all </button>`;
}else{btndelete.innerHTML='';

}

}


//delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product= JSON.stringify(datapro);
    ShowData();
}

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    ShowData()
}


//update
function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display= 'none';
    category.value=datapro[i].category;
    submit.innerHTML='update';
    mood='update';
    tmp = i;
    scrool({
        top:0,
        behavior:'smooth',
    });
}



//search
let searchmood='title';
function getsearchmood(id){
    let search=document.getElementById('search')
    if(id ==='searchtitle'){
        searchmood= 'title';
        search.placeholder='searchByTitle'
    }else{
        searchmood='category'
        search.placeholder='searchByCategory'
    }
    search.focus()
    search.value='';
    ShowData();

}



function searchData(value){
    let table='';
if(searchmood=='title'){
    for(let i=0 ;i<datapro.length; i++){
        if(datapro[i].title.includes(value)){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        }
    }
}else{
    for(let i=0 ;i<datapro.length; i++){
        if(datapro[i].category.includes(value)){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        }
    }
}
document.getElementById('tablebody').innerHTML = table; 
}


//clean data

