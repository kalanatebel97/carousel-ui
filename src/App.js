import './App.css';
import Carousel from './components/Carousel';

function App() {
  return (
    <div className='container'>

      <Carousel slideCount={1} infinite={false} />

      <Carousel slideCount={4} infinite={true} />

      <Carousel slideCount={10} infinite={false} />


    </div>
  )
}

export default App;
