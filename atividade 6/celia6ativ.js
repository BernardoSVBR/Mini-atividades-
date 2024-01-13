const respNome = document.querySelector(".fonteAzul");
        const respLista = document.querySelector("pre");
        const opcoesFilme = document.querySelectorAll(".opcao-filme");
        const respostaComedia = document.querySelector(".resposta-comedia");
        const respostaDrama = document.querySelector(".resposta-drama");
        const respostaTerror = document.querySelector(".resposta-terror");
        const resposta = document.querySelector(".respostas");
        const assistirBtn = document.querySelector(".assistir-btn");
        const filmes = [];

        function exibirFilme(filme) {
            respNome.innerText = filme;
            resposta.style.display = "flex";
            respostaComedia.innerText = "";
            respostaDrama.innerText = "";
            respostaTerror.innerText = "";
            assistirBtn.style.display = "inline";
        }

        function ocultarFilme() {
            respNome.innerText = "";
            resposta.style.display = "none";
        }

        function atualizarLista() {
            let lista = "";
            filmes.forEach((filme, i) => {
                lista += `${i + 1}.${filme}\n`;
            });
            respLista.innerText = lista;
        }

        function adicionarFilme(filme, respostaSpan) {
            filmes.push(filme);
            respostaSpan.innerText = filme;
            atualizarLista();
        }

        function removerFilme(index) {
            filmes.splice(index, 1);
        }

        function assistirFilme() {
            if (filmes.length === 0) {
                alert("Não há filmes na lista");
                return;
            }
            const filmeSelecionado = filmes.shift();
            if (filmes.length > 0) {
                const proximoFilme = filmes[0];
                exibirFilme(proximoFilme);
            } else {
                ocultarFilme();
                assistirBtn.style.display = "none";
            }
            atualizarLista();
        }

        opcoesFilme.forEach((opcao) => {
            const filme = opcao.value;

            opcao.addEventListener("click", () => {
                if (filme === "Comédia") {
                    adicionarFilme(filme, respostaComedia);
                } else if (filme === "Drama") {
                    adicionarFilme(filme, respostaDrama);
                } else if (filme === "Terror") {
                    adicionarFilme(filme, respostaTerror);
                }

                exibirFilme(filme);
            });
        });

        assistirBtn.addEventListener("click", assistirFilme);
        ocultarFilme();

        function removerResposta() {
            const respostaRemovida = this.previousElementSibling.previousElementSibling.innerText;
            const respostaSpan = document.querySelector(
                `.resposta-${respostaRemovida.toLowerCase()}`
            );
            const index = filmes.indexOf(respostaRemovida);
            if (index > -1) {
                removerFilme(index);
                respostaSpan.innerText = "";
                this.removeEventListener("click", removerResposta);
                if (filmes.length === 0) {
                    ocultarFilme();
                    assistirBtn.style.display = "none";
                } else {
                    const proximoFilme = filmes[0];
                    exibirFilme(proximoFilme);
                }
                atualizarLista();
            }
        }

        opcoesFilme.forEach((opcao) => {
            const removerBtn = opcao.nextElementSibling;
            removerBtn.addEventListener("click", removerResposta);
        });