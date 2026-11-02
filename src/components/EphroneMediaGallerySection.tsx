import React, { useState, useRef } from 'react';
import { COMPANY_INFO, EPHRONE_FACILITY_ASSETS, FacilityAsset } from '../data/waterData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  Camera,
  Building2,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export const EphroneMediaGallerySection: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<FacilityAsset | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'facility' | 'warehouse'>('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPixiesetModal, setShowPixiesetModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const filteredAssets =
    activeTab === 'all'
      ? EPHRONE_FACILITY_ASSETS
      : EPHRONE_FACILITY_ASSETS.filter((a) => a.category === activeTab);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="facility-tour" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Ephrone Industries Limited • Bottling Plant</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            See Where Pure Excellence Is Bottled
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Take an exclusive cinema-grade aerial and ground tour of the{' '}
            <span className="text-white font-semibold">Aqua Uno</span> manufacturing plant operated by{' '}
            <span className="text-sky-300 font-semibold">{COMPANY_INFO.parentCompany}</span>.
          </p>
        </div>

        {/* Highlight 1: The Official Video Cinema Player */}
        <div className="mb-16 bg-slate-950/80 rounded-3xl border border-slate-800 p-3 sm:p-5 shadow-2xl relative">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black group">
            <video
              ref={videoRef}
              src={COMPANY_INFO.videoUrl}
              poster="/src/assets/images/aqua_uno_factory_facade.jpg"
              loop
              playsInline
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover cursor-pointer"
              onClick={toggleVideoPlay}
            />

            {/* Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity pointer-events-none ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
            />

            {/* Center Play Button (Visible when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={toggleVideoPlay}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group/btn"
                  aria-label="Play Facility Video"
                >
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white translate-x-1" />
                </button>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleVideoPlay}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-slate-300" /> : <Volume2 className="w-5 h-5 text-sky-400" />}
                </button>

                <div className="hidden sm:block text-xs font-semibold text-slate-200">
                  <span className="text-sky-400">Drone & Plant Reel</span> • Ephrone Industries Compound
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFullscreen}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Top Left Watermark */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>OFFICIAL FACTORY CINEMA</span>
            </div>
          </div>

          {/* Plant Stats Strip Under Video */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-2 text-center text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Facility Type</span>
              <span className="font-bold text-white">Modern Bottling Complex</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Operator</span>
              <span className="font-bold text-sky-300">{COMPANY_INFO.parentCompany}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Quality Assurance</span>
              <span className="font-bold text-emerald-400">KEBS & Micro-Purified</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="block text-slate-400 text-[11px] uppercase tracking-wider">Brand Motto</span>
              <span className="font-bold text-white font-script text-base">Trust in Every Drop</span>
            </div>
          </div>
        </div>

        {/* Highlight 2: Interactive Photo Gallery from Video Stills */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Camera className="w-6 h-6 text-sky-400" />
                <span>Production & Infrastructure Gallery</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Authentic photographic stills of our blue factory facade, warehouses, and grounds.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start sm:self-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Views
              </button>
              <button
                onClick={() => setActiveTab('facility')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'facility' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Exterior & Plant
              </button>
              <button
                onClick={() => setActiveTab('warehouse')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'warehouse' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Warehouse & Stock
              </button>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-blue-500/50 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-800 relative">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-sky-400" />
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    {asset.category === 'warehouse' ? 'Internal Distribution' : 'Facility Compound'}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-sky-300 transition-colors">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight 3: The Official TaurusArts Pixieset Client Gallery Integration Card */}
        <div className="mt-16 bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 rounded-3xl border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official TaurusArts Client Gallery</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Explore the High-Resolution TaurusArts Photo Collection
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The full photographic media archive for <span className="text-white font-semibold">{COMPANY_INFO.parentCompany}</span> and{' '}
                <span className="text-sky-300 font-semibold">Aqua Uno</span> is professionally hosted on our dedicated TaurusArts Pixieset gallery. Access raw high-res stills, event coverage, and branding imagery.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full High-Res Downloads
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Commercial Press Ready
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Authenticated Ephrone Assets
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={COMPANY_INFO.pixiesetGalleryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95 group text-center"
              >
                <span>Open TaurusArts Gallery</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={() => setShowPixiesetModal(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700 text-center"
              >
                <span>View Gallery Information</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Modal: Fullscreen Photo Lightbox */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <img
                src={selectedAsset.image}
                alt={selectedAsset.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Ephrone Industries Bottling Plant
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedAsset.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {selectedAsset.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={COMPANY_INFO.pixiesetGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <span>View in Pixieset</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedAsset(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Pixieset Gallery Overview */}
      {showPixiesetModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPixiesetModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-sky-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">TaurusArts Media Gallery</h4>
                  <span className="text-xs text-slate-400">Client: Ephrone Industries Limited</span>
                </div>
              </div>

              <button
                onClick={() => setShowPixiesetModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <p>
                The complete photography and videography portfolio for{' '}
                <strong className="text-white">Ephrone Industries Limited</strong> and{' '}
                <strong className="text-sky-400">Aqua Uno</strong> was directed and produced by{' '}
                <strong className="text-white">TaurusArts</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Gallery Link:</span>
                  <span className="text-sky-300 font-mono text-[11px] truncate max-w-[240px]">
                    taurusarts7.pixieset.com/ephroneindustrieslimited
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Resolution:</span>
                  <span className="text-emerald-400 font-semibold">Ultra HD / 4K Stills</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Coverage:</span>
                  <span className="text-white">Facility, Bottling Lines, Drone Aerials & Packaging</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Click below to open the Pixieset gallery in a new tab to browse full collections, download press assets, or view high-resolution packaging previews.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPixiesetModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Dismiss
              </button>
              <a
                href={COMPANY_INFO.pixiesetGalleryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <span>Open Pixieset Collection</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
