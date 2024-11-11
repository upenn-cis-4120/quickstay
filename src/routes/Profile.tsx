import { useState } from "react";
import {
  MdOutlineAttachMoney,
  MdOutlineCalendarToday,
  MdOutlineLocationOn,
  MdNotifications,
} from "react-icons/md";
import { ProfileSection } from "../components/ProfileSection";
import { EditModal } from "../components/EditModal";
import * as Switch from "@radix-ui/react-switch";

type EditingField = "budget" | "dates" | "location" | "image" | null;

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Julian Weng",
    image:
      "https://julianweng.com/static/de0938520fe51f46529d519ce402f246/d1234/jwsuit.webp",
    budget: [1000, 1100],
    date: [
      new Date(),
      new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    ],
    location: "Philadelphia, PA",
    notificationEnabled: true,
  });

  const [editingField, setEditingField] = useState<EditingField>(null);

  const handleSave = () => {
    setEditingField(null);
  };

  const renderEditContent = () => {
    switch (editingField) {
      case "budget":
        return (
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum Budget
              </label>
              <input
                type="number"
                value={profile.budget[0]}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    budget: [Number(e.target.value), prev.budget[1]],
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Maximum Budget
              </label>
              <input
                type="number"
                value={profile.budget[1]}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    budget: [prev.budget[0], Number(e.target.value)],
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );

      case "dates":
        return (
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={profile.date[0].toISOString().split("T")[0]}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    date: [
                      new Date(e.target.value + "T00:00:00"),
                      prev.date[1],
                    ],
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={profile.date[1].toISOString().split("T")[0]}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    date: [
                      prev.date[0],
                      new Date(e.target.value + "T00:00:00"),
                    ],
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );

      case "location":
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="w-full p-2 border rounded"
            />
          </div>
        );

      case "image":
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={profile.image}
              onChange={(e) =>
                setProfile((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
              placeholder="Enter image URL"
              className="w-full p-2 border rounded"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Preview</label>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-200">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150";
                  }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleToggleNotifications = () => {
    setProfile((prev) => ({
      ...prev,
      notificationEnabled: !prev.notificationEnabled,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center px-8">
      {/* Profile Image and Name Section */}
      <div className="w-full flex items-center justify-center h-[400px]">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-48 h-48 bg-slate-200 rounded-full overflow-hidden">
            <img
              src={profile.image}
              alt={profile.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/150";
              }}
            />
          </div>
          <div className="text-2xl font-bold">{profile.name}</div>
          <div
            className="text-sm text-slate-500 hover:underline cursor-pointer"
            onClick={() => setEditingField("image")}
          >
            Edit image
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col space-y-4">
          <ProfileSection
            icon={<MdOutlineAttachMoney className="text-2xl" />}
            title="Budget"
            value={`$${profile.budget[0]} - $${profile.budget[1]}/month`}
            onEdit={() => setEditingField("budget")}
          />

          <ProfileSection
            icon={<MdOutlineCalendarToday className="text-2xl" />}
            title="Dates"
            value={`${profile.date[0].toLocaleDateString()} - ${profile.date[1].toLocaleDateString()}`}
            onEdit={() => setEditingField("dates")}
          />

          <ProfileSection
            icon={<MdOutlineLocationOn className="text-2xl" />}
            title="Location"
            value={profile.location}
            onEdit={() => setEditingField("location")}
          />

          {/* Notification Section */}
          <ProfileSection
            icon={<MdNotifications className="text-2xl" />}
            title="Notifications"
            value={profile.notificationEnabled ? "Enabled" : "Disabled"}
            action={
              <Switch.Root
                checked={profile.notificationEnabled}
                onCheckedChange={handleToggleNotifications}
                className="w-[42px] h-[25px] bg-gray-400 rounded-full relative data-[state=checked]:bg-sky-500 outline-none cursor-default"
              >
                <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            }
          />
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editingField !== null}
        onClose={() => setEditingField(null)}
        onSave={handleSave}
        title={`Edit ${editingField?.charAt(0).toUpperCase()}${
          editingField?.slice(1) ?? ""
        }`}
      >
        {renderEditContent()}
      </EditModal>
    </div>
  );
}
