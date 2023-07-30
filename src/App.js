import './App.css';
import { NoteProvider } from './NoteContext';
import Home from './Home';
import NoteManager from './NoteManager';
function App() {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <NoteProvider>
          <Home/>
          <NoteManager/>
        </NoteProvider>
      </div>
    </>
  );
}

export default App;
