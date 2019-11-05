import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error'

const Formulario = ({guardaMoneda, guardaCriptomoneda}) => {

    //useState
    //state para la api
    const [cripto, guardaCripto] = useState([]);
    //state para la moneda select
    const [monedaCotizar, guardarMonedaCotizar] = useState("");
    //state para la cripto select
    const [criptoCotizar, guardarCriptoCotizar] = useState("");
    //state error
    const [error, guardaError] = useState(false);

    //consulta api
    useEffect(()=>{

        const consultaApi= async ()=>{
            const url ='https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            
            guardaCripto(resultado.data.Data );
        }

        consultaApi();

    },[]);

    //ENVIAR EL FORM MEDIANTE VALIDACION
    const enviarForm =(e)=>{
        e.preventDefault();

        //validar form
        if (monedaCotizar === "" || criptoCotizar === "") {
            guardaError(true);
            return;
        }
        guardaError(false);

        //pasar los datos al componente app mediante props
        guardaMoneda(monedaCotizar);
        guardaCriptomoneda(criptoCotizar);
    }
    //mostrar el error en caso si exista
    const component = (error) ? <Error mensaje="Ambos campos son obligatorios"/> : null;

    return ( 
        <form
            onSubmit={enviarForm}
        >
            {component}
            <div className="row">
                <label>Elige tu moneda</label>
                <select className="u-full-width"
                    onChange={e => guardarMonedaCotizar(e.target.value)}
                >
                    <option value="">--Elige tu moneda--</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="GBP">Libra</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div className="row">
                <label> ELIGE TU CRIPTOMOMEDA</label>
                <select className="u-full-width"
                    onChange={e => guardarCriptoCotizar(e.target.value)}
                >
                    <option value="">--Elige tu criptomoneda--</option>
                    {cripto.map(cripto =>(
                        <Criptomoneda
                        key= {cripto.CoinInfo.Id}
                        criptomoneda= {cripto}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="COTIZAR"/>
        </form>
     );
}
 
export default Formulario;