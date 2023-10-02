import { Avatar, AvatarImage } from "~/components/ui/avatar";
import avatar from "public/svg/avatar.png";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Link, Outlet } from "@remix-run/react";

export default function Profile({ openProfile, setOpenProfile }) {
  return (
    <>
      {/* <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent>
          <DialogHeader className="">
            <DialogTitle className="text-center">
              Update Profile Picture
            </DialogTitle>
          </DialogHeader>

          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} />
          </Avatar>
          <div>Remix</div>
          <DialogFooter className="px-8">
            <Button
              onClick={() => {
                setOpenProfile(false);
              }}
            >
              Cancel
            </Button>
            <Button className="w-full bg-pinegreen rounded-full bg-zinc-400">
              <Link to="/profile/photo">Test</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      {/* <Outlet /> */}
    </>
  );
}
