import { useState,useEffect } from "react";
import {getDatabase,ref, set,onValue,push,remove} from "./firebaseconf";
import "./input.css";

const Reminderinput = (props)=>{

    const [name,setName] =useState("");
    const [time,setTime] = useState("");
    const [date,setDate] = useState("");
    const [list,setList] = useState([]);
    const [del,setDel] = useState(false);
    const db = getDatabase();
    const userId = props.user.uid ;

    //TO add the task:
    function writeUserData(userId,name,time,date,status) {
        push(ref(db, 'users/' + userId), {
          Name: name,
          Time: time,
          Date: date,
          Status:status
        }).then(() => console.log("Data saved successfully!"))
        .catch((error) => console.error("Error saving data:", error));
      }

    //TO show task:
    useEffect(() => {
        const dbRef = ref(db, "users/" + userId);
        onValue(dbRef, (snapshot) => {
          const data = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            childData.id = childSnapshot.key; // add the id to the data object
            data.push(childData);
          });
          setList(data);
          console.log(list);
        });
      }, [del]);

    //To delete a task
    function handleDelete(id) {
        remove(ref(db, "users/" + userId + "/" + id))
          .then(() => {console.log("Data deleted successfully!");
            setDel(true);}
          ).catch((error) => console.error("Error deleting data:", error));
      }


  const handleDatabase = (e)=>{
    e.preventDefault();
    console.log(userId)
    const status ="Upcoming";
    if(name!=""&time!=""&date!=""){
      writeUserData(userId,name,time,date,status)   
    }
    else{
      alert("Please fill out all fields.");
    }  
  }  

  //To change the status of reminder
  const handleCompleted =(id,name,time,date)=>{
     const itemRef = ref(db, `users/${userId}/${id}`);
    set(itemRef, {Status:"Completed",Name:name,Time:time,Date:date})
    .then(() => {
    console.log("Data updated successfully!");
 })
    .catch((error) => {
    console.error("Error updating data:", error);
  })

  }


  return(
    <>
      <form className="inputform">
        <div className="inputdiv">
            <label>Name</label>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div className="inputdiv">
            <label>Time</label>
            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)}></input>
        </div> 
        <div className="inputdiv">
            <label >Date</label>
            <input min="01-01-2022"  type="date"  value={date} onChange={(e)=>setDate(e.target.value)}></input>
        </div>  
           <button onClick={handleDatabase} className="btn reminderbtn" >ADD REMINDER</button>
      </form>
        <div>
            
            <ul className="displaylist">
            <li>
                <p></p>
                <p>Name</p>
                <p>Time</p>
                <p>Date</p>
                <p>Delete</p>
                <p>Reminder Status</p>
              </li>
          {list.map((item) => (
            <>
              <li key={item.id} className={item.Status=="Completed"?"completedtask":"upcomingtask"}>
                <p><input type="checkbox" onClick={()=>{handleCompleted(item.id,item.Name,item.Time,item.Date)}}></input></p>
                <p>{item.Name}</p> 
                <p>{item.Time}</p>
                <p>{item.Date}</p>
                <p><button onClick={()=>{handleDelete(item.id)}} className="btn" >Delete</button></p>
                <p>{item.Status}</p>
              </li>
          </>
          
          ))}
        </ul>
        </div>
    
    </>
      
    )
}

export default Reminderinput;