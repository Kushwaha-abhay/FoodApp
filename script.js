let names=["EVERYONE","DEVELOPERS","FITNESS FREAKS","VEGAN"];
let idx = 0;
let word = names[idx];
let text = "";
let changingText = document.querySelector("#changing-text");
let isDelete = false;
window.addEventListener("load", function(){
    typewords();
})

function typewords()
{
    if(isDelete && text.length == 0)
    {
        idx = (idx+1) % names.length;
        word = names[idx];
        isDelete = false;
    }

    if(text.length == word.length)
    isDelete = true;

     text =isDelete ? word.substring(0,text.length-1) : word.substring(0,text.length+1);
    changingText.innerHTML = text;
    setTimeout(typewords,text.length == word.length ? 1000 : 130);
}