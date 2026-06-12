import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const InterviewPrep = () => {

  const {
    resumes,
    token,
    backendUrl


  } = useContext(AppContext);

  const [resumeId, setResumeId] =
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

  const generateQuestions = async () => {

  try {

    setLoading(true);

    const response = await fetch(
      `${backendUrl}/api/interview/generate`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },

        body: JSON.stringify({
          resumeId,
          jobDescription
        })
      }
    );

    if (!response.ok) {

      const text =
        await response.text();

      console.log(text);

      alert(
        "API Error: " +
        response.status
      );

      return;

    }

    const data =
      await response.json();

    setResult(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Interview Question Generator
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
        placeholder="Paste Job Description (Optional)"
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
      />

      <button
        onClick={generateQuestions}
        className="mt-4 bg-green-600 text-white px-5 py-3 rounded-lg"
      >
        {
          loading
            ? "Generating..."
            : "Generate Questions"
        }
      </button>

      {result && (

        <div className="mt-8">

          {/* Technical */}

          <div className="bg-white rounded-xl shadow p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Technical Questions
            </h2>

            <ul className="list-disc pl-5 space-y-2">

              {
                result.technicalQuestions?.map(
                  (q, index) => (

                    <li key={index}>
                      {q}
                    </li>

                  )
                )
              }

            </ul>

          </div>

          {/* Project */}

          <div className="bg-white rounded-xl shadow p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Project Questions
            </h2>

            <ul className="list-disc pl-5 space-y-2">

              {
                result.projectQuestions?.map(
                  (q, index) => (

                    <li key={index}>
                      {q}
                    </li>

                  )
                )
              }

            </ul>

          </div>

          {/* HR */}

          <div className="bg-white rounded-xl shadow p-5">

            <h2 className="text-xl font-bold mb-4">
              HR Questions
            </h2>

            <ul className="list-disc pl-5 space-y-2">

              {
                result.hrQuestions?.map(
                  (q, index) => (

                    <li key={index}>
                      {q}
                    </li>

                  )
                )
              }

            </ul>

          </div>

        </div>

      )}

    </div>

  );

};

export default InterviewPrep;