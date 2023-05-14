
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import getClient from "util/apolloclient";
import styled from "styled-components";
import React from 'react';

type GraphQLResponse = {availableSlots:{year: number, month: number, day: number, hour:number, available:boolean, dni:String }[]};


const Medico=() => {

    const query = gql`
    query AvailableSlots($year: Int!, $month: Int!, $day: Int) {
        availableSlots(year: $year, month: $month, day: $day) {
            year
            month
            day
            hour
            available
            dni
        }
    }
    `;

    const addSlot = gql`
    mutation addSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
        addSlot(year: $year, month: $month, day: $day, hour: $hour) {
            day
            month
            year
            hour
            available
            dni
    }
    }`;

    const removeSlot = gql`
    mutation removeSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!) {
        removeSlot(year: $year, month: $month, day: $day, hour: $hour) {
            day
            month
            year
            hour
            available
            dni
        }
    }`;

    
    const [newday, setNewDay] = useState<number>(0);
    const [newmonth, setNewMonth] = useState<number>(0);
    const [newyear, setNewYear] = useState<number>(0);
    const [newhour, setNewHour] = useState<number>(0);

    const handleNewDay = (event: { target: { value: string; }; }) => {
        setNewDay(parseInt(event.target.value));
    };

    const handleNewMonth = (event: { target: { value: string; }; }) => {
        setNewMonth(parseInt(event.target.value));
    };

    const handleNewYear = (event: { target: { value: string; }; }) => {
        setNewYear(parseInt(event.target.value));
    };

    const handleNewHour = (event: { target: { value: string; }; }) => {
        setNewHour(parseInt(event.target.value));
    };

    


    const [addSlotMutation] = useMutation(addSlot);
    const [removeSlotMutation] = useMutation(removeSlot);
    const {  error, data, refetch} = useQuery<GraphQLResponse|undefined>(query, {
        variables: {
          year: newyear || 0,
          month: newmonth||0,
          day:newday||0,
        },
        fetchPolicy: "network-only"
    });
      
    
   
  if (error) return <div>Error: {error.message}</div>;

   


   

     
    
    
      
    const { availableSlots } = data || { availableSlots: [] };

    return (
        <>
        He hecho esta página en CSR, ya que no tienes que coger información y
        prerenderizarla en el servidor, sino que la información se coge en el cliente a parte de que hay mutaciones 
        y estas solo se pueden hacer en el lado del cliente. La ventaja de hacer esto en CSR es que la página se carga más rápido, 
        ya que el servidor solo tiene que enviar el código HTML, CSS y JavaScript al cliente,
        además, como se mencionó anteriormente, el enfoque de CSR permite actualizaciones en tiempo real y es lo que 
        se necesita en este caso al añadir o eliminar slots.
        <Links href="/"> Volver</Links>
        <FLEX>
            <Title> Medico</Title>
            

            <Caja>
            <Subtitle> Agregar slot</Subtitle>
            <Cajas>
            <TEXTO>Dia:</TEXTO>
            <Input placeholder="00" type="number" value={newday} onChange={handleNewDay} />
            </Cajas>
            
               
            
            <Cajas>
            <TEXTO>Mes:</TEXTO>
             <Input placeholder="00" type="number" value={newmonth}  onChange={handleNewMonth} />
            </Cajas>
             
              
            <Cajas>
            <TEXTO>Año:</TEXTO>
            <Input placeholder="00" type="number" value={newyear} onChange={handleNewYear} />
            </Cajas>
            
            <Cajas>
            <TEXTO>Hora:</TEXTO>
            <Input placeholder="00" type="number" value={newhour} onChange={handleNewHour} />
            </Cajas>

            <Boton
              onClick={async () => {
               
                 await addSlotMutation({ variables: {
                    year: newyear,
                    month: newmonth,
                    day: newday,
                    hour: newhour,
                } });
                refetch() 
                
              
                
                          
             }}> AddSlot </Boton>
                          
                    
            </Caja>

            
                
               
            

            
            <Caja>
                <Subtitle> Slots disponibles</Subtitle>
                

             {availableSlots.length === 0 && <TEXTO>No hay slots disponibles</TEXTO>}
                {
                    availableSlots.map((slot: {year: number, month: number, day: number, hour:number, available:boolean}) => {
                        return (
                            
                            <Cajas>
                                <TEXTO>{slot.year}/{slot.month}/{slot.day} {slot.hour}:00hs</TEXTO>
                                <TEXTO>{slot.available ? "Disponible" : "No disponible"}</TEXTO>
                                
                                <Boton
                                onClick={async () => {
                                    await removeSlotMutation({ variables: {
                                        year: slot.year,
                                        month: slot.month,
                                        day: slot.day,
                                        hour: slot.hour,
                                    } });
                                    refetch()    
                                    
                                 }
                                 

                                }> Eliminar </Boton>


                                
                            </Cajas>
                        );
                    })
                }
            </Caja>

            </FLEX>
           
        </>
    );
    

   


}


export default Medico;



const Title = styled.h1`
  display: flex;
  justify-content: center;
  font : bold 100% monospace;
  font-size: 50px;

`;

const Input = styled.input`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 20px;
    color: #e0aa59;
    border-radius: 15px;
    margin: 10px;
`;


const Subtitle = styled.h2`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 30px;
    color: #e0aa59;
`;

const Links = styled.a`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 25px;
    color: #e0aa59;
    &:hover {
        color: #705f46;
    }
`;

const Boton = styled.button`
    background-color: #e0aa59;
    border: none;
    color: white;
    padding: 15px 32px;
    margin: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 15px;
    &:hover {
        background-color: #705f46;
        color: white;
    }
`;
const FLEX = styled.div`
  display: flex;

  justify-content: center;
    align-items: center;
    
    flex-direction: column;
 
   
  

  background-color: #cdc69a;
`;

const Caja = styled.div`
  display: flex;

  justify-content: center;
    align-items: center;
    flex-direction: column;
  width: 20%;
    height: 20%;
    padding: 50px;
  

  background-color: #a08d0e;
`;

const Cajas = styled.div`
  display: flex;
  justify-content: center;
    align-items: center;

  flex-direction: column;
`;

const TEXTO = styled.p`
  font: bold 100% monospace;
  font-family: "Courier New", Courier, monospace;
  color: white;
  font-size: 20px;
  
`;
