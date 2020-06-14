console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    msg1.textContent = 'Please Wait ......'
    msg2.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
               // console.log(data)
               msg1.textContent = data.location
               msg2.textContent = data.forcast
                
            }
        })
    })
})