import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Basic/Navbar/Navbar'
import Footer from './components/Basic/footer/footer'
import LandingPage from './components/Applicants/LandingPage/LandingPage'
import FindJobs from './components/Applicants/FindJobs/FindJobs'
import Login from './components/Applicants/Login/Login'
import Signup from './components/Applicants/Signup/Signup'
import SearchCompanies from './components/Applicants/SearchCompanies/SearchCompanies'
import NotFoundPage from './components/Basic/NotFoundPage'
import JobDescriptions from './components/Applicants/JobDescriptions/jobDescriptions'
import CompanyPageWrapper from './components/Applicants/CompanyProfile/CompanyPageWrapper'
import DashboardSettings from './components/Applicants/DashboardSettings/DashboardSettings'
import CompanyLayout from './components/Recruiters/CompanyLayout';
import CompanyDashboard from './components/Recruiters/Dashboard/Dashboard';
import JobCreateLayout from './components/Recruiters/JobCreate/JobCreateLayout';
import { JobCreateProvider } from "./components/Recruiters/JobCreate/JobCreateContext";
import Step1 from './components/Recruiters/JobCreate/Components/Steps/Step1';
import Step2 from './components/Recruiters/JobCreate/Components/Steps/Step2';
import Step3 from './components/Recruiters/JobCreate/Components/Steps/Step3';
import Step4 from './components/Recruiters/JobCreate/Components/Steps/Step4';
import { DashboardPublicProfile } from './components/Applicants/DashboardPublicProfile/DashboardPublicProfile';
import MyApplications from './components/Applicants/MyApplications/MyApplications';
import ApplicantProfile from './components/Recruiters/ApplicantProfile/ApplicantProfile'
import Resume from './components/Recruiters/ApplicantProfile/Resume'
import ApplyQuestionsAndAnswers from './components/Recruiters/ApplicantProfile/ApplyQuestionsAndAnswers'
import DashboardRecruiterSettings from "./components/Recruiters/DashboardSettings/DashboardRecruiterSettings";
import JobListPage from "./components/Recruiters/JobList/JobListPage";
import ApplicantsTable from "./components/Recruiters/Applicants/ApplicantsTable";
import './App.css'
import Step4 from './components/Recruiters/JobCreate/Components/Steps/Step4'


function App() {
  const location = useLocation();

  // Hide navbar on these routes
  const hideNavbarRoutes = ["/"];

  const shouldShowNavbar = hideNavbarRoutes.includes(location.pathname);



  return (


      <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
        <main className="grow">
          <Routes>
            
            {/*Applicants=================================================*/}
            <Route path="/" element={<LandingPage />} />
            <Route path="/DashboardSettings" element={<DashboardSettings />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/find-jobs/:id" element={<JobDescriptions />} />
            <Route path="/browse-companies" element={<SearchCompanies />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />
            {/*mariz*/}
            <Route path="/companies" element={<CompanyPageWrapper />} />
            <Route path="/companies/:id" element={<CompanyPageWrapper />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/job-lists" element={<JobListPage />} />
            <Route path="/applicants/:jobId" element={<ApplicantsTable />} />



            
            {/*( moaz )*/}
            <Route path="/dashboardSettings" element={<DashboardSettings />} />

            
            {/*( shuab )*/}
              <Route path="applicant-profile/:id" element={<ApplicantProfile />}>
                <Route index element={<Resume />} />
                <Route path="Q&A" element={<ApplyQuestionsAndAnswers />} />
              </Route>{' '}



            {/*Recruiters===============================================*/}

            {/*( moaz )*/}
            <Route path="/DashboardRecruiterSettings" element={<DashboardRecruiterSettings />} />
            


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
  )
}

export default App
