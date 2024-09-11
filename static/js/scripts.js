function append_display(input){
   const display = document.getElementById("display");
   display.innerHTML += input;
}

function clear_display(){
   const display = document.getElementById("display");
   display.innerHTML = "";
}

function calculate(){
   const display = document.getElementById("display");
   // send POST request to /evaluate_expression endpoint with the data from display field
   fetch('/evaluate_expression', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({x: display.innerHTML})
   })
   .then(response => response.json())
   .then(data => {
      // updates display field with suggested result from chatgpt api
      display.innerHTML = data.gpt_eval;
   });
}
