import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import {
  AppContext
}
from "../context/AppContext";

const JDAnalyzer = () => {

  const {
  resumes,
  token,
  backendUrl
} = useContext(AppContext);

  const [resumeId,
    setResumeId] =
    useState("");

  const [jobDescription,
    setJobDescription] =
    useState("");

  const [result,
    setResult] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const analyze =
    async () => {

      try {

        setLoading(true);

       
        const response = await fetch(
  `${backendUrl}/api/jd/analyze`,
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",

      Authorization:
        token
    },

    body: JSON.stringify({
      resumeId,
      jobDescription
    })
  }
);

const data =
  await response.json();

if (response.ok) {

  setResult(data);

} else {

  alert(data.message);

}

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="max-w-5xl mx-auto p-6">

      <div className='mb-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
            <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Resume JD Analyzer
      </h1>

      <select
        className="w-full border p-3 rounded-lg"
        value={resumeId}
        onChange={(e) =>
          setResumeId(
            e.target.value
          )
        }
      >

        <option value="">
          Select Resume
        </option>

        {resumes.map(
          (resume) => (

            <option
              key={resume._id}
              value={resume._id}
            >
              {resume.title}
            </option>

          )
        )}

      </select>

      <textarea
        className="w-full mt-4 border p-3 rounded-lg"
        rows={10}
        placeholder="Paste Job Description"
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
      />

      <button
        onClick={analyze}
        className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        {loading
          ? "Analyzing..."
          : "Analyze"}
      </button>

     {result && (

  <div className="mt-8">

    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-2xl font-bold">
        Match Score: {result.score}%
      </h2>

      <div className="mt-6">

        <h2 className="text-xl font-bold mb-3">
          Career Readiness
        </h2>

        <p>
          Overall:
          {result.careerReadiness?.overall}/100
        </p>

        <p>
          Technical Skills:
          {result.careerReadiness?.technicalSkills}/100
        </p>

        <p>
          Projects:
          {result.careerReadiness?.projects}/100
        </p>

        <p>
          Resume Quality:
          {result.careerReadiness?.resumeQuality}/100
        </p>

        <p>
          Interview Readiness:
          {result.careerReadiness?.interviewReadiness}/100
        </p>

      </div>

      <div className="mt-6">

        <h3 className="font-bold">
          Improvement Areas
        </h3>

        <ul>
          {result.improvementAreas?.map(
            (item, index) => (
              <li key={index}>
                • {item}
              </li>
            )
          )}
        </ul>

      </div>

      <div className="mt-6">
        <ul>
          <div className="mt-6">

  <h3 className="font-bold text-lg">
    Recommended Next Steps
  </h3>

  {result.nextSteps?.map(
    (item,index) => (

      <div
        key={index}
        className="border rounded-lg p-3 mt-2"
      >

        <p className="font-semibold">
          {item.skill}
        </p>

        <p>
          Priority:
          {item.priority}
        </p>

        <p>
          {item.reason}
        </p>

      </div>

    )
  )}

</div>
        </ul>

      </div>

    </div>

  </div>

)}

    </div>

  );

};

export default JDAnalyzer;