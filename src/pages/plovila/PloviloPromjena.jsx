import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PloviloService from "../../services/plovila/PloviloService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function PloviloPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [plovilo, setPlovilo] = useState({})
    const [dostupan, setDostupan] = useState(false)

    useEffect(()=>{
        ucitajPlovilo()
    },[])

    async function ucitajPlovilo() {
        await PloviloService.getBySifra(params.sifra).then((odgovor)=>{
            const p = odgovor.data
            p.datumPorinuca = p.datumPorinuca.substring(0,10)
            setPlovilo(p)
            setDostupan(p.dostupan)
            console.table(odgovor.data)
        })
    }

    async function promjeni(plovilo) {
        await PloviloService.promjeni(params.sifra,plovilo).then(()=>{
            navigate(RouteNames.PLOVILA_PREGLED)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            motor: podaci.get('motor'),
            duzina: podaci.get('duzina'),
            osobe: parseInt(podaci.get('osobe')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPorinuca: new Date(podaci.get('datumPorinuca')).toISOString(),
            dostupan: dostupan
        })
    }

    return(
         <>
            <h3>Promjena plovila</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv plovila</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={plovilo.naziv}/>
                </Form.Group>

                <Form.Group controlId="motor">
                    <Form.Label>Jačina motora</Form.Label>
                    <Form.Control type="text" name="motor" required 
                    defaultValue={plovilo.motor}/>
                </Form.Group>
                
                <Form.Group controlId="duzina">
                    <Form.Label>Dužina plovila</Form.Label>
                    <Form.Control type="text" name="duzina" required 
                    defaultValue={plovilo.duzina}/>
                </Form.Group>

                <Form.Group controlId="osobe">
                    <Form.Label>Broj osoba</Form.Label>
                    <Form.Control type="number" name="osobe" step={1} 
                    defaultValue={plovilo.osobe}/>
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} 
                    defaultValue={plovilo.cijena}/>
                </Form.Group>

                <Form.Group controlId="datumPorinuca">
                    <Form.Label>Datum porinuća plovila</Form.Label>
                    <Form.Control type="date" name="datumPorinuca" 
                    defaultValue={plovilo.datumPorinuca}/>
                </Form.Group>

                <Form.Group controlId="dostupan">
                    <Form.Check label="Dostupno" name="dostupan" 
                    checked={dostupan}
                    onChange={(e)=>{setDostupan(e.target.checked)}}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.PLOVILA_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni plovilo
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}