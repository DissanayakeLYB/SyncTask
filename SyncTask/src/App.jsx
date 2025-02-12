import { useState } from 'react'
import Sidebar from './components/common/Sidebar'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Main content goes here */}
      </main>
    </div>
  );
}

export default App
