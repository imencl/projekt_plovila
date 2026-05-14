
 import plovila from './PloviloPodaci'

// 1/4 Read od CRUD
async function get(){
    return {data: [...plovila]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {data: plovila.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(plovilo){
    if(plovila.length===0){
        plovilo.sifra=1
    }else{
        plovilo.sifra = plovila[plovila.length - 1].sifra + 1
    }
    
    plovila.push(plovilo)
}

// 3/4 Update od CRUD
async function promjeni(sifra,plovilo) {
    const index = nadiIndex(sifra)
    plovila[index] = {...plovila[index], ...plovilo}
}

function nadiIndex(sifra){
    return plovila.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra)
    plovila.splice(index,1)
}

export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}