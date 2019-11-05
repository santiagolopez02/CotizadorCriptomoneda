import React from 'react';

const Criptomoneda = ({criptomoneda}) => {

    //extraer nombres de la api
    const {FullName, Name} = criptomoneda.CoinInfo;

    return ( 
        <option value={Name}>{FullName}</option>
     );
}
 
export default Criptomoneda;