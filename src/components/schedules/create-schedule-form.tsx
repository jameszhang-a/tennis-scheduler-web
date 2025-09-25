"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { FormHeader } from "@/components/ui/form-header";
import type { CreateScheduleRequest } from "@/lib/types";

type FormValues = {
  schedule_type: "one-off" | "recurring";
  day_of_week?: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  date?: string;
  time: string;
  court_id: "1" | "2";
  occurrences: number;
  duration: number;
};

type CreateScheduleFormProps = {
  onSubmit: (data: CreateScheduleRequest) => void;
  isLoading: boolean;
};

const DAYS_OF_WEEK = [
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
] as const;

const COURTS = [
  { value: "1", label: "Court 1" },
  { value: "2", label: "Court 2" },
] as const;

const DURATION_OPTIONS = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "60 minutes" },
] as const;

export default function CreateScheduleForm({
  onSubmit,
  isLoading,
}: CreateScheduleFormProps) {
  const [scheduleType, setScheduleType] = useState<"one-off" | "recurring">(
    "recurring"
  );

  const form = useForm<FormValues>({
    defaultValues: {
      schedule_type: "recurring",
      time: "",
      court_id: "1",
      occurrences: 1,
      duration: 60,
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Basic validation
    if (!values.time) {
      form.setError("time", { message: "Time is required" });
      return;
    }

    if (values.schedule_type === "one-off" && !values.date) {
      form.setError("date", {
        message: "Date is required for one-off schedules",
      });
      return;
    }

    if (values.schedule_type === "recurring" && !values.day_of_week) {
      form.setError("day_of_week", {
        message: "Day of week is required for recurring schedules",
      });
      return;
    }

    // Validate time format (7:00 AM to 9:30 PM, HH:00 or HH:30 only)
    const timeRegex = /^(0[7-9]|1[0-9]|2[0-1]):(00|30)$/;
    if (!timeRegex.test(values.time)) {
      form.setError("time", {
        message:
          "Time must be between 7:00 AM and 9:30 PM with 00 or 30 minutes",
      });
      return;
    }

    const submitData: CreateScheduleRequest = {
      schedule_type: values.schedule_type,
      time: values.time,
      court_id: values.court_id,
      occurrences: values.occurrences,
      duration: values.duration,
    };

    if (values.schedule_type === "one-off") {
      submitData.date = values.date;
    } else {
      submitData.day_of_week = values.day_of_week;
    }

    onSubmit(submitData);
  };

  const handleScheduleTypeChange = (type: "one-off" | "recurring") => {
    setScheduleType(type);
    form.setValue("schedule_type", type);
    // Clear the conditional fields when switching types
    if (type === "one-off") {
      form.setValue("day_of_week", undefined);
    } else {
      form.setValue("date", undefined);
    }
  };

  // Generate today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Tennis Schedule</CardTitle>
        <CardDescription>
          Schedule tennis court reservations. You can create a one-time booking
          or a recurring schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {/* Schedule Type Section */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">
                      Schedule Configuration
                    </h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set up your tennis court booking schedule</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="schedule_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormHeader
                        label="Schedule Type"
                        tooltip="Choose whether this is a one-time booking or a recurring weekly schedule."
                      />
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: "one-off" | "recurring") => {
                            field.onChange(value);
                            handleScheduleTypeChange(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select schedule type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recurring">Recurring</SelectItem>
                            <SelectItem value="one-off">One-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date & Time Section */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">Date & Time</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>When should the court be booked? (Eastern Time)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Day/Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Day of Week (for recurring) */}
                  {scheduleType === "recurring" && (
                    <FormField
                      control={form.control}
                      name="day_of_week"
                      render={({ field }) => (
                        <FormItem>
                          <FormHeader
                            label="Day of Week"
                            tooltip="Which day of the week should the court be booked?"
                          />
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select day of week" />
                              </SelectTrigger>
                              <SelectContent>
                                {DAYS_OF_WEEK.map((day) => (
                                  <SelectItem key={day.value} value={day.value}>
                                    {day.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Date (for one-off) */}
                  {scheduleType === "one-off" && (
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormHeader
                            label="Date"
                            tooltip="Select the specific date for your court booking."
                          />
                          <FormControl>
                            <Input type="date" min={today} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Time */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormHeader
                          label="Time"
                          tooltip="What time should the court booking attempt be made?"
                        />
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 15 }, (_, i) => {
                                const hour = i + 7; // Start from 7 AM
                                const hourStr = hour
                                  .toString()
                                  .padStart(2, "0");
                                const times = [];

                                // Add :00 time slot
                                times.push(
                                  <SelectItem
                                    key={`${hourStr}:00`}
                                    value={`${hourStr}:00`}
                                  >
                                    {hourStr}:00
                                  </SelectItem>
                                );

                                // Add :30 time slot, but stop at 21:30 (9:30 PM)
                                if (hour < 22) {
                                  times.push(
                                    <SelectItem
                                      key={`${hourStr}:30`}
                                      value={`${hourStr}:30`}
                                    >
                                      {hourStr}:30
                                    </SelectItem>
                                  );
                                }

                                return times;
                              }).flat()}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Court & Booking Details */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">Booking Details</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Court selection and booking preferences</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Court */}
                  <FormField
                    control={form.control}
                    name="court_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormHeader
                          label="Court"
                          tooltip="Which court would you like to book?"
                        />
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select court" />
                            </SelectTrigger>
                            <SelectContent>
                              {COURTS.map((court) => (
                                <SelectItem
                                  key={court.value}
                                  value={court.value}
                                >
                                  {court.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormHeader
                          label="Duration"
                          tooltip="How long is the court booking? Usually 60 minutes."
                        />
                        <FormControl>
                          <Select
                            value={field.value.toString()}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              {DURATION_OPTIONS.map((duration) => (
                                <SelectItem
                                  key={duration.value}
                                  value={duration.value.toString()}
                                >
                                  {duration.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Occurrences (for recurring) */}
                  {scheduleType === "recurring" && (
                    <FormField
                      control={form.control}
                      name="occurrences"
                      render={({ field }) => (
                        <FormItem>
                          <FormHeader
                            label="Number of Occurrences"
                            tooltip="How many weeks should this schedule run? Even for 1 occurrence, the system will create 2 booking attempts for better success rate."
                          />
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={52}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 sm:flex-none sm:min-w-[200px]"
                >
                  {isLoading ? "Creating Schedule..." : "Create Schedule"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                  className="sm:min-w-[120px]"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
