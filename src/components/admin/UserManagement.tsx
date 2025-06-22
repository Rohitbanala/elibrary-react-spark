
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Eye, UserX, UserCheck, Search } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      status: 'active',
      borrowedBooks: ['The Great Gatsby', '1984'],
      borrowHistory: 15,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      status: 'active',
      borrowedBooks: ['To Kill a Mockingbird'],
      borrowHistory: 8,
      joinDate: '2023-03-22'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      status: 'restricted',
      borrowedBooks: [],
      borrowHistory: 23,
      joinDate: '2022-11-10'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: number, newStatus: 'active' | 'restricted') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    toast({
      title: "Success",
      description: `User ${newStatus === 'active' ? 'activated' : 'restricted'} successfully`,
    });
  };

  const handleViewDetails = (user: any) => {
    toast({
      title: "User Details",
      description: `Viewing full details for ${user.name}`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">Manage library users and their access permissions</p>
      </div>

      <Card className="mb-6 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Library Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Current Borrows</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">History</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {user.borrowedBooks.length > 0 ? (
                          <div>
                            {user.borrowedBooks.slice(0, 2).map((book, index) => (
                              <div key={index} className="text-gray-600">{book}</div>
                            ))}
                            {user.borrowedBooks.length > 2 && (
                              <div className="text-gray-400">+{user.borrowedBooks.length - 2} more</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">No current borrows</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.borrowHistory} books</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(user.id, 'restricted')}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(user.id, 'active')}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <UserCheck className="w-4 h-4" />
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

export default UserManagement;
