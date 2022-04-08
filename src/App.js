import axios from 'axios'
import {useState, useEffect} from 'react'
import service from './components/service'


const Display=(props)=>{
 
 return (
  <>
  <h2>Phonebook</h2>
  <form>
    <div>
      name:<input value={props.newName} onChange={props.handleChange} />
      number:<input value={props.number} onChange={props.handleNumChange}/>
      <button type ="submit" onClick={props.handlePerson} >add</button>

      </div>
   </form> 
   
     <h2>Numbers</h2>
     { Boolean(props.query)? props.person.filter((entry)=>entry.name === props.query).
     map(entry=><li key={entry.id}>{entry.name}
     <button onClick={props.deleteContact} id={entry.id}>Delete</button></li>): props.person.map((entry)=>
    <li key={entry.id}>{entry.name} {entry.contact} <button onClick={props.deleteContact} id={entry.id}>Delete</button> </li>
      )}
      search<input value={props.query} onChange={props.handleQuery} />
      </>
 )
}



const App=() =>{
   const [person, SetPersons]=useState([])

   const [newName, setNewName] = useState('')
   const [number,setNumber]=useState('')
   const [query,setQuery]=useState('')
   const [success, setSuccess] = useState('Add contact?')
   
   

    const checkDuplicate=(firstObj,secondObj)=>{
      const a1= Object.keys(firstObj)
        for(let i=0;i<a1.length;i++){
          if(firstObj[i].name===secondObj["name"]){
             alert('Contact already exist')
             return true
            }
            }
            
          }
        

  useEffect(()=>{
    service.getAll()
    .then(data=>SetPersons(data))
  },[])

   const handleChange=(event)=>{
     
    setNewName(event.target.value)
    
   }

   
   const handleNumChange=(event)=>{
    setNumber(event.target.value)
   }

   const handleQueryChange=(event)=>{
     setQuery(event.target.value)
    }

    const deleteContact=(event)=>{
      event.preventDefault()
      const id=event.currentTarget.id
      alert("Delete ?")
      service.removeContact(id).then(data=>person.concat([]))
      
      
      
    }

  
   const handlePerson=(event)=>{
         event.preventDefault()
         const newPerson={
         name:newName,
         contact:number,
         
        }
        if ((checkDuplicate(person,newPerson)))
        {
          return
        }else {
        service.create(newPerson).then(result=>SetPersons(person.concat(result))).then()
        setNewName('')
        setNumber('')
        setSuccess(`Added ${newName} to contacts :)`)
      }
    }

    const Notification = ({message})=>{
      if(message===null){
        return null
      }
      return (
        <div className="noti">
          {message}
        </div>
      )
    }

  
  return (
   <>
   <Notification message={success} />
    <Display 
    newName={newName} 
    number={number} 
    person={person} 
    handleNumChange={handleNumChange}
    handleChange={handleChange}
    handlePerson={handlePerson}
    handleQuery={handleQueryChange}
    query={query}
    deleteContact={deleteContact}
    
     />
    </>
  )
}

export default App;
