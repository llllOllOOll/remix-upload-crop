import { Avatar, AvatarImage } from "~/components/ui/avatar";
import avatar from "public/svg/avatar.png";
import { Link, Outlet } from "@remix-run/react";

export default function SettingsPage() {
  return (
    <>
      <div>
        <header className="p-2 bg-zinc-300">
          <nav>
            <Link to="/settings/picture">
              <Avatar className="w-12 h-12">
                <AvatarImage src={avatar} />
              </Avatar>
            </Link>
          </nav>
        </header>
      </div>
      <div className="w-full max-w-md h-[600px] mx-auto mt-4  bg-gray-400"></div>
      <Outlet />
    </>
  );
}
