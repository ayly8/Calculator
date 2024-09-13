// appends numbers/symbols the user selects on the display field
function append_display(input){
   const display = document.getElementById("display");
   display.innerText += input;
}

// clears the numbers/symbols on the display field
function clear_display(){
   const display = document.getElementById("display");
   display.innerText = "";
}

function calculate(){
   const display = document.getElementById("display");
   // send POST request to /evaluate_expression endpoint with the eval input from display field
   fetch('/evaluate_expression', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({input: display.innerText})
   })
   .then(response => response.json())
   .then(data => {
      // updates display field with suggested result from chatgpt api
      display.innerText = data.gpt_eval;
   });
}
