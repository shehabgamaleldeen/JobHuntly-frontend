import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import type { Company } from "../Types";

interface ContactProps {
  company: Company;
}

function ContactSection({ company }: ContactProps) {
  const links = company.socialLinks;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Contact</h2>

      <div className="flex flex-wrap gap-3 text-gray-700">

        {/* Website */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm px-3 py-2 border text-[#4640de] bg-white hover:bg-gray-50 max-w-[calc(50%-6px)]"
          >
            <FontAwesomeIcon icon={faGlobe} />
            <span className="truncate">{company.website}</span>
          </a>
        )}

        {/* LinkedIn */}
        {links?.linkedin && (
          <a
            href={`https://${links.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm px-3 py-2 border text-[#4640de] bg-white hover:bg-gray-50 max-w-[calc(50%-6px)]"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span className="truncate">{links.linkedin}</span>
          </a>
        )}

        {/* Twitter */}
        {links?.twitter && (
          <a
            href={`https://${links.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm px-3 py-2 border text-[#4640de] bg-white hover:bg-gray-50 max-w-[calc(50%-6px)]"
          >
            <FontAwesomeIcon icon={faTwitter} />
            <span className="truncate">{links.twitter}</span>
          </a>
        )}

        {/* Instagram */}
        {links?.instagram && (
          <a
            href={`https://${links.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm px-3 py-2 border text-[#4640de] bg-white hover:bg-gray-50 max-w-[calc(50%-6px)]"
          >
            <FontAwesomeIcon icon={faInstagram} />
            <span className="truncate">{links.instagram}</span>
          </a>
        )}

        {/* GitHub */}
        {links?.github && (
          <a
            href={`https://${links.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm px-3 py-2 border text-[#4640de] bg-white hover:bg-gray-50 max-w-[calc(50%-6px)]"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="truncate">{links.github}</span>
          </a>
        )}

      </div>
    </div>
  );
}

export default ContactSection;


