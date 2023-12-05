import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [instruments, setInstruments] = useState([]);
  const [newInstrument, setNewInstrument] = useState({
    id: 0,
    name: '',
    type: '',
    price: '',
    stock: '',
  });
  const [editInstrument, setEditInstrument] = useState(null);

  const addInstrument = () => {
    if (newInstrument.name.trim() !== '' && newInstrument.type.trim() !== '' && newInstrument.price > 0) {
      if (editInstrument) {
        // Update existing instrument
        const updatedInstruments = instruments.map(instrument =>
          instrument.id === editInstrument.id ? newInstrument : instrument
        );
        setInstruments(updatedInstruments);
        setEditInstrument(null);
      } else {
        // Add new instrument
        setInstruments([...instruments, { ...newInstrument, id: instruments.length + 1 }]);
      }

      setNewInstrument({
        id: 0,
        name: '',
        type: '',
        stock: '',
        price: '',
      });
    }
  };

  const deleteInstrument = (instrumentId) => {
    const updatedInstruments = instruments.filter(instrument => instrument.id !== instrumentId);
    setInstruments(updatedInstruments);
    setEditInstrument(null);
  };

  const editInstrumentClick = (instrument) => {
    setEditInstrument(instrument);
    setNewInstrument({ ...instrument });
  };

  return (
    <div>
      <h1>TOKO MUSIK MADE</h1>

      <div>
        <input
          type="text"
          placeholder="Alat Musik"
          value={newInstrument.name}
          onChange={(e) => setNewInstrument({ ...newInstrument, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipe Instrumen"
          value={newInstrument.type}
          onChange={(e) => setNewInstrument({ ...newInstrument, type: e.target.value })}
        />
        <input
        type="number"
          placeholder="Stock Alat Musik"
          value={newInstrument.stock}
          onChange={(e) => setNewInstrument({ ...newInstrument, stock: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Harga Alat Musik"
          value={newInstrument.price}
          onChange={(e) => setNewInstrument({ ...newInstrument, price: parseFloat(e.target.value) })}
        />
        <button onClick={addInstrument}>
          {editInstrument ? 'Update Alat Musik' : 'Tambahkan Alat Musik'}
        </button>
      </div>

      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.id}>
            {instrument.name} - {instrument.type} - {instrument.stock} - (Rp{instrument.price})
            <button onClick={() => editInstrumentClick(instrument)}>Edit</button>
            <button onClick={() => deleteInstrument(instrument.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;