import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

interface ErrorPopupProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function ErrorPopup({ open, onClose, title = "Authentication Failed", message }: ErrorPopupProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm border-destructive/30 bg-card p-0 overflow-hidden sm:rounded-xl">
        <div className="h-1 w-full bg-destructive" />
        <div className="flex flex-col items-center gap-4 px-6 pt-6 pb-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-7 w-7 text-destructive" />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-lg font-bold text-foreground">{title}</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">{message}</DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pb-6 pt-2">
          <Button onClick={onClose} className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold">
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
