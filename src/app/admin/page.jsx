export default function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up', icon: '👥' },
    { title: 'Active Orders', value: '56', change: '+5.2%', trend: 'up', icon: '📦' },
    { title: 'Revenue', value: '$12,345', change: '-2.1%', trend: 'down', icon: '💰' },
    { title: 'Satisfaction', value: '92%', change: '+3%', trend: 'up', icon: '😊' }
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'placed an order', time: '2 min ago' },
    { user: 'Jane Smith', action: 'updated profile', time: '10 min ago' },
    { user: 'Robert Johnson', action: 'completed payment', time: '25 min ago' },
    { user: 'Emily Davis', action: 'requested support', time: '1 hour ago' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 text-gray-800">{stat.value}</p>
              </div>
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
            <div className={`mt-4 text-sm flex items-center ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              <span className="text-gray-400 ml-2">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <span className="text-indigo-600">👤</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View all activity →
          </button>
        </div>

        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-1.5">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center text-gray-400">
            [Chart Visualization Placeholder]
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>
    </div>
  );
}