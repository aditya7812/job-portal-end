import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, doc,getDoc, setDoc, updateDoc, query,collectionGroup, where, getDocs } from "firebase/firestore";
import ListApplicants from "./ListApplicants";
import ListApplications from "./ListApplications";
import Header from "./Header";

const JobPosting = () => {
  const [loading, setloading] = useState(true)
  const [jobs, setJobs] = useState();
  const [application, setApplication] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState([])
  
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      
      const posts = query(collectionGroup(db, 'applications'), where('applicantUid', '==', currentUser.uid));
      const querySnapshot = await getDocs(posts);
      
      setApplication(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      
      let arr = [];



querySnapshot.docs.forEach(async (doc) => {
  const docRef =  doc.ref; 
  arr.push(docRef.parent.parent) 
});
console.log(arr)



const sec = [];
const secId = []
for (let i=0;i<arr.length;i++) {
  const tempjob = await getDoc(arr[i])
  secId.push(tempjob.id)
  sec.push(tempjob.data())
}
console.log(typeof(sec))
setJobs(sec)
setId(secId)

               
      setloading(false)
    };
    fetchData();
  }, []);

  {/*const applyForJob = async () => {
    const applicationRef =  doc(db, "jobcollection", jobId, "applications", currentUser.uid)

    await setDoc(applicationRef ,{
      applicantName: currentUser.displayName,
      applicantEmail: currentUser.email,
      applicantUid: currentUser.uid,
      status: "pending",
    })
    .then(() => {
      console.log("Application submitted");
    })
    .catch((error) => {
      console.error("Error submitting application: ", error);
    });
  };

  const updateApplicationStatus = async (event) => {
    
    const applicationRef =  doc(db, "jobcollection", jobId, "applications", currentUser.uid)

    await updateDoc(applicationRef, {
      status: event.target.value,
    })
    .then(() => {
      console.log("Application status updated");
      setStatus(event.target.value);
    })
    .catch((error) => {
      console.error("Error updating application status: ", error);
    });
  };*/}

  return (
    <>
            <Header/>
            <div className="table-container">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Post</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!loading ? 
      Object.keys(jobs).map(key1 => 
        <ListApplications key={key1} jobData={jobs[key1]} jobId={id[key1]} /> )
      
 : ""}
                    </tbody>
                </table>
            </div>
        </>
    
    
  );
};

export default JobPosting;
