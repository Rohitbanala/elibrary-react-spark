
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, BookOpen, User, Calendar, Eye } from 'lucide-react';

const BrowseBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const { toast } = useToast();

  // Mock book data
  const books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      publishedDate: '1925',
      available: true,
      copies: 3,
      rating: 4.5,
      description: 'A classic American novel set in the Jazz Age.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publishedDate: '1960',
      available: true,
      copies: 1,
      rating: 4.8,
      description: 'A powerful story of racial injustice and childhood innocence.'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      publishedDate: '1949',
      available: false,
      copies: 0,
      rating: 4.7,
      description: 'A dystopian novel about totalitarian control.'
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      publishedDate: '1813',
      available: true,
      copies: 2,
      rating: 4.6,
      description: 'A romantic novel about manners and marriage.'
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Fiction',
      publishedDate: '1951',
      available: true,
      copies: 4,
      rating: 4.3,
      description: 'A coming-of-age story about teenage rebellion.'
    }
  ];

  const genres = ['All', 'Fiction', 'Science Fiction', 'Romance', 'Mystery', 'Biography'];
  const authors = ['All', ...new Set(books.map(book => book.author))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
    const matchesAuthor = authorFilter === 'all' || book.author === authorFilter;
    return matchesSearch && matchesGenre && matchesAuthor;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'rating':
        return b.rating - a.rating;
      case 'date':
        return parseInt(b.publishedDate) - parseInt(a.publishedDate);
      default:
        return 0;
    }
  });

  const handleBorrow = (book: any) => {
    if (!book.available) {
      toast({
        title: "Not Available",
        description: "This book is currently not available for borrowing",
        variant: "destructive",
      });
      return;
    }

    // Placeholder for actual API call
    console.log('Borrow book API call:', book.id);
    
    toast({
      title: "Success",
      description: `You have successfully borrowed "${book.title}"`,
    });
  };

  const handleReadOnline = (book: any) => {
    // Placeholder for online reading functionality
    console.log('Read online:', book.id);
    
    toast({
      title: "Opening Book",
      description: `Opening "${book.title}" in online reader`,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Browse E-Books</h1>
        <p className="text-gray-600 mt-2">Discover and borrow books from our digital collection</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-0 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.slice(1).map((genre) => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {authors.slice(1).map((author) => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="date">Publication Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-1">{book.title}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    {book.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {book.publishedDate}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium">{book.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {book.genre}
                </span>
                <span className={`inline-block ml-2 text-xs font-medium px-2 py-1 rounded ${
                  book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {book.available ? `${book.copies} available` : 'Not available'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReadOnline(book)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Read Online
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleBorrow(book)}
                  disabled={!book.available}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Borrow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
