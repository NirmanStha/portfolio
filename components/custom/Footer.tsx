const Footer = () => (
  <footer className="bg-surface-1 border-t border-white/5 px-6 py-8 md:px-20">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
      <p>
        © {new Date().getFullYear()} Nirman Shrestha
        <span className="text-crimson">.</span>
      </p>
      <p>
        Built with Next.js — and a few{" "}
        <a href="#play" className="text-crimson-soft underline-offset-4 hover:underline">
          bugs left to squash
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
