import { ReactNode } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  children: ReactNode;
}

export function EditModal({
  isOpen,
  onClose,
  onSave,
  title,
  children,
}: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ×
          </button>
        </div>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
