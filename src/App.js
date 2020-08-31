import React from 'react';
import axios from "axios";
import './App.css';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


library.add(faTrash)

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lista:[],
      id:0,
      titulo: '',
      status: '',
      
    }
    this.deleteItem = this.deleteItem.bind(this);

    this.edit = this.edit.bind(this);
  }

  componentDidMount(){
    axios.get("http://localhost:8080/lista/", {
      headers: { 
      'x-apikey': 'API_KEY',
      },
    responseType: 'json',
     })
    .then((res)=>{
      this.setState({
        lista:res.data,
        id:0,
        titulo:'',
        status:''
      })
    })
  }

  submit(event,id){
    event.preventDefault();
    if(id === 0){
      axios.post("http://localhost:8080/lista/",{
        titulo:this.state.titulo,
        status:"false"
     
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8080/lista/",{
        id:this.state.id,
        status:'false',

      }).then(()=>{
        this.componentDidMount();
      })

    }

  }


  deleteItem(id){
    axios.delete(`http://localhost:8080/lista/${id}`)
    .then(()=>{
      
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get(`http://localhost:8080/lista/${id}`, )
    .then((res)=>{
      axios.put(`http://localhost:8080/lista/${id}`,{
        id:res.data.id, 
        titulo: res.data.titulo,
        status:'true'

    }).then(() =>{
      this.componentDidMount();
    })
    
    })
  }
  render(){
    return(
      <div className="App">
        <header>
          <h1 id="h1">Todo-List Accenture</h1>
        <form id="todo-form" onSubmit={(e)=>this.submit(e,this.state.id)}>
          <input type="text" placeholder="Digite sua Tarefa"
          onChange={(e)=>this.setState({titulo:e.target.value})}
          value={this.state.titulo}
           />
          <button type="submit"><FontAwesomeIcon   icon={faPlus} /></button>
        </form>
      </header>

      <p>{this.state.lista.titulo}</p>
        
        <ListItems items={this.state.lista} deleteItem={this.deleteItem} edit={this.edit}/>
      
  
          
      </div>
      

     
            )
  }
}

export default App;
