let botao = document.querySelector('button');
let aviso = document.querySelector('.aviso');

async function searchUser(username) {
    console.log('Executou a função');

    try {
        botao.innerText = 'Carregando...';
        botao.setAttribute('disabled', 'disabled');

        aviso.style.display = 'none';

        let response = await fetch(`https://api.github.com/users/${username}`);
        let data = await response.json();

        console.log('Recebi a resposta');

        if (response.ok && data.name) {
            document.querySelector('#name').innerText = data.name;

            document.querySelector('#imagem').setAttribute('src', data.avatar_url);
            document.querySelector('#imagem').setAttribute('alt', data.name);

            console.log(`Nome: ${data.name}`);
            console.log(data);

        } else {
            aviso.innerText = 'Usuário não encontrado ou sem nome público.';
            aviso.style.display = 'block';
        }

    } catch (error) {
        console.log('Ocorreu um erro:', error);

        aviso.innerText = 'Não foi possível buscar o usuário.';
        aviso.style.display = 'block';

    } finally {
        botao.removeAttribute('disabled');
        botao.innerText = 'Me Clique';
    }
}

botao.addEventListener('click', () => {
    searchUser('tuxgyn');
});