import React from 'react';


const Resultado = ({resultado}) => {

    //validar por si esta el objeto vacio para mostart el resultado 
    if (Object.keys(resultado).length === 0) {
        return null;
    }
    return ( 
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio">
                El precio es: <span>{resultado.PRICE}</span>
            </p>
            <p>Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></p>
            <p>Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></p>
            <p>Variación del dia: <span>{resultado.CHANGEPCT24HOUR}%</span></p>
            <p>Última actialización: <span>{resultado.LASTUPDATE}</span></p>
        </div>

     );
}
 
export default Resultado;