import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Dashboard from './Pages/Dashboard'
import ResumeBuilder from './Pages/ResumeBuilder'
import Preview from './Pages/Preview'
import Login from './Pages/Login'
import JDAnalyzer from "./Pages/JDAnalyzer";
import InterviewPrep from "./Pages/InterviewPrep";
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='builder/:resumeId' element={<ResumeBuilder/>} />
        </Route>
        <Route path='view/:resumeId' element={<Preview/>} />
        <Route path='login' element={<Login/>} />
        <Route
  path="/app/jd-analyzer"
  element={<JDAnalyzer />}
/>
      <Route
  path="/app/interview-prep"
  element={<InterviewPrep />}
/>
      </Routes>
    </>
  )
}

export default App