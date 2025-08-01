import { Users, Package, DollarSign, Smile, ArrowUp, ArrowDown } from "lucide-react"

export default function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const stats = [
    { title: "Total Users", value: "1,234", change: "+12%", trend: "up", icon: Users },
    { title: "Active Orders", value: "56", change: "+5.2%", trend: "up", icon: Package },
    { title: "Revenue", value: "$12,345", change: "-2.1%", trend: "down", icon: DollarSign },
    { title: "Satisfaction", value: "92%", change: "+3%", trend: "up", icon: Smile },
  ]
  const recentActivities = [
    { user: "John Doe", action: "placed an order", time: "2 min ago" },
    { user: "Jane Smith", action: "updated profile", time: "10 min ago" },
    { user: "Robert Johnson", action: "completed payment", time: "25 min ago" },
    { user: "Emily Davis", action: "requested support", time: "1 hour ago" },
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-white border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors shadow-sm">
              Export
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Generate Report
            </button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-blue-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-blue-900">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <div
                  className={`${stat.trend === "up" ? "text-green-600" : "text-red-600"} mt-4 text-sm flex items-center`}
                >
                  <TrendIcon className="w-4 h-4 mr-1" /> {stat.change}
                  <span className="text-blue-500 ml-2">vs last week</span>
                </div>
              </div>
            )
          })}
        </div>
        {/* Recent Activity and Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-1 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-blue-100 last:border-0">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{activity.user}</p>
                    <p className="text-sm text-blue-700">{activity.action}</p>
                    <p className="text-xs text-blue-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">View all activity</button>
          </div>
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue-900">Performance Overview</h2>
              <select className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-3 py-1.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="bg-blue-50 rounded-lg h-64 flex items-center justify-center text-blue-400 border border-blue-100">
              {"[Chart Visualization Placeholder]"}
            </div>
            <div className="flex justify-between mt-4 text-sm text-blue-500">
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
    </div>
  )
}
