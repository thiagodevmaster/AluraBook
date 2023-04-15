import { apiConnect } from "./connection.js";

export default function criarElementoDeLivro(livro){
    const livros = document.getElementById("livros");

    const div = document.createElement("div");
    div.setAttribute("class", "livro");

    livros.appendChild(div);
    if(livro.quantidade > 0){
        div.innerHTML = `
            <img class="livro__imagens" src="${livro.imagem}" alt="${livro.alt}" />
            <h2 class="livro__titulo">
            ${livro.titulo}
            </h2>
            <p class="livro__descricao">${livro.autor}</p>
            <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
            <div class="tags">
            <span class="tag">${livro.categoria}</span>
            </div>
        `;
    }else{
        div.innerHTML = `
            <img class="livro__imagens indisponivel" src="${livro.imagem}" alt="${livro.alt}" />
            <h2 class="livro__titulo">
            ${livro.titulo}
            </h2>
            <p class="livro__descricao">${livro.autor}</p>
            <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
            <div class="tags">
            <span class="tag">${livro.categoria}</span>
            </div>
        `;
    }
    
}

async function listarLivros(){
    try{
        const apiList = await apiConnect.listBooks();

        apiList.forEach(livro => {
            criarElementoDeLivro(livro);
        });
    }catch (Error){
        console.log(Error);
    }
}

listarLivros();