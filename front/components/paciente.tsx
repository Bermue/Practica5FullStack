
import { SetStateAction, useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import getClient from "util/apolloclient";
import styled from "styled-components";
import React from 'react';

type GraphQLResponse = {availableSlots:{year: number, month: number, day: number, hour:number, available:boolean, dni:String }[]};


const Paciente = ( ) => {

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

    const bookSlot = gql`
    mutation BookSlot($year: Int!, $month: Int!, $day: Int!, $hour: Int!, $dni: String!) {
    bookSlot(year: $year, month: $month, day: $day, hour: $hour, dni: $dni) {
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
    const [newdni, setNewDni] = useState<string>("");
  

    
    const [bookSlotMutation] = useMutation(bookSlot);
    
    const {  error, data, refetch} = useQuery<GraphQLResponse|undefined>(query, {
      variables: {
        year: newyear || 0,
        month: newmonth||0,
        day:newday||0,
        dni: newdni||"",
      },
      fetchPolicy: "network-only"
    });

    
   
  if (error) return <div>Error: {error.message}</div>;

    
    

   
    
   



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
            <Title> Paciente</Title>
            <Caja>
            <Subtitle> Book slot</Subtitle>

            <Cajas>
            <TEXTO>Dia:</TEXTO>
            <Input placeholder="00" type="number" value={newday} onChange={(e: { target: { value: string; }; }) => setNewDay(parseInt(e.target.value))} />
            </Cajas>

            <Cajas>
            <TEXTO>Mes:</TEXTO>
            <Input placeholder="00" type="number" value={newmonth} onChange={(e: { target: { value: string; }; }) => setNewMonth(parseInt(e.target.value))} />
            </Cajas>
             
             
            <Cajas>
            <TEXTO>Año:</TEXTO>
            <Input placeholder="00" type="number" value={newyear} onChange={(e: { target: { value: string; }; }) => setNewYear(parseInt(e.target.value))} />
            </Cajas>
            
            <Cajas>
            <TEXTO>Hora:</TEXTO>
            <Input placeholder="00" type="number" value={newhour} onChange={(e: { target: { value: string; }; }) => setNewHour(parseInt(e.target.value))} />
            </Cajas>

            <Cajas>
            <TEXTO>DNI:</TEXTO>
            <Input placeholder="23456876N" type="Text" value={newdni} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewDni((e.target.value))} />
            </Cajas>

            </Caja>


                
               
            

            
            <Caja>
                <Subtitle> Slots disponibles</Subtitle>
                {data?.availableSlots.length === 0 && <TEXTO>No hay slots disponibles</TEXTO>}
                {



                    
                    data?.availableSlots.map((slot: {year: number, month: number, day: number, hour:number, available:boolean, dni:String }) => {
                        return (
                            

                            <Cajas>
                                <TEXTO>{slot.year}/{slot.month}/{slot.day} {slot.hour}:00hs</TEXTO>
                                <TEXTO>{slot.available ? "Disponible" : "No disponible"}</TEXTO>
                                <TEXTO>{slot.dni}</TEXTO>
                                <Boton onClick={async () => {
                                    await bookSlotMutation({
                                        variables: {
                                            year: slot.year,
                                            month: slot.month,
                                            day: slot.day,
                                            hour: slot.hour,
                                            dni: newdni,
                                        },
                                    });
                                   refetch();

                                    
                                }}>Reservar</Boton>
                                
                            </Cajas>
                        );
                    } )
                }
            </Caja>

            </FLEX>
           
        </>
    );
    

   

}
export default Paciente;



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
    color: #424242;
    border-radius: 15px;
    margin: 10px;
`;


const Subtitle = styled.h2`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 30px;
    color: #b1e059;
`;

const Links = styled.a`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 25px;
    color: #b7e059;
    &:hover {
        color: #617046;
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
  

  background-color: #41a00e;
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
