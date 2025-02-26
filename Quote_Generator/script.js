const quote=document.querySelector(".Quote");
const author=document.querySelector(".author");
const neww=document.querySelector(".new");
const share=document.querySelector(".share");   
const url="https://api.api-ninjas.com/v1/quotes"
const key="O1RkYXc320DZX6kDPo+f7Q==hqrw3ZbnapE2HBGP";


const getQuote=async ()=>{
    try{
        const text=await fetch(url, {
            method: "GET",  // HTTP method
            headers: {
                "X-Api-Key":key
            }
        });
        const data=await text.json();
        // console.log(data[0]);
        quote.innerText=data[0].quote;
        author.innerText=data[0].author;
        share.addEventListener("click",()=>{
            window.open(`https://twitter.com/intent/tweet?text=${data[0].quote}--${data[0].author}`,"Tweet Window","height=300,width=600");
        })
    }catch(e){
        console.log(e);
    }   
}


neww.addEventListener("click",getQuote);
getQuote();