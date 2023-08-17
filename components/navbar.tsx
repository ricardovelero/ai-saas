import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu />
      </Button>
    </div>
  );
}
