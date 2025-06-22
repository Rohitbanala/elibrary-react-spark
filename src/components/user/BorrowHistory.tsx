
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, BookOpen, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const BorrowHistory = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock borrow history data
  const borrowHistory = [
    {
      id: 1,
      bookTitle: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      borrowDate: '2024-01-15',
      dueDate: '2024-02-15',
      returnDate: null,
      status: 'borrowed',
      daysLeft: 5
    },
    {
      id: 2,
      bookTitle: '1984',
      author: 'George Orwell',
      borrowDate: '2024-01-10',
      dueDate: '2024-02-10',
      returnDate: null,
      status: 'borrowed',
      daysLeft: 10
    },
    {
      id: 3,
      bookTitle: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      borrowDate: '2023-12-20',
      dueDate: '2024-01-20',
      returnDate: '2024-01-18',
      status: 'returned',
      daysLeft: null
    },
    {
      id: 4,
      bookTitle: 'Pride and Prejudice',
      author: 'Jane Austen',
      borrowDate: '2023-12-01',
      dueDate: '2024-01-01',
      returnDate: '2024-01-05',
      status: 'returned_late',
      daysLeft: null
    },
    {
      id: 5,
      bookTitle: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      borrowDate: '2023-11-15',
      dueDate: '2023-12-15',
      returnDate: '2023-12-10',
      status: 'returned',
      daysLeft: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'borrowed':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'returned':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'returned_late':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'returned_late':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'Currently Borrowed';
      case 'returned':
        return 'Returned';
      case 'returned_late':
        return 'Returned Late';
      default:
        return status;
    }
  };

  const filteredHistory = borrowHistory.filter(record => {
    if (statusFilter === 'all') return true;
    return record.status === statusFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime();
      case 'oldest':
        return new Date(a.borrowDate).getTime() - new Date(b.borrowDate).getTime();
      case 'title':
        return a.bookTitle.localeCompare(b.bookTitle);
      default:
        return 0;
    }
  });

  const stats = {
    total: borrowHistory.length,
    borrowed: borrowHistory.filter(r => r.status === 'borrowed').length,
    returned: borrowHistory.filter(r => r.status === 'returned').length,
    returnedLate: borrowHistory.filter(r => r.status === 'returned_late').length
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Borrow History</h1>
        <p className="text-gray-600 mt-2">Track your reading journey and borrowing activity</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Currently Borrowed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.borrowed}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returned On Time</p>
                <p className="text-2xl font-bold text-green-600">{stats.returned}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returned Late</p>
                <p className="text-2xl font-bold text-orange-600">{stats.returnedLate}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="borrowed">Currently Borrowed</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="returned_late">Returned Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Book Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Reading History ({filteredHistory.length} records)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Book</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Author</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Borrow Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Return Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{record.bookTitle}</td>
                    <td className="py-3 px-4 text-gray-600">{record.author}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(record.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        <span className="ml-1">{getStatusLabel(record.status)}</span>
                      </span>
                      {record.status === 'borrowed' && record.daysLeft !== null && (
                        <div className="text-xs text-gray-500 mt-1">
                          {record.daysLeft} days left
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
