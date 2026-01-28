export default function Navbar() {
  return (
    <div className="sticky top-4 z-50 flex justify-center">
      <div className="w-[95%] bg-white/80 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 flex items-center gap-4">
        <img
          src="https://i.ibb.co/8DdNcypz/1logo-removebg-preview.webp"
          alt="Logo"
          className="h-10 w-10 object-contain scale-200 ml-4"
        />
        <h1 className="text-xl font-semibold text-gray-800 m-auto">
          Incident Dashboard
        </h1>
      </div>
    </div>
  );
}
