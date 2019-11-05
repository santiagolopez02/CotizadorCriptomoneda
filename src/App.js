import React, {useState, useEffect} from 'react';
import cryptomonedas from './cryptomonedas.png'
import Formulario from './componentes/Formulario'
import axios from 'axios'
import Spinner from './componentes/Spinner'
import Resultado from './componentes/Resultado'

function App() {

  const [moneda, guardaMoneda] = useState("");
  const [criptomoneda, guardaCriptomoneda] = useState("");
  const [spinner, guardaSpinner] = useState(false);
  const [resultado, guardaResultado] = useState({});

  //request api
  useEffect(()=>{

    const cotizarCripto = async() =>{
      //si no hay moneda no ejecuta
      if(moneda ===""){
        return;
      }

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);

        //mostar spinner
        guardaSpinner(true);
        //ocultar spinner y guardar los resultados de la request en el objeto resultado del state
        setTimeout(()=>{
          guardaSpinner(false);
          guardaResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        },3000);
        
    }
    cotizarCripto();
  }, [criptomoneda, moneda]);

  const componente = (spinner)? <Spinner/> : <Resultado resultado={resultado}/>;

  return (
    
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={cryptomonedas} alt="imagen" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza tu Criptomoneda al instante</h1>
          <Formulario
            guardaMoneda = {guardaMoneda}
            guardaCriptomoneda={guardaCriptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
