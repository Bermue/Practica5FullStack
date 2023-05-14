import { Inter } from '@next/font/google'
import styled from "styled-components";

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <>
      <FLEX> 
      <Title> Bienvenido:  </Title>
      <Links href="/medico" color="blue"> Medico</Links>
      <Links href="/paciente" color="blue"> Paciente</Links>
      </FLEX>
    </>
  )
}


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

const FLEX = styled.div`
  display: flex;

  justify-content: center;
    align-items: center;
    
    flex-direction: column;
 
   
  

  background-color: #ffffff;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  font : bold 100% monospace;
  font-size: 50px;

`;