import React, { useRef, useState } from 'react'
import './scss/main.scss'
import { minidenticon } from 'minidenticons'
import data from './data';


const App = () => {

    const inputRef = useRef()

    //State Variables
    const [focus, setFocus] = useState(false)
    const [datas, setDatas] = useState(data)
    const [searchBox , setSearchBox] = useState(datas)
    const [inpNames,setInpNames] = useState([])

    //Adding From List to Input Div
    const addNames = (ind) => {
      // console.log(ind)
      setInpNames(preState => [...preState,datas[datas.findIndex(e => e.id === ind)]])
      setDatas(datas.filter((el,index)=> el.id !== ind))
      setSearchBox(datas.filter((el,index)=> el.id !== ind))
      setFocus(false)
      inputRef.current.value = ''
    }
    

    //Deleting from Input Div back to the List
    const delName = (ind) =>{
      // console.log(ind)
      setInpNames(inpNames.filter((el,index) =>  el.id !== ind))
      setDatas(pre => [...pre , inpNames[inpNames.findIndex(e => e.id === ind)]])
      setSearchBox(pre => [...pre, inpNames[inpNames.findIndex(e => e.id === ind)]])
      inputRef.current.value = ''
    }

    //Function for AutoComplete Functionality
    const setNameChange = (e) =>{
        let matches = datas.filter((el)=>{
            const reg = new RegExp(`${e}`,'gi')
            return el.name.match(reg)
        })
        setSearchBox(matches)
    }


    return (
      <>
        <div className="outerDiv">
          <div className="inputDiv">
            <ul>
              {
                inpNames.map((el,ind) => {
                  return (
                    <li key={el.id}> <span className='avt'> <img src={`data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(`${el.name}`))}`} alt="avatar" /></span> <span className='name'> {el.name} </span> &nbsp; <span className='closeBtn' onClick={e => delName(el.id)}> x</span></li>
                  )
                })
              }
            
            </ul>
            <input type="text" ref={inputRef} name="autocomplete" placeholder='Write a name' onChange={e => setNameChange(e.target.value)} onFocus={e =>  setFocus(true)} />
          </div>
          {
              focus ? (
                  <div className="list">
                    <ul> 
                    {
                        searchBox && searchBox.map((el,ind) => {
                          return (
                            <li key={el.id} onClick={e => addNames(el.id)}> <span className='avt'> <img src={`data:image/svg+xml;utf8,${encodeURIComponent(minidenticon(`${el.name}`))}`} alt="avatar" /></span> <span className='name'> {el.name} </span> &nbsp; <span className='email' > {el.email}</span></li>
                          )
                        })
                      }
                    
                    </ul>
                  </div>   

              ) : (
                null
              )
          }
        </div>
      </>
    )  
}

export default App