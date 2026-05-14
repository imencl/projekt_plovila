import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import PloviloService from "../../services/plovila/PloviloService"

export default function PloviloNovi(){

    const navigate = useNavigate()

    async function dodaj(plovilo){
        // ZA DEBUG console.table(plovilo)
        await PloviloService.dodaj(plovilo).then(()=>{
            navigate(RouteNames.PLOVILA_PREGLED)
        })
    }


    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            motor: podaci.get('motor'),
            duzina: podaci.get('duzina'),
            osobe: parseInt(podaci.get('osobe')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPorinuca: new Date(podaci.get('datumPorinuca')).toISOString(),
            dostupan: podaci.get('aktivan') === 'on'
        })
    }
  
    return (
        <>
            <h3>Dodavanje novog plovila</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv plovila</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>
                <Form.Group controlId="motor">
                    <Form.Label>Jačina motora</Form.Label>
                    <Form.Control type="text" name="motor" required />
                </Form.Group>
                <Form.Group controlId="duzina">
                    <Form.Label>Dužina plovila</Form.Label>
                    <Form.Control type="text" name="duzina" required />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena dnevnog najma (€)</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
                </Form.Group>

                <Form.Group controlId="osobe">
                    <Form.Label>Broj osoba</Form.Label>
                    <Form.Control type="number" name="osobe" step={1} />
                </Form.Group>

                <Form.Group controlId="datumPorinuca">
                    <Form.Label>Datum porinuća</Form.Label>
                    <Form.Control type="date" name="datumPorinuca" />
                </Form.Group>

                <Form.Group controlId="aktivan">
                    <Form.Check label="Dostupno" name="aktivan" />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.PLOVILA_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novo plovilo
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}