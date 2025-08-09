import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SaveFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formName: string) => void;
}

export const SaveFormDialog: React.FC<SaveFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formName, setFormName] = useState('');

  const handleSave = () => {
    if (formName.trim()) {
      onSave(formName.trim());
      setFormName(''); // Clear input after saving
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Form</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="formName" className="text-right">
              Form Name
            </Label>
            <Input
              id="formName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
