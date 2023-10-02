import { Conversation } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreVertical, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ProfileDrawerProps = {
  conversation: Conversation;
};

export default function ContextMenu({ conversation }: ProfileDrawerProps) {
  const router = useRouter();

  const onDelete = useCallback(() => {
    axios
      .delete(`/api/conversation/${conversation.id}`)
      .then(() => {
        router.push("/conversation");
      })
      .catch((error) => {
        console.log(error.message);

        toast.error("Something went wrong!");
      });
  }, [conversation.id, router]);

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical
              size={18}
              className="text-gray-600 cursor-pointer hover:opacity-75 transition"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col justify-center items-center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center text-red-500 hover:text-red-900 cursor-pointer"
              >
                <Trash2 size={18} className="mr-3" /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              conversation and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={onDelete}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
