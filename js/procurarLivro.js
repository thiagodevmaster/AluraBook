import { apiConnect } from "./connection.js";
import criarElementoDeLivro from "./main.js";

const botoes = document.querySelectorAll("[data-categoria]");

botoes.forEach(botao => {
    botao.addEventListener("click", (e) => {
        e.preventDefault();
        switch(e.target.dataset.categoria){
            case "front-end":
                console.log("front");
                procurar('front-end');
                break;
            case "back-end":
                console.log("back-end");
                procurar('back-end');
                break;
            case "dados":
                console.log("dados");
                procurar('dados');
                break;
            case "disponiveis":
                console.log('disponiveis');
                procurar('disponiveis');
                break;
            case "ordenar":
                console.log("ordenar");
                procurar('ordenar');
                break;
        }
    })
})

async function procurar(categoria){
    const get = await apiConnect.listBooks();
    const lista = document.getElementById('livros');

    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    const cat = get.filter(livro => livro.categoria == categoria);
    const disponiveis = get.filter(livro => livro.quantidade > 0);
    const order = get.sort(function(a,b) {
        if(a.preco < b.preco) return -1;
        if(a.preco > b.preco) return 1;
        return 0;
    });

    
    if(cat.length > 0 && categoria !== "ordenar"){
        cat.forEach(Element => {
            criarElementoDeLivro(Element);
        });
    }else if (order.length > 0 && categoria === "ordenar"){
        order.forEach(Element => {
            criarElementoDeLivro(Element);
        });
    }else if (disponiveis.length > 0 && categoria === "disponiveis"){
        disponiveis.forEach(Element => {
            criarElementoDeLivro(Element);
        });
    }else{
        lista.innerHTML = '<h2>Item não encontrado</h2>';
    }

}