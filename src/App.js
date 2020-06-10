import React, {useState} from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Resume from './components/Resume';
import Result from './components/Result';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';

const Container =styled.div` 
  max-width: 600px;
  margin: 0 auto;
`;
const ContainerForm = styled.div` 
  background-color: #FFF;
  padding: 3rem;
`;

function App() {
  const [resume, saveResume] = useState({
    quote: 0,
    data: {
      brand: '',
      year: '',
      plan: ''
    }
  });

  const [loading, saveLoading] = useState(false);

  //extraer datos 
  const {quote, data} = resume;

  return (
    <Container>
        <Header
          title="Cotizador de seguros"
        />
        <ContainerForm>
          <Form 
            saveResume= {saveResume}
            saveLoading= {saveLoading}
          />

          {loading ? <Spinner />  : null}
          

          <Resume
            data= {data}
          />
          {!loading 
            ? <Result 
                quote={quote}
              /> 
            : null  
          }
          
        </ContainerForm>
    </Container>
  );
}

export default App;
