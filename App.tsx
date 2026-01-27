import { DateTimeRangePicker } from './components/DateTimeRangePicker';
import { ThreeBackground } from './components/ThreeBackground';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-6 md:p-10 font-sans relative overflow-x-hidden">
      {/* 3D Model repositioned as a side companion */}
      <div className="fixed top-1/2 -right-60 w-[1000px] h-[1000px] -translate-y-1/2 opacity-30 pointer-events-none z-0 hidden lg:block">
        <ThreeBackground />
      </div>

      <header className="mb-12 text-center relative z-10 w-full max-w-2xl animate-enter-3d">
        <div className="inline-block px-5 py-2 mb-6 rounded-full glass border border-white/40 shadow-2xl bg-indigo-500/20">
          <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">⚡ Next-Gen 3D Interface ⚡</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
          Ultimate <span className="text-gradient">3D Picker</span>
        </h1>
        <p className="text-white font-bold text-sm max-w-lg mx-auto leading-relaxed glass p-6 rounded-[2rem] bg-slate-900/60 border-white/10 shadow-inner">
          Precision-engineered with <span className="text-indigo-400">Three.js</span> and <span className="text-fuchsia-400">Tailwind</span>. Experience a timezone-safe, fully accessible interface with real-time 3D feedback.
        </p>
      </header>

      <section aria-label="Date Picker Component" className="w-full flex justify-center relative z-10">
        <DateTimeRangePicker />
      </section>

      <footer className="mt-auto pt-10 text-indigo-400/40 text-[10px] font-black uppercase tracking-[0.3em] flex gap-8 relative z-10">
        <span className="hover:text-indigo-400 transition-colors cursor-default">Precision</span>
        <span>•</span>
        <span className="hover:text-fuchsia-400 transition-colors cursor-default">Perspective</span>
        <span>•</span>
        <span className="hover:text-cyan-400 transition-colors cursor-default">Performance</span>
      </footer>
    </div>
  );
}

export default App;
