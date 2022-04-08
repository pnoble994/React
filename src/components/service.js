import axios from 'axios'

const url = 'http://localhost:3001/persons'
const create = (object)=>{
    const request=axios.post(url,object)
    return request.then(response=>response.data)

}

const getAll= ()=>{
    const request=axios.get(url)
    return request.then(response=>response.data)
    
   
}

const removeContact=(id)=>{
    const url2=`http://localhost:3001/persons/${id}`
    const request = axios.delete(url2)
    return request.then(response=>response.data)
}

export default {getAll, create,removeContact}
