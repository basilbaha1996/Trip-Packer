import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// const initialItems = [
//   {id:1, description:"passports", quantity: 2, packed: false},
//   {id:2, description:"socks", quantity: 12, packed: false},
//   {id:3, description:"charger", quantity: 2, packed: true},
//   {id:4, description:"food", quantity: 11, packed: false},
// ];

function App() {
  const [items, setItems] = useState([])
  function handelAddItems(item) {
    setItems(items=> [...items, item])
    }
 function handlDeleteItem(id) {
   setItems(items=> items.filter(item=>item.id !== id))
 }


  return(
    <div className='app'>
      <Logo/>
      <Form onAddItems={handelAddItems}/>
      <PackingList items={items} onDeletItem={handlDeleteItem}/>
      <Stats/> 
    </div>
  )
}
export default App;

function Logo() {
  return <h1>🌴 Far Away 💼</h1>
}
function Form({onAddItems}) {
  const [description, setDescriptions] = useState("");
  const [quantity, setQuantity] = useState(1);
 

 

function handelSubmit(e){
e.preventDefault(); 

if(!description) return;
const newItem = {description, quantity, packed: false, id: Date.now()};
console.log(newItem)
onAddItems(newItem);
setDescriptions("");
setQuantity(1);
}   

  return( 
  <form className='add-form' onSubmit={handelSubmit}>
    <h3>What do you need for your trip? 😍</h3>
    <div className='form-container'>

    <select className='form-select' value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
     {Array.from({length:20}, (_, i) => i + 1). map
     ((num) => (
     <option value={num} key={num}>
      {num}
     </option>
     ))}
    </select>
     <input className='form-input' type='text' placeholder='Item...' value={description} onChange={(e)=>setDescriptions(e.target.value)}/>
    <button className='btn' >Add</button>
    </div>
  </form>
  )
}
function PackingList({items, onDeletItem}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    const currentIndex = selectedItems.indexOf(itemId);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(itemId);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(itemId => {
      onDeletItem(itemId);
    });
    setSelectedItems([]);
  };

  return (
    <div>
      <ul className='list'>
        {items.map(item => (
          <Item 
            key={item.id} 
            item={item} 
            onDeletItem={onDeletItem} 
            isSelected={selectedItems.includes(item.id)}
            handleCheckboxChange={handleCheckboxChange} 
          />
        ))}
      </ul>
      <button onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
  );
}

function Item({item, onDeletItem, isSelected, handleCheckboxChange}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleCheckboxChange(item.id)}
      />
      <span style={item.packed ? {textDecoration:'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button  
        onClick={() => onDeletItem(item.id)} 
        style={{ 
          backgroundColor: '#a4bb31', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          padding: '5px 10px', 
          cursor: 'pointer' 
        }}
      >
        ❌
      </button>
    </li>
  );
}

function Stats() {
  return( <footer className='stats'>
    <em>💼 You have X items on your list, and yoou already packed X (X%) </em>
  </footer>
  )
}
