import { NavLink, Outlet } from 'react-router-dom'

type ApplicationProps = {
  [key: string]: any
}

const ApplicantProfileNavbar = ({ application }: ApplicationProps) => {
  const navLinkStyle = {
    active:
      'text-[#25324B] text-base font-semibold border-b-4 border-[#4640DE] pb-3',
    notActive: 'text-[#7C8493] text-base font-semibold pb-2',
  }
  return (
    <>
      <nav className="flex gap-5 border-b border-[#D6DDEB] mb-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? navLinkStyle.active : navLinkStyle.notActive
          }
          to="."
          end
        >
          Resume
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? navLinkStyle.active : navLinkStyle.notActive
          }
          to="Q&A"
        >
          Questions And Answers
        </NavLink>
      </nav>
      <Outlet context={application} />
    </>
  )
}

export default ApplicantProfileNavbar
