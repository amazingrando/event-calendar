import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="mt-auto bg-leafyGreen-dark ">
      <div className="mx-auto max-w-7xl w-full py-12 pt-6 px-6 lg:px-8 flex flex-row gap-6 text-whippedCream text-sm leading-5">
        <div className="">❤️ Built with NextJS, Tailwind, and Supabase.</div>
        <div>
          <a
            href="https://github.com/amazingrando/event-calendar"
            className="underline"
          >
            <FontAwesomeIcon icon={faGithub} /> Github
          </a>
        </div>
      </div>
    </footer>
  );
}
