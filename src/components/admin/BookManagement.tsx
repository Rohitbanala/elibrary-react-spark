
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

const BookManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedDate: '',
    copies: 1,
    file: null
  });
  const { toast } = useToast();

  // Mock book data
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', publishedDate: '1925-04-10', copies: 5, available: 3 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', publishedDate: '1960-07-11', copies: 3, available: 1 },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Science Fiction', publishedDate: '1949-06-08', copies: 4, available: 4 }
  ]);

  const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography', 'History', 'Science'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Placeholder for actual API call
      console.log('Book API call:', formData);
      
      if (editingBook) {
        // Update book
        setBooks(books.map(book => 
          book.id === editingBook.id 
            ? { ...book, ...formData, id: editingBook.id, available: book.available }
            : book
        ));
        toast({
          title: "Success",
          description: "Book updated successfully",
        });
      } else {
        // Add new book
        const newBook = {
          id: Date.now(),
          ...formData,
          available: formData.copies
        };
        setBooks([...books, newBook]);
        toast({
          title: "Success",
          description: "Book added successfully",
        });
      }
      
      setShowForm(false);
      setEditingBook(null);
      setFormData({ title: '', author: '', genre: '', publishedDate: '', copies: 1, file: null });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save book",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (book: any) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedDate: book.publishedDate,
      copies: book.copies,
      file: null
    });
    setShowForm(true);
  };

  const handleDelete = (bookId: number) => {
    setBooks(books.filter(book => book.id !== bookId));
    toast({
      title: "Success",
      description: "Book deleted successfully",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your library's book collection</p>
        </div>
        <Button 
          onClick={() => {
            setShowForm(true);
            setEditingBook(null);
            setFormData({ title: '', author: '', genre: '', publishedDate: '', copies: 1, file: null });
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Book
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle>{editingBook ? 'Edit Book' : 'Add New Book'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  min="1"
                  value={formData.copies}
                  onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">Book File</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.epub,.mobi"
                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  />
                  <Upload className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="md:col-span-2 flex space-x-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingBook ? 'Update Book' : 'Add Book'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingBook(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Book Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Author</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Genre</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Published</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Copies</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Available</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{book.title}</td>
                    <td className="py-3 px-4 text-gray-600">{book.author}</td>
                    <td className="py-3 px-4 text-gray-600">{book.genre}</td>
                    <td className="py-3 px-4 text-gray-600">{new Date(book.publishedDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-gray-600">{book.copies}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        book.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {book.available}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(book)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default BookManagement;
