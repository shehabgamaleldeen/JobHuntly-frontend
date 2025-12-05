import { NavLink, Outlet } from 'react-router-dom'

const ApplicantProfileNavbar = () => {
  return (
    <>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="."
          end
        >
          Resume
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="Q&A"
        >
          Question And Answers
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default ApplicantProfileNavbar
