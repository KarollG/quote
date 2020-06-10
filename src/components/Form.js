import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {getYearDifference, calculateBrand , getPlan} from '../helper';

const Field = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label` 
    flex: 0 0 100px;
`;
const Select = styled.select` 
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none; 
`;
const InputRadio = styled.input`
    margin:0 1rem;
`;
const Button = styled.button`
    background-color: #107a8b;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 1rem;

    &:hover{
        background-color: #26C6DA;
        cursor:pointer;

    }
`;
const Error = styled.div` 
    background-color: red;
    color:white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom:1.5rem;
`;

const Form = ({saveResume, saveLoading}) => {

    const [data, saveData] = useState({
        brand: '',
        year: '',
        plan: ''
    });

    const [error, saveError] = useState(false);

    // extraer los valores del state
    const {brand, year, plan}= data;

    //leer los datos del formulario y pasarlos en el state
    const getInformation = e =>{
        saveData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    //cuando el usuario presiona submit
    const safeQuote= e =>{
        e.preventDefault();

        if(brand.trim() ==='' || year.trim() ==='' || plan.trim() === '') {
            saveError(true);
            return;
        }
        saveError(false);

        //una base de 2000
        let result = 2000;

        //obtener la diferencia de años 
        const difference = getYearDifference(year);
        // console.log(difference);

        //por cada año hay que restar el 3%
        result -= ((difference * 3) * result ) / 100;
        // console.log(result)

        //americano 15%
        //asiatico 5%
        //europeo 30%
        result = calculateBrand(brand)* result;
        // console.log(result);    

        //basico aumenta 20%
        //completo 50%
        const incrementPlan= getPlan(plan);
        // console.log(incrementPlan);
        result = parseFloat(incrementPlan*result).toFixed(2);
        // console.log(result);   

        saveLoading(true);

        setTimeout(() => {
            //eliminar spinner
            saveLoading(false);

            //pasa la informacion al componente principal 
            saveResume({
                quote: Number(result),
                data
            });
        }, 3000);

        //total
        
    }

    return ( 
        <form
            onSubmit={safeQuote}
        >
            { error ? <Error>Todos los campos son obligatorios</Error>  : null}
            <Field>
                <Label>Marca  </Label>
                <Select
                    name="brand"
                    value={brand}
                    onChange={getInformation}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano </option>
                    <option value="europeo">Europeo </option>
                    <option value="asiatico">Asiatico </option>
                </Select>
            </Field>
            <Field>
                <Label>Año  </Label>
                <Select
                    name="year"
                    value={year}
                    onChange={getInformation}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Field>
            <Field>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan" 
                    value="basico"
                    checked={plan ==="basico"}
                    onChange={getInformation}
                /> Básico
                <InputRadio 
                    type="radio"
                    name="plan" 
                    value="completo"
                    checked={plan ==="completo"}
                    onChange={getInformation}
                /> Completo 
            </Field>    
            <Button type="submit">Cotizar</Button>               
        </form>
     );
}
 
Form.propTypes = {
    saveResume: PropTypes.func.isRequired,
    saveLoading: PropTypes.func.isRequired
}

export default Form;