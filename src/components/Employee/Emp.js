import React ,{useState,useEffect} from "react";
import axios from "axios";
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
import "./Emp.css"
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet'

const geocodingClient=MapboxGeocoding({accessToken:'pk.eyJ1Ijoic2FuZnJvemVuIiwiYSI6ImNsZmpnMmRlZzAwa2Uzcm10Y3htZDJ2anAifQ.oHWWXeujnm3ju1Wq9EFOmQ'});
function EmployeeList()
{
    const [employee,setEmployee]=useState([]);
    const [selectedEmployee,setSelectedEmployee]=useState(null);
    const [locationCoordinates,setLocationCoordinates]=useState([0,0]);
    // const coordinatesx = [37.7749, -122.4194];
    useEffect(()=>{
        fetchEmployee();
    },[]);
   
    const fetchEmployee=async ()=>{
        try
        {
          const res=await  axios.get(
                "http://localhost:8080/Employee/api/v1",
                {
                    headers:
                    {
                        "Content-Type":"application/json"
                    }
                },
            );
                const emp=res.data
                setEmployee(emp);
        }
        catch(err)
        {
            console.log("There is an  error",err.message);
        }
    }
    const mapEmp=async(emp)=>{
        try
        {
            const res=await geocodingClient.forwardGeocode({
                query:emp.status.Location,
                limit:1
            }).send();
            const coordinates=res.body.features[0]?.center ??[0,0];
            console.log("CooriL",coordinates)
            return coordinates;
        }
        catch(err)
        {
            console.log("error",err.message);
            return [0,0];
        }
    }
    async function handelEmployeeClick(emp){
        setSelectedEmployee(emp);
    
        const coordinates=await mapEmp(emp);
        setLocationCoordinates(coordinates);
        console.log("hqan",coordinates);

    }
     const handelCloseModal=()=>{
            setSelectedEmployee(null);
            setLocationCoordinates([0,0]);
    }
    console.log("latitude",locationCoordinates[1],"longitude",locationCoordinates[0])
    return(
        <div>
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Contract</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((emp)=>(
                    <tr key={emp._id} >
                        <td>{emp.EmpID}</td>
                        <td>{emp.empName}</td>
                        <td>{emp.Age}</td>
                        <td>{emp.Department}</td>
                        <td>{emp.status.Location}</td>
                        <td>{emp.status.Contract}</td>
                        
                        <td>
                            <button onClick={()=>handelEmployeeClick(emp)} className="handelbtn">View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {
            selectedEmployee &&(
               
                    <div className="modal-content">
                        <h2>{selectedEmployee.empName}</h2>
                        <p><strong>Address:</strong>{selectedEmployee.address}</p>
                        <p><strong>Age:</strong>{selectedEmployee.Age}</p>
                        <p><strong>Department:</strong>{selectedEmployee.Department}</p>
                        <MapContainer key={selectedEmployee?._id} center={[locationCoordinates[1],locationCoordinates[0]]} zoom={5} >
                            <TileLayer 
                            attribution='&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributers'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            className="tile"
                        />
                        
                        <Marker position={[locationCoordinates[1],locationCoordinates[0]]} >
                             <Popup>
                                {selectedEmployee.status.Location}
                            </Popup>    
                        </Marker> 
                        </MapContainer>
                        <button onClick={handelCloseModal} className="btnclose">Close</button>
                        </div>            
              
                )
                
            }
            </div>
        )
        }
       

export default EmployeeList;

