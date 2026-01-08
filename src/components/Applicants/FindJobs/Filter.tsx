function Filter(props:any) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {props.title}
        </h3>
      </div>
      
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-gray-400">{props.fullTime}</span>
          <span className="text-gray-400 text-sm ">({props.fullTimeCount})</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-gray-400">{props.partTime}</span>
          <span className="text-gray-400 text-sm">({props.partTimeCount})</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-gray-400">{props.remote}</span>
          <span className="text-gray-400 text-sm">({props.remoteCount})</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-gray-400">{props.internship}</span>
          <span className="text-gray-400 text-sm ">({props.internshipCount})</span>
        </label>
        
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <span className="text-gray-400">{props.contract}</span>
          <span className="text-gray-400 text-sm">({props.contractCount})</span>
        </label>
      </div>
    </div>
  );
}

export default Filter;