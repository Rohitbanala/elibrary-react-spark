
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, BookOpen } from 'lucide-react';

interface OverdueModalProps {
  isOpen: boolean;
  onClose: () => void;
  overdueBooks: Array<{
    id: number;
    title: string;
    dueDate: string;
    daysOverdue: number;
  }>;
}

const OverdueModal: React.FC<OverdueModalProps> = ({ isOpen, onClose, overdueBooks }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Overdue Books Alert</span>
          </DialogTitle>
          <DialogDescription>
            You have {overdueBooks.length} overdue book{overdueBooks.length > 1 ? 's' : ''} that need your attention.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {overdueBooks.map((book) => (
            <div key={book.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{book.title}</h4>
                <p className="text-sm text-red-600">
                  Due: {new Date(book.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-red-700 font-medium">
                  {book.daysOverdue} day{book.daysOverdue > 1 ? 's' : ''} overdue
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700">
            Acknowledge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OverdueModal;
