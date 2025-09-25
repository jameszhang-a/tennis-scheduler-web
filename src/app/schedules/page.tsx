"use client";

import { useState } from "react";
import { useCreateSchedule } from "@/lib/queries/api-queries";
import CreateScheduleForm from "@/components/schedules/create-schedule-form";
import type { CreateScheduleRequest } from "@/lib/types";

export default function NewSchedulePage() {
  const createMutation = useCreateSchedule();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (data: CreateScheduleRequest) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await createMutation.mutateAsync(data);

      setSuccessMessage(response.message);
    } catch (error) {
      console.error("Failed to create schedule:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to create schedule. Please try again."
      );
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Schedule
        </h1>
        <p className="text-muted-foreground mt-2">
          Add a new tennis court booking schedule. You can create one-time
          bookings or recurring weekly schedules.
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success!</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <CreateScheduleForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />

      {/* Information Section */}
      <div className="mt-8 space-y-4">
        <div className="rounded-lg border p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-3">How It Works</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Booking Logic:</strong> The system will create booking
              attempts based on your schedule type:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>One-time bookings:</strong> Creates 2 booking attempts
                (immediate + 1 week later) for better success rate
              </li>
              <li>
                <strong>Recurring schedules:</strong> Creates individual
                schedules for each occurrence
              </li>
              <li>
                <strong>Single occurrence recurring:</strong> Still creates 2
                attempts for redundancy
              </li>
            </ul>
            <p className="mt-3">
              <strong>Timing:</strong> Bookings are attempted 7 days before the
              desired date, or immediately if within 7 days.
            </p>
            <p>
              <strong>Time Zone:</strong> All times are in Eastern Time to
              maintain consistency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
