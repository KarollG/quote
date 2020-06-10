import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {firstCapital} from '../helper';

const ContainerResume = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #107a8b;
    color: #FFF;
    margin-top: 1rem;
`;

const Resume = ({data}) => {
    //extraer de datos
    const {brand, year, plan} = data;

    if(brand === '' || year ==='' || plan ==='') return null;

    return (
        <ContainerResume> 
            <h2>Resumen de cotización</h2>
            <ul>
                <li>Marca: {firstCapital (brand)}</li>
                <li>Plan: {firstCapital (plan)}</li> 
                <li>Año del Auto: {year}</li>
            </ul>
        </ContainerResume>
      );
}
 
Resume.propTypes ={
    data: PropTypes.object.isRequired
}

export default Resume;