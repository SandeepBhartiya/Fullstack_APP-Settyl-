import {useHistory} from "react-router-dom";
import React,{useState} from "react";
import './sidebar.css'

function SideBar(){
    const [selectedItem,setSelectedItem]=useState(null);
    const history=useHistory();
    
    const isSelected=(item)=>{
        setSelectedItem(item)
        switch (item) {
            case 'item1':
              history.push('/');
              break;
            case 'item2':
              history.push('/employees');
              break;
            case 'item3':
              history.push('/online-check');
              break;
            case 'item4':
              history.push('/affiliate-system');
              break;
            case 'item5':
              history.push('/about-us');
              break;
            default:
              break;
          }
    };
 

    return(
            <div className='sidebar'>
               <p id="p1">Settyl</p>
                <p id="p2">MANAGE</p>
                <ul >
                    <li 
                    className={selectedItem ==='item1'?'selected':''} 
                    onClick={()=>isSelected('item1')}>
                        Home
                        
                    </li>
                    
                    <li 
                    className={selectedItem==='item2'?'selected':''} 
                    onClick={()=>isSelected('item2')}>
                
                        Employee
                    </li>
                    
                    <li 
                    className={selectedItem === 'item3'? 'selected':''} 
                    onClick={()=>isSelected('item3')}>
                   
                      Chart
                    </li>
                    
                    {/* <li 
                    className={selectedItem === 'item4'?'selected':''} 
                    onClick={()=>isSelected('item4')}>
                       
                  
                    </li> */}
                    
                    <p id="p3">Support</p>
                    <li
                     className={selectedItem === 'item5'?'selected':''} 
                    onClick={()=>isSelected('item5')}>
                      Abouts
                    </li>

                    
                </ul>
            </div>
    )
}

export default SideBar;