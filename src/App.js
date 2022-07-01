import './App.css';
import Mensaje from './Mensaje';

const Descripcion = () => {
  return <p>Esta es la App del curso de fullStack</p>
}

const App = ()=> {
  return (
    <div className="App">
      <Mensaje msg="Estamos trabajando en un curso de react" />
      <Descripcion />
    </div>
  );
}

export default App;
