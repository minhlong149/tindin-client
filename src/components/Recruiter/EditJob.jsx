import React, {useEffect, useState} from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditJob = () => {
    const {jobId} = useParams();
    const [value, setValue] = useState({
        id: jobId,
        title: "",
        description: "",
        jobType: "",
        salary: "",
        creatingDate: "",
        closingDate: "",
        major: "",
        skill: "",
        experience: "",
        degree: ""
    })
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/api/jobs/${jobId}`)
        .then(res => {
            setValue({...value, title: res.data.title,
            description: res.data.description,
            jobType: res.data.jobType,
            salary: res.data.salary,
            creatingDate: res.data.creatingDate,
            closingDate: res.data.closingDate,
            major: res.data.major,
            skill: res.data.skill,
            experience: res.data.experience,
            degree: res.data.degree
        })
        })
        .catch(err => console.log(err))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Form Edited");
        axios.put(`/api/${jobId}`, value)
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err))
    }
    return(
        <React.Fragment>
            <Container sx>
            <form onSubmit = {handleSubmit}>
                <h2>Edit Job</h2>
                <TextField
                    label = "Title"
                    type = "text"
                    value = {value.title}
                    variant="outlined"
                    sx={{mb: 5}}
                    fullWidth
                    onChange ={e => setValue({...value, title: e.target.value})}                    
                />
                <TextField
                    label = "Description"
                    type = "text"
                    value = {value.description}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, description: e.target.value})}
                />
                <TextField
                    label = "Job type"
                    type = "text"
                    value = {value.jobType}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, jobType: e.target.value})}
                />
                <TextField
                    label = "Salary"
                    type = "text"
                    value = {value.salary}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, salary: e.target.value})}
                />
                <TextField
                    label = "Major"
                    type = "text"
                    value = {value.major}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, major: e.target.value})}
                />
                <TextField
                    label = "Skill"
                    type = "text"
                    value = {value.skill}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, skill: e.target.value})}
                />
                <TextField
                    label = "Experience"
                    type = "text"
                    value = {value.experience}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, experience: e.target.value})}
                />
                <TextField
                    label = "Degree"
                    type = "text"
                    value = {value.degree}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={e => setValue({...value, degree: e.target.value})}
                />
                <TextField
                    label = "Create date"
                    type = "date"
                    variant="outlined"
                    value = {value.creatingDate}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={(e) => setValue({...value, creatingDate: e.target.value})}
                />
                <TextField
                    label = "Close date"
                    type = "date"
                    value = {value.closingDate}
                    fullWidth
                    sx={{mb: 5}}
                    
                    onChange ={(e) => setValue({...value, closingDate: e.target.value})}
                />
                <Button variant='contained' color = "primary" type = "submit">Save</Button>               
            </form>
            </Container>
        </React.Fragment>
    )

}
export default EditJob;