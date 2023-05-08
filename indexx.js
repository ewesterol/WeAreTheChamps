const display = document.getElementById("display");
const publishBtn = document.getElementById("publish-btn");
const endorseField = document.getElementById("endorseField");

publishBtn.addEventListener("click", () => {
    const dis = []
    let inputValue = endorseField.value;
    dis.push(inputValue)
    for (let i = 0; i < dis.length; i++){
        let curt = dis[i];
        display.innerHTML += `<li> ${curt} </li>`;
    }
        
    
  
});
