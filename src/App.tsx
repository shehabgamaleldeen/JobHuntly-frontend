import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Basic/Navbar/Navbar';
import Footer from './components/Basic/footer/footer';
import LandingPage from './components/Applicants/LandingPage/LandingPage';
import FindJobs from './components/Applicants/FindJobs/FindJobs';
import Login from './components/Applicants/Login/Login';
import Signup from './components/Applicants/Signup/Signup';
import SearchCompanies from './components/Applicants/SearchCompanies/SearchCompanies';
import NotFoundPage from './components/Basic/NotFoundPage';
import JobDescriptions from './components/Applicants/JobDescriptions/jobDescriptions'
import CompanyPageWrapper from './components/Applicants/CompanyProfile/CompanyPageWrapper'
import DashboardSettings from './components/Applicants/DashboardSettings/DashboardSettings'
import CompanyLayout from './components/Recruiters/CompanyLayout';
import JobCreateLayout from './components/Recruiters/JobCreate/JobCreateLayout';
import Step1 from './components/Recruiters/JobCreate/Components/Steps/Step1';
import Step2 from './components/Recruiters/JobCreate/Components/Steps/Step2';
import Step3 from './components/Recruiters/JobCreate/Components/Steps/Step3';
import Step4 from './components/Recruiters/JobCreate/Components/Steps/Step4';
import CompanyDashboard from './components/Recruiters/Dashboard/Dashboard';;
import { DashboardPublicProfile } from './components/Applicants/DashboardPublicProfile/DashboardPublicProfile';
import './App.css'
import { JobCreateProvider } from "./components/Recruiters/JobCreate/JobCreateContext";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/DashboardSettings" element={<DashboardSettings />} />
            <Route path="/PublicProfile" element={<DashboardPublicProfile />} />
            <Route path="/Landing" element={<LandingPage />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/find-jobs/:id" element={<JobDescriptions />} />
            <Route path="/browse-companies" element={<SearchCompanies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />

            {/*mariz*/}
            <Route path="/companies" element={<CompanyPageWrapper />} />
            <Route path="/companies/:id" element={<CompanyPageWrapper />} />

            {/*this is handled for now ( moaz )*/}
            <Route path="/dashboardSettings" element={<DashboardSettings />} />

            {/*Ahmed*/}
            <Route path="/company" element={<CompanyLayout />}>
              <Route index element={<CompanyDashboard />} />

              <Route
                path="job-create"
                element={
                  <JobCreateProvider>
                    <JobCreateLayout />
                  </JobCreateProvider>
                }
              >
                <Route index element={<Step1 />} />
                <Route path="step-1" element={<Step1 />} />
                <Route path="step-2" element={<Step2 />} />
                <Route path="step-3" element={<Step3 />} />
                <Route path="step-4" element={<Step4 />} />
              </Route>
            </Route>

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
