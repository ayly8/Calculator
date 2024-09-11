const display = document.getElementById("display");

function append_display(input){
    display.value += input;
}

function clear_display(){
    display.value = "";
}

function calculate(){
   // send POST request to /evaluate_expression endpoint with the data from display field
   fetch('/evaluate_expression', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({x: display.value})
   })
   .then(response => response.json())
   .then(data => {
      // updates display field with suggested result from chatgpt api
      document.getElementById("display").value = data.gpt_eval;
   });
}
