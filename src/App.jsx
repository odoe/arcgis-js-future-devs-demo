import './App.css';
import { Header } from './components/Header';

function App() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header name="ArcGIS Demo App" />
      <main className="flex h-full"></main>
    </div>
  )
}

export default App;
