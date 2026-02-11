export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      
      <div className="container mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Blog Admin
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              A modern blog management dashboard built with 
              Next.js and Tailwind CSS.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-300 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="hover:text-white transition cursor-pointer">
                Dashboard
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Blogs
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Settings
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-neutral-300 uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-sm text-neutral-400">
              vqnhoang97tn@gmail.com
            </p>
            <p className="text-sm text-neutral-400">
              Ho Chi Minh City, Vietnam
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-sm text-neutral-500">
          © 2026 Blog Admin. All rights reserved.
        </div>

      </div>
    </footer>
  )
}
