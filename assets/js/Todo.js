var x=document.getElementsByClassName("badge");
for(var i=0; i<x.length; i++)
{
    // x[i].style.display="none";
    //console.log(x[i].textContent);
    if(x[i].innerText=="")
    {
        x[i].style.display="none";
        //x[i].innerHTML="<br>";
    }
}
// var y = document.getElementsByClassName("") 