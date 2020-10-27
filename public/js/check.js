let err = document.querySelector('#err');
let form = document.querySelector('.form-user');
form.addEventListener('submit', function(e){
  e.preventDefault();
  let input = document.querySelector('#username');
  value = input.value;
  if(value.match(/^[A-Za-z][0-9a-z_]+$/)){
    form.submit();
  }
  else{
    err.textContent='Username not valid. Username can only contain alphanumerical characters and underscores.'
  }
})
