import React, {useState} from "react";
import { TextField, Button, Container } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CreateJobs = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [jobType, setJobType] = useState("");
    const [salary, setSalary] = useState("");
    const [creatingDate, setCreatingDate] = useState("");
    const [closingDate, setClosingDate] = useState("");
    const [major, setMajor] = useState("");
    const [skill, setSkill] = useState("");
    const [experience, setExperience] = useState("");
    const [degree, setDegree] = useState("");
    const [value, setValue] = useState({
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
    const handleSubmit = (event) => {
        event.preventDefault();
        //alert("Form Submitted");
        axios.post(`/api/jobs`)
        .then(res => {
            setValue({...value, title: res.data.title,
            description: res.description,
            jobType: res.jobType,
            salary: res.salary,
            creatingDate: res.creatingDate,
            closingDate: res.closingDate,
            major: res.major,
            skill: res.skill,
            experience: res.experience,
            degree: res.degree
            })

            //navigate('/');
        })
        .catch(err => console.log(err))
    }
    return(
        <React.Fragment>
            <Container sx>
            <form onSubmit = {handleSubmit}>
                <h2>Create Job</h2>
                <TextField
                    label = "Title"
                    type = "text"
                    value = {title}
                    variant="outlined"
                    sx={{mb: 5}}
                    fullWidth
                    required
                    onChange ={e => setTitle(e.target.value)}                    
                />
                <TextField
                    label = "Description"
                    type = "text"
                    value = {description}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setDescription(e.target.value)}
                />
                <TextField
                    label = "Job type"
                    type = "text"
                    value = {jobType}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setJobType(e.target.value)}
                />
                <TextField
                    label = "Salary"
                    type = "text"
                    value = {salary}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setSalary(e.target.value)}
                />
                <TextField
                    label = "Major"
                    type = "text"
                    value = {major}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setMajor(e.target.value)}
                />
                <TextField
                    label = "Skill"
                    type = "text"
                    value = {skill}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setSkill(e.target.value)}
                />
                <TextField
                    label = "Experience"
                    type = "text"
                    value = {experience}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setExperience(e.target.value)}
                />
                <TextField
                    label = "Degree"
                    type = "text"
                    value = {degree}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={e => setDegree(e.target.value)}
                />
                <TextField
                    label = "Create date"
                    type = "date"
                    variant="outlined"
                    value = {creatingDate}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={(e) => setCreatingDate(e.target.value)}
                />
                <TextField
                    label = "Close date"
                    type = "date"
                    value = {closingDate}
                    fullWidth
                    sx={{mb: 5}}
                    required
                    onChange ={(e) => setClosingDate(e.target.value)}
                />
                <Button variant='contained' color = "primary" type = "submit">Submit</Button>               
            </form>
            </Container>
        </React.Fragment>
    )

}
export default CreateJobs;