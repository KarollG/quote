//obtiene la diferencia de años
export function getYearDifference(year){
    return new Date().getFullYear() - year;
}

//calcula el total a pagar segun la marca 
export function calculateBrand(brand){
    let increment;

    switch(brand){
        case 'europeo':
            increment= 1.30;
            break;
        case 'americano':
            increment= 1.15;
            break;
        case 'asiatico':
            increment= 1.05;
            break       
        default:
            break;
    }
    return increment;
}

//calcular el tipo de seguro
export function getPlan(plan){
    return (plan=== 'basico') ? 1.20 : 1.50;
}

//Muestra la primera letra mayuscula
export function firstCapital(text){
    return text.charAt(0).toUpperCase()+ text.slice(1);
}