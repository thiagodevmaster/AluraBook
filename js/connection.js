async function listBooks(){
    const connection = await fetch("https://guilhermeonrails.github.io/casadocodigo/livros.json");
    const convertedConnection = await connection.json();
    
    return convertedConnection;
}

export const apiConnect = {
    listBooks
}

