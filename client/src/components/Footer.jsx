function Footer() {
  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          <h1 className="text-lg font-bold">Trackify</h1>

          <div className="flex gap-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-white cursor-pointer">About</a>
            <a href="#working" className="hover:text-white cursor-pointer">Contact</a>
            <a href="#" className="hover:text-white cursor-pointer">Privacy</a>
          </div>

        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          © 2026 Trackify. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default Footer;