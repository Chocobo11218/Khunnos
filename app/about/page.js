export default function About() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-gray-800">
        <div className="w-full max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-32 rounded-full object-contain"
            />
          </div>
  
          <h2 className="text-4xl font-extrabold mb-4">About Us</h2>
  
          <p className="text-lg leading-relaxed mb-4">
            <span className="font-semibold text-[#FF803D]">Khunnos</span> is a web
            application designed to simplify how you manage events in your Google Calendar.
          </p>
  
          <p className="text-lg leading-relaxed mb-4">
            With a clean, user-friendly interface, Khunnos lets you quickly <strong>add</strong>,{" "}
            <strong>edit</strong>, or <strong>delete events</strong> using simple text commands—
            no need to dig through menus or navigate complex settings.
          </p>
  
          <p className="text-lg leading-relaxed mb-4">
            Whether you're at your desk or on the go, Khunnos keeps your schedule just a few
            clicks away. It’s built for convenience—ideal for anyone who wants to save time
            and stay organized without the hassle of traditional calendar tools.
          </p>
  
          <p className="text-lg leading-relaxed">
            With Khunnos, managing your time is easier, faster, and more intuitive than ever.
          </p>
        </div>
      </div>
    );
  }
  