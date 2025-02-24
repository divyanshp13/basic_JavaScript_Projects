const arr = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { ans: "<css>", check: false },
            { ans: "<script>", check: false },
            { ans: "<style>", check: true },
            { ans: "<link>", check: false }
        ]
    },
    {
        question: "What is the correct way to create a text input field in an HTML form?",
        answers: [
            { ans: "<textfield>", check: false },
            { ans: '<input type="text">', check: true },
            { ans: "<text>", check: false },
            { ans: "<input>", check: false }
        ]
    },
    {
        question: "Which of the following is the correct syntax to apply a class in CSS?",
        answers: [
            { ans: "#classname { color: red; }", check: false },
            { ans: ".classname { color: red; }", check: true },
            { ans: "classname { color: red; }", check: false },
            { ans: "*classname { color: red; }", check: false }
        ]
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { ans: "text-color", check: false },
            { ans: "font-color", check: false },
            { ans: "color", check: true },
            { ans: "foreground-color", check: false }
        ]
    },
    {
        question: "Which CSS property is used to make text bold?",
        answers: [
            { ans: "bold", check: false },
            { ans: "font-weight", check: true },
            { ans: "text-bold", check: false },
            { ans: "weight", check: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { ans: "var", check: false },
            { ans: "let", check: false },
            { ans: "const", check: false },
            { ans: "All of the above", check: true }
        ]
    },
    {
        question: "Which function is used to display a message in an alert box in JavaScript?",
        answers: [
            { ans: "alertBox('Hello')", check: false },
            { ans: "msg('Hello')", check: false },
            { ans: "alert('Hello')", check: true },
            { ans: "display('Hello')", check: false }
        ]
    },
    {
        question: "Which event occurs when a user clicks on an HTML element?",
        answers: [
            { ans: "onmouseover", check: false },
            { ans: "onchange", check: false },
            { ans: "onclick", check: true },
            { ans: "onload", check: false }
        ]
    },
    {
        question: "How do you write a comment in JavaScript?",
        answers: [
            { ans: "// This is a comment", check: true },
            { ans: "<!-- This is a comment -->", check: false },
            { ans: "' This is a comment", check: false },
            { ans: "/ This is a comment /", check: false }
        ]
    },
    {
        question: "Which operator is used for strict equality comparison in JavaScript?",
        answers: [
            { ans: "==", check: false },
            { ans: "===", check: true },
            { ans: "=", check: false },
            { ans: "!=", check: false }
        ]
    }
];

let score=0;
let index=0;
const num=10;
const button=document.querySelector("button");
const question=document.querySelector("h3");
const ul=document.querySelector("ul");
const time=document.querySelector("#timer");
const timeSection=document.querySelector(".timerSection");
const defaultTimer=15;
let interval;

const setTimer=()=>{
    let count=defaultTimer
    time.style.color="white";
    time.textContent=count;
    interval=setInterval(()=>{
        count--;
        time.textContent=count;
        ul.addEventListener("click",(e)=>{
            if(e.target.tagName==="LI"){
                clearInterval(interval);
            }
        })
        if(count<=5){
            time.style.color="red";
        }
        if(count===0){
            clearInterval(interval);
            nextQuestion();
        }
    },1000)
}

const showQuestion=()=>{
    timeSection.style.display="block";
    button.disabled=true;
    button.classList.add("no-hover");
    ul.innerHTML="";
    if(index===num){
        clearInterval(interval);
        timeSection.style.display="none";
        question.innerText="";
        const li=document.createElement("li");
        li.innerHTML=`<br>your Text has Ended...<br><br>Your score is ${score} out of ${num}.<br><br>`;
        ul.appendChild(li);
        li.classList.add("no-hover-li");
        button.removeEventListener("click",nextQuestion);
        button.innerText="Restart Quiz";
        button.addEventListener("click",startQuiz);
        button.disabled=false;
        button.classList.remove("no-hover");
        return;
    }else{
        setTimer();
        if(index===num-1){
            button.innerText="End Test";
        }
        question.textContent=`${index+1}. ${arr[index].question}`;
        arr[index].answers.forEach(item=>{
            const li=document.createElement("li");
            li.className="option";
            li.dataset.check=item.check;
            li.textContent=item.ans;
            li.addEventListener("click",checkAnswer);
            ul.appendChild(li);
        })
    }
    
}

function checkAnswer(e){
    if(e.target.dataset.check==="true"){
        e.target.classList.add("true");
        score++;
    }
    else{
        e.target.classList.add("false");
    }
    const list=document.querySelectorAll(".option");
    list.forEach(item=>{
        if(item.dataset.check=="true"){
            item.classList.add("true");
        }
        item.classList.add("no-hover-li");
    })
    disableOptions();
    button.disabled=false;
    button.classList.remove("no-hover");
    
}

const disableOptions=()=>{
    const list=document.querySelectorAll(".option");
    list.forEach(item=>{
        item.removeEventListener("click",checkAnswer);
    })
}

const startQuiz=()=>{
    index=0;
    score=0;
    showQuestion();
    button.innerText="Next";
    button.removeEventListener("click",startQuiz);
    button.addEventListener("click",nextQuestion);
    
}

const nextQuestion=()=>{
    index++;
    showQuestion();
}
startQuiz();    

