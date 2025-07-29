'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Mess', href: '/admin/mess', icon: '🍽️' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-50 to-white min-h-screen border-r border-gray-200">
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-bold text-indigo-800 flex items-center">
          <span className="bg-indigo-100 p-2 rounded-lg mr-3">🏢</span>
          Admin Panel
        </h1>
      </div>
      <nav className="mt-2 px-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                  pathname === item.href 
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 text-lg ${pathname === item.href ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                {item.name}
                {pathname === item.href && (
                  <span className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            👤
          </div>
          <div>
            <p className="font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}