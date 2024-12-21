let ModoOscuro = localStorage.getItem('modo-oscuro')
const modoSwitch = document.getElementById('modo-switch')

const enableModoOscuro = () => {
    document.body.classList.add('modo-oscuro')
    localStorage.setItem('modo-oscuro', 'active')
}

const disableModoOscuro = () => {
    document.body.classList.remove('modo-oscuro')
    localStorage.setItem('modo-oscuro', null)
}

if(ModoOscuro === "active") enableModoOscuro()

modoSwitch.addEventListener("click", () => {
   ModoOscuro = localStorage.getItem('modo-oscuro')
   ModoOscuro !== "active" ? enableModoOscuro() : disableModoOscuro()
})