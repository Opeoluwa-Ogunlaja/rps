var frame = 0;

const animate = () => {
    if(frame > 2) frame = 0 
    document.querySelectorAll('.tab').forEach(item => {
    item.classList.remove('active')
    })
    document.querySelectorAll('.tab')[frame].classList.add('active')

    frame++

    setTimeout(animate, 3000)
}

export default animate