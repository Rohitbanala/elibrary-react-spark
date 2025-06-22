
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar, TrendingUp } from 'lucide-react';

const AdminOverview = () => {
  // Mock data for overview cards
  const stats = [
    {
      title: 'Total Books',
      value: '1,247',
      change: '+12%',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '342',
      change: '+8%',
      icon: Users,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Books Borrowed',
      value: '89',
      change: '+15%',
      icon: Calendar,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Overdue Books',
      value: '5',
      change: '-20%',
      icon: TrendingUp,
      color: 'text-red-600 bg-red-50'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Monitor your library's performance and activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New book added', book: 'The Great Gatsby', time: '2 hours ago' },
                { action: 'Book borrowed', book: 'To Kill a Mockingbird', time: '4 hours ago' },
                { action: 'User registered', book: 'john.doe@email.com', time: '6 hours ago' },
                { action: 'Book returned', book: '1984', time: '8 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.book}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Popular Books This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'The Midnight Library', borrows: 23 },
                { title: 'Educated', borrows: 19 },
                { title: 'The Seven Husbands of Evelyn Hugo', borrows: 17 },
                { title: 'Where the Crawdads Sing', borrows: 15 }
              ].map((book, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.borrows} borrows</p>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(book.borrows / 25) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
