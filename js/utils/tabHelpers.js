export const setTab = (tabIndex) => {
    document.querySelectorAll('.tab').forEach(item => {
        item.classList.remove('active')
    })
    document.querySelectorAll('.tab')[tabIndex-1].classList.add('active')
}