import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);

  const enviarDate = (e) => {
    e.preventDefault();
    console.log(date);

    // Agregar la fecha al array de fechas marcadas
    setMarkedDates([...markedDates, date]);
    setDate(new Date()); // Reiniciar la fecha

    console.log(markedDates);
    //guardar en el localStorage
    localStorage.setItem("Calendar", JSON.stringify(markedDates));
  }

  useEffect(() => {
    console.log(date);
    let str = localStorage.getItem("Calendar");
    let arr = str ? str.split(",") : [];
    // Convertir las cadenas a objetos Date
  arr = arr.map(dateStr => new Date(dateStr));

  setMarkedDates(arr);
  markarEnElCalendario({ date })
  }, []);
  const markarEnElCalendario =({ date })=> {
    // Verificar si la fecha está en el array de fechas marcadas
    return markedDates.find(d => d.getTime() === date.getTime()) ? 'highlight' : '';
  }
  return (
    <div className="app">
      <h1 className="text-center">Marca en el calendario</h1>
      <div className="calendar-container">
        <form>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={markarEnElCalendario}
          />
          <button onClick={enviarDate}>Marcar Calendario</button>
        </form>
      </div>

      <p className="text-center">
        {/* <span className="bold">Fecha seleccionada:</span> {date.toDateString()} */}
      </p>
    </div>
  );
}

export default App;