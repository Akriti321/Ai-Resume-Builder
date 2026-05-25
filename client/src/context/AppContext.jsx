import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = "http://localhost:5000";
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch user data
    const fetchUserData = async (activeToken) => {
        try {
            const response = await fetch(`${backendUrl}/api/users/data`, {
                method: 'GET',
                headers: {
                    'Authorization': activeToken || token
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data);
                return data;
            } else {
                logout();
            }
        } catch (error) {
            console.error("Error loading user profile:", error);
            logout();
        }
    };

    // Load resumes
    const fetchUserResumes = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/resume`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (response.ok) {
                setResumes(data.resumes || []);
            }
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUser(data.user);
                navigate('/app');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Network error, please try again." };
        } finally {
            setLoading(false);
        }
    };

    // Register user
    const registerUser = async (name, email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setUser(data.user);
                navigate('/app');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: "Network error, please try again." };
        } finally {
            setLoading(false);
        }
    };

    // Create a new resume
    const createNewResume = async (title) => {
        try {
            const response = await fetch(`${backendUrl}/api/resumes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ title })
            });
            const data = await response.json();
            if (response.ok) {
                await fetchUserResumes();
                return { success: true, resume: data.resume };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error creating resume:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Delete a resume
    const deleteUserResume = async (resumeId) => {
        try {
            const response = await fetch(`${backendUrl}/api/resumes/delete/${resumeId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (response.ok) {
                setResumes(prev => prev.filter(res => res._id !== resumeId));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error deleting resume:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Fetch single resume
    const fetchSingleResume = async (resumeId) => {
        try {
            const response = await fetch(`${backendUrl}/api/resumes/get/${resumeId}`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, resume: data.resume };
            } else {
                console.error("Fetch Resume API Error:", data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error fetching single resume:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Save resume
    const saveResume = async (resumeId, resumeData) => {
        try {
            // Clean local/Mongoose fields before payload submission
            const cleanResumeData = { ...resumeData };
            delete cleanResumeData._id;
            delete cleanResumeData.userId;
            delete cleanResumeData.createdAt;
            delete cleanResumeData.updatedAt;
            delete cleanResumeData.__v;

            const formData = new FormData();
            formData.append("resumeId", resumeId);
            formData.append("resumeData", JSON.stringify(cleanResumeData));

            const response = await fetch(`${backendUrl}/api/resumes/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': token
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, resume: data.resume };
            } else {
                console.error("Save Resume API Error:", data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error saving resume:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Enhance professional summary with AI
    const enhanceSummary = async (userContent) => {
        try {
            const response = await fetch(`${backendUrl}/api/ai/enhance-pro-sum`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ userContent })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, enhancedContent: data.enhancedContent };
            } else {
                console.error("AI Summary Enhance Error:", data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("AI Summary Enhance Network Error:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Enhance job description with AI
    const enhanceJobDesc = async (userContent) => {
        try {
            const response = await fetch(`${backendUrl}/api/ai/enhance-job-desc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ userContent })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, enhancedContent: data.enhancedContent };
            } else {
                console.error("AI Job Description Enhance Error:", data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("AI Job Description Enhance Network Error:", error);
            return { success: false, message: "Network error" };
        }
    };

    // Logout
    const logout = () => {
        setToken('');
        setUser(null);
        setResumes([]);
        localStorage.removeItem('token');
        navigate('/');
    };

    // Load user data on startup if token exists
    useEffect(() => {
        if (token) {
            fetchUserData(token);
        }
    }, [token]);

    return (
        <AppContext.Provider value={{
            token,
            user,
            resumes,
            loading,
            loginUser,
            registerUser,
            logout,
            fetchUserResumes,
            createNewResume,
            deleteUserResume,
            fetchSingleResume,
            saveResume,
            enhanceSummary,
            enhanceJobDesc
        }}>
            {children}
        </AppContext.Provider>
    );
};
