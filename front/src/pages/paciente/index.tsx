
import Paciente from 'components/paciente'
import React from 'react';

// He hecho esta página en CSR, ya que no tienes que coger información y
//         prerenderizarla en el servidor, sino que la información se coge en el cliente a parte de que hay mutaciones 
//         y estas solo se pueden hacer en el lado del cliente. La ventaja de hacer esto en CSR es que la página se carga más rápido, 
//         ya que el servidor solo tiene que enviar el código HTML, CSS y JavaScript al cliente,
//         además, como se mencionó anteriormente, el enfoque de CSR permite actualizaciones en tiempo real y es lo que 
//         se necesita en este caso al añadir book.

export default function Home() {
  return (
    <>
      <Paciente  />
    </>
  )
}
