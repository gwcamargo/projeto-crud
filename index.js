const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const btnSalvar = document.querySelector('#btn-salvar')

const sNome = document.querySelector('#inome')
const sCidade = document.querySelector('#icidade')

const sEstado = document.querySelector('#iestado')
const sTelefone = document.querySelector('#itelefone')
const sNacionalidade = document.querySelector('#inacionalidade')

const sProfissao = document.querySelector('#iprofissao')

let itens
let id 

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.cidade}</td>
        <td>${item.estado}</td>
        <td>${item.telefone}</td>
        <td>${item.nacionalidade}</td>
        <td>${item.profissao}</td>
        <td class="acao">
            <button onclick="editItem(${index})"><i class="bx bx-edit"></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if (edit) {
        sNome.value = itens[index].nome
        sCidade.value = itens[index].cidade
        sEstado.value = itens[index].estado
        sTelefone.value = itens[index].telefone
        sNacionalidade.value = itens[index].nacionalidade
        sProfissao.value = itens[index].profissao
        id = index
    } else {
        sNome.value = ''
        sCidade.value = ''
        sEstado.value = ''
        sTelefone.value = ''
        sNacionalidade.value = ''
        sProfissao.value = ''
    }
}

btnSalvar.onclick = e => {
    if (sNome.value == '' || sCidade.value == '' || sEstado.value == '' || sTelefone.value == '' || sNacionalidade.value == '' || sProfissao.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].cidade = sCidade.value
        itens[id].estado = sEstado.value
        itens[id].telefone = sTelefone.value
        itens[id].nacionalidade = sNacionalidade.value
        itens[id].profissao = sProfissao.value
    } else {
        itens.push({'nome': sNome.value, 'cidade': sCidade.value, 'estado': sEstado.value, 'telefone': sTelefone.value, 'nacionalidade': sNacionalidade.value, 'profissao': sProfissao.value })
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}