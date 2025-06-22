
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Check, Clock, AlertTriangle } from 'lucide-react';

const BorrowManagement = () => {
  const [selectedBorrow, setSelectedBorrow] = useState<any>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    borrowDate: '',
    dueDate: '',
    returnDate: ''
  });
  const { toast } = useToast();

  // Mock borrow data
  const [borrows, setBorrows] = useState([
    {
      id: 1,
      userName: 'John Doe',
      bookTitle: 'The Great Gatsby',
      borrowDate: '2024-01-15',
      dueDate: '2024-02-15',
      returnDate: null,
      status: 'borrowed'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      bookTitle: 'To Kill a Mockingbird',
      borrowDate: '2024-01-10',
      dueDate: '2024-02-10',
      returnDate: null,
      status: 'overdue'
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      bookTitle: '1984',
      borrowDate: '2023-12-20',
      dueDate: '2024-01-20',
      returnDate: '2024-01-18',
      status: 'returned'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'borrowed':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'returned':
        return <Check className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateDueDate = (borrow: any) => {
    setSelectedBorrow(borrow);
    setFormData({
      borrowDate: borrow.borrowDate,
      dueDate: borrow.dueDate,
      returnDate: borrow.returnDate || ''
    });
    setShowUpdateForm(true);
  };

  const handleMarkReturned = (borrowId: number) => {
    const today = new Date().toISOString().split('T')[0];
    setBorrows(borrows.map(borrow => 
      borrow.id === borrowId 
        ? { ...borrow, returnDate: today, status: 'returned' }
        : borrow
    ));
    
    toast({
      title: "Success",
      description: "Book marked as returned successfully",
    });
  };

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    setBorrows(borrows.map(borrow => 
      borrow.id === selectedBorrow.id 
        ? { 
            ...borrow, 
            dueDate: formData.dueDate,
            returnDate: formData.returnDate || null,
            status: formData.returnDate ? 'returned' : (new Date(formData.dueDate) < new Date() ? 'overdue' : 'borrowed')
          }
        : borrow
    ));
    
    toast({
      title: "Success",
      description: "Borrow record updated successfully",
    });
    
    setShowUpdateForm(false);
    setSelectedBorrow(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Borrow Management</h1>
        <p className="text-gray-600 mt-2">Track and manage book borrowing activities</p>
      </div>

      {showUpdateForm && selectedBorrow && (
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Update Borrow Record</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  id="userName"
                  value={selectedBorrow.userName}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bookTitle">Book Title</Label>
                <Input
                  id="bookTitle"
                  value={selectedBorrow.bookTitle}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="borrowDate">Borrow Date</Label>
                <Input
                  id="borrowDate"
                  type="date"
                  value={formData.borrowDate}
                  onChange={(e) => setFormData({ ...formData, borrowDate: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date (Optional)</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Update Record
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowUpdateForm(false);
                    setSelectedBorrow(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Borrows</p>
                <p className="text-2xl font-bold text-blue-600">
                  {borrows.filter(b => b.status === 'borrowed').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Books</p>
                <p className="text-2xl font-bold text-red-600">
                  {borrows.filter(b => b.status === 'overdue').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Returned This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  {borrows.filter(b => b.status === 'returned').length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Borrow Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Book</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Borrow Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Return Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{borrow.userName}</td>
                    <td className="py-3 px-4 text-gray-600">{borrow.bookTitle}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(borrow.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(borrow.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(borrow.status)}`}>
                        {getStatusIcon(borrow.status)}
                        <span className="ml-1 capitalize">{borrow.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateDueDate(borrow)}
                        >
                          <Calendar className="w-4 h-4" />
                        </Button>
                        {borrow.status !== 'returned' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkReturned(borrow.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowManagement;
