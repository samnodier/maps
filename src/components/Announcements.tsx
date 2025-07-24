
const Announcements = () => {
  return (
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className="flex flex-col gap-4 mt-4">
        <div className="bg-mapSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
              <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, nulla perspiciatis.</p>
          </div>
        </div>
        <div className="bg-mapPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
              <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, cum, quaerat!</p>
          </div>
        </div>
        <div className="bg-mapYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
              <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, cumque, quam.</p>
          </div>
        </div>
        <div className="bg-mapSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit.</h2>
            <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-01-01</span>
              <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ipsam natus.</p>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Announcements;