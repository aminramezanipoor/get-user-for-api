let displaydata = ''
let alluser = ''
let allphoto = ''

const userApi = 'https://jsonplaceholder.typicode.com/users';
const photoApi = 'https://jsonplaceholder.typicode.com/photos';

const fetchData = async () => {
    const [usersResponse, photosResponse] = await Promise.all([
             fetch(userApi),
             fetch(photoApi)
         ]);
    const users =  await usersResponse.json()
    const photos = await photosResponse.json()

    alluser = users.slice(0, 10)
    allphoto = photos.slice(0, 10)

    displayUsers(alluser, allphoto)
}

const displayUsers = (users, photos) => {
    displaydata = ''

    users.forEach((user, index) => {
        const photo = photos[index];
        displaydata += `
        <div class="user">
                    <img src="${photo.url}" alt="User photo">
                    <div>
                        <h4>${user.name}</h4>
                        <h5>${user.username}</h5>
                    </div>
                </div>
`
    });
    document.getElementById('cont-user').innerHTML = displaydata;
};

const handleSearch = document.getElementById('serChes')

handleSearch.addEventListener('keyup', () => {
    const filterText = handleSearch.value.toUpperCase()
    const filterUsers = alluser.filter(user =>
        user.name.toUpperCase().includes(filterText) ||
        user.username.toUpperCase().includes(filterText)
    );
    displayUsers(filterUsers, allphoto);
})

fetchData()