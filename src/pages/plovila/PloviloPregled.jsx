import { Link , useNavigate} from 'react-router-dom'
import { RouteNames } from '../../constants'
import PloviloService from "../../services/plovila/PloviloService"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrValidate } from "react-icons/gr"
import FormatDatuma from "../../components/FormatDatuma"


export default function PloviloPregled(){

    //const plovila = getPlovila()

    const navigate = useNavigate()

     const [plovila, setPlovila] = useState([])

    useEffect(()=>{
        ucitajPlovila()
    },[])

    async function ucitajPlovila() {
        await PloviloService.get().then((odgovor)=>{
            // ZA DEBUG console.table(odgovor.data)
            setPlovila(odgovor.data)
        })
    }

    async function obrisi(sifra) {
        if(!confirm('Sigurno obrisati?')){
            return
        }
        await PloviloService.obrisi(sifra)
        ucitajPlovila()
    }

    return(
        <>
        <h1>Popis plovila</h1>
        
        <Link to={RouteNames.PLOVILA_NOVO} className="btn btn-success w-100 my-3">
            Dodaj novo plovilo
        </Link>

        <Table striped bordered hover>
            <thead>
                <tr key={plovila.sifra}>
                    <th>Naziv</th>
                    <th>Motor</th>
                    <th>Dužina</th>
                    <th>Osobe</th>
                    <th>Datum porinuća</th>
                    <th>Cijena €</th>
                    <th>Dostupan</th>
                    <th>Akcija</th>
                </tr>
            </thead>

            <tbody>
                {plovila.map((p)=>(
                    <tr key={p.sifra}>
                        <td className="lead">{p.naziv}</td>
                        <td className='text-end'>{p.motor}</td>
                        <td className='desno'>{p.duzina}</td>
                        <td className='desno'>{p.osobe}</td>
                        <td ><FormatDatuma datum={p.datumPorinuca} /></td>
                        <td className='desno'>
                            <NumericFormat value={p.cijena} displayType="text" thousandSeparator="." decimalSeparator="," suffix=" €" />
                        </td>
                        {/* <td className='desno'>
                            {p.dostupan ? 'DA' : 'NE'}
                        </td> */}
                        <td style={{textAlign: 'center'}}>
                            <GrValidate
                            size={25}
                            color={p.dostupan  ? 'green' : 'red'}
                            />
                        </td>
                        <td>
                            {/* <Link to={`/plovila/${p.sifra}`}>
                                Promjena
                            </Link> */}
                            <Button style={{ backgroundColor: '#000035', border: 'none' }} onClick={()=>{navigate(`/plovila/${p.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={()=>{obrisi(p.sifra)}}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>

        <br />
     
        </>
    )
}