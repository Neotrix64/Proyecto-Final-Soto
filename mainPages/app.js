const modal = document.getElementById('getModal')
const closeModal = document.getElementById('closeModal')
const UrlInput = document.getElementById('UrlInput')
const NameInput = document.getElementById('NameInput')
const container = document.querySelector('.movies')
const uploadImg = document.getElementById('uploadImg')
const submit = document.getElementById('submitMovie')
const searchInput = document.getElementById('searchInput')
const yearInput = document.getElementById('AñoInput');
const ReseñaInput = document.getElementById('DirectorInput');
const DirectorInput = document.getElementById('ReseñaInput');


const openModal = () => {
    modal.showModal()
}

const closeM = () => {
    modal.close()
}

submit.addEventListener('click', () => {
    const url = UrlInput.value;
    const name = NameInput.value;
    const year = yearInput.value;
    const reseña = ReseñaInput.value
    const director = DirectorInput.value;

    if (!url.trim() || !name.trim()) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie');
    const file = uploadImg.files[0]
    const img = URL.createObjectURL(file)

    movieContainer.innerHTML =
        `<div class="movie-card">
    <img src="${img}" alt=""><br>
    <p id="movieName">${name}</p>
    <p id="movieName">${year}</p>
    <p id="movieName">${reseña}</p>
    <p id="movieName">${director}</p>
    <button class="deleteBtn">Delete</button>
    <button class="editBtn">Edit</button>
    </div>`
    container.appendChild(movieContainer);

    UrlInput.value = '';
    NameInput.value = '';
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.remove();
    }
})



const logoutFun = () => {

    window.location.href = '../index.html'
}
