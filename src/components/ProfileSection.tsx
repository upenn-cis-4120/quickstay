import { ReactNode } from "react";

interface ProfileSectionProps {
  icon: ReactNode;
  title: string;
  value: string;
  onEdit?: () => void;
  action?: ReactNode;
}

export function ProfileSection({
  icon,
  title,
  value,
  onEdit,
  action,
}: ProfileSectionProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-fit h-fit p-2 rounded-md bg-slate-200 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col space-y-1">
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-slate-500">{value}</div>
        </div>
      </div>
      {action ? (
        action
      ) : onEdit ? (
        <div
          className="text-sm text-slate-500 hover:underline cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </div>
      ) : null}
    </div>
  );
}
