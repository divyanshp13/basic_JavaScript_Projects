const url="https://quickchart.io/qr?text=";
const qrImage=document.querySelector(".qrImage");
const input=document.querySelector(".qrText");
const qrHolder=document.querySelector(".qrHolder");
const button=document.querySelector("button");

const generateQR=()=>{
    let text=input.value;
    if(text!=""){
        qrHolder.textContent="";
        const img=document.createElement("img");
        img.classList.add("qrImage");
        img.alt="QR_Code";
        img.src=url+encodeURIComponent(text);
        qrHolder.appendChild(img);
        qrHolder.classList.add("true");
    }
    if(text===""){
        input.classList.add("error");
        setTimeout(()=>{
            input.classList.remove("error");
        },1000)
    }
    
}

button.addEventListener("click",generateQR);
input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        generateQR();
    }
})
