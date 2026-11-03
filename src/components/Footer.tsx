import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React and Tailwind CSS.
        </p>
        <a href="#top" className="font-medium transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
