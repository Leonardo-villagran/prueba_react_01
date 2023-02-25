//App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import MiApi from './components/MiApi';
import { Container } from '@mui/material';
import Row from 'react-bootstrap/Row';

function App() {
  const nombreFooter = "@Leonardo-Villagrán";
  const emailFooter = "mailto:leonardovillagran@yahoo.com";

  return (
    <Container className='container-fluid bg-light-gradient '>
      <Row>
        <Card id='container-back' className="border border-secondary">
          <Card.Body>
            <MiApi />
          </Card.Body>
          <Card.Footer>
            <div className='p-2 text-center'>
              <a href={emailFooter}><Badge bg="secondary p-2">{nombreFooter}</Badge></a>
            </div>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
}
export default App;