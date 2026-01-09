import React from "react";

function FindJobContent(props: any) {
  const { 
    title, 
    highlightText, 
    searchTitle,
    setSearchTitle,
    searchLocation,
    setSearchLocation,
    handleSearch
  } = props;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Helper component for the clear button to keep the code dry
  const ClearButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      type="button"
      aria-label="Clear input"
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );

  return (
    <section className="w-full bg-[#F8F8FD] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-10">
            {title}
            <span className="text-[#4640DE] ml-4">
              {highlightText}
            </span>
          </h1>
        </div>
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
            
            {/* Job Title Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <svg 
                className="w-5 h-5 text-gray-400 shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Job title"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchTitle && <ClearButton onClick={() => setSearchTitle('')} />}
            </div>

            <div className="hidden sm:block w-px bg-gray-300"></div>

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <svg 
                className="w-5 h-5 text-gray-400 shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text"
                placeholder="City or country"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchLocation && <ClearButton onClick={() => setSearchLocation('')} />}
            </div>

            <button 
              onClick={() => handleSearch()}
              className="bg-[#4640DE] text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* Popular Tags Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500">Popular :</span>
            {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((tag, index, arr) => (
              <span 
                key={tag}
                className="text-gray-700 cursor-pointer hover:text-[#4640DE]"
                onClick={() => handleSearch({ title: tag })}
              >
                {tag}{index < arr.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindJobContent;