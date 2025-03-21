import { useState } from 'react'
import Sidebar from './components/common/Sidebar'
import Navbar from './components/common/Navbar'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <main className="flex-1 p-6">
        {/* Main content goes here */}
      </main>
    </div>
  );
}

export default App;