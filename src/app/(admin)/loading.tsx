export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className="flex space-x-3">
        <span className="dot delay-0" />
        <span className="dot delay-150" />
        <span className="dot delay-300" />
      </div>
    </div>
  );
}
