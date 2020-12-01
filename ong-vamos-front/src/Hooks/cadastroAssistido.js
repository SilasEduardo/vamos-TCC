export default handleSubmit = useCallback(
    (event, url) => {
        event.preventDefault();

        api.post(`${url}/assistidos`, {

            assistido: {
                nome,
                nascimento,
                cpf,
                sexo,
                id_estado_civil: 1,
            },
            endereco: {
                rua,
                cidade,
                cep,
                bairro,
                id_tipo_moradia: 1
            },
            telefone: {
                ddd: 11,
                numero: "987652343",
                id_tipo_telefone: 2
            }

        }).then((a) => {
            console.log(a)
            alert('Cadastro realizado com sucesso!!');
        }).catch(() => {
            alert('Erro no cadastro!');
        })

    }

);