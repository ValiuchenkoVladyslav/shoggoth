"use client";

import { emit, listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";

export function CatOtpRequest() {
  const [otpRequested, setRequested] = useState(false);

  useEffect(() => {
    const unlisten = listen("cat-otp-request", () => setRequested(true));

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <AlertDialog open={otpRequested} onOpenChange={setRequested}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            BellingCat TG asks for Telegram OTP code
          </AlertDialogTitle>
          <AlertDialogDescription>
            This reqired only once. Later created session will be reused.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-between">
          <InputOTP
            maxLength={5}
            onChange={(value) => {
              if (value.length === 5) {
                emit("cat-otp", value).then(() => setRequested(false));
              }
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
