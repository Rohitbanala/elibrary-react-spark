
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Clock, CheckCircle } from 'lucide-react';

const UserOverview = () => {
  // Mock user data
  const userStats = [
    {
      title: 'Books Borrowed',
      value: '2',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Due This Week',
      value: '1',
      icon: Clock,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'Reading History',
      value: '15',
      icon: Calendar,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Books Completed',
      value: '12',
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const currentBorrows = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      dueDate: '2024-02-15',
      daysLeft: 5
    },
    {
      title: '1984',
      author: 'George Orwell',
      dueDate: '2024-02-20',
      daysLeft: 10
    }
  ];

  const recommendations = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      rating: 4.8
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Fiction',
      rating: 4.6
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Science Fiction',
      rating: 4.7
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your reading journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
            <CardTitle>Currently Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBorrows.map((book, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.daysLeft <= 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {book.daysLeft} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((book, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium text-gray-900">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm text-gray-500">{book.genre}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
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

export default UserOverview;
