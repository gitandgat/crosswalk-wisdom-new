import { supabase, type Profile } from "./supabase";

/** Data access for the Glute Longevity SaaS. RLS enforces who can see/do what;
 *  these are thin typed wrappers over Supabase queries. */

export type Assignment = {
  id: string;
  client_id: string;
  program_slug: string;
  current_week: number;
  trainer_notes: string | null;
  created_at: string;
};

export type ClientScan = {
  id: string;
  client_id: string;
  case_name: string;
  case_url: string | null;
  scan_date: string;
  note: string | null;
  created_at: string;
};

export type ClientPhoto = {
  id: string;
  client_id: string;
  storage_path: string;
  week: number | null;
  note: string | null;
  created_at: string;
};

const PHOTOS_BUCKET = "progress-photos";

export type WorkoutLog = {
  id: string;
  client_id: string;
  program_slug: string;
  week: number;
  day_label: string;
  exercise_key: string;
  completed: boolean;
  weight: string | null;
  reps: string | null;
  notes: string | null;
  logged_at: string;
};

export const PROGRAM_SLUG = "glute-longevity";

/** Trainer: all client profiles (RLS lets trainers read all). */
export async function listClients(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Profile[];
}

/** Trainer: all assignments (RLS scopes to the trainer's view). */
export async function listAssignments(): Promise<Assignment[]> {
  const { data, error } = await supabase.from("assignments").select("*");
  if (error) throw error;
  return (data ?? []) as Assignment[];
}

export async function assignProgram(clientId: string, trainerId: string): Promise<void> {
  const { error } = await supabase.from("assignments").insert({
    client_id: clientId,
    program_slug: PROGRAM_SLUG,
    assigned_by: trainerId,
  });
  if (error) throw error;
}

export async function unassignProgram(clientId: string): Promise<void> {
  const { error } = await supabase
    .from("assignments")
    .delete()
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG);
  if (error) throw error;
}

/** Either role: this program's assignment for one client (RLS scopes clients to their own). */
export async function getAssignment(clientId: string): Promise<Assignment | null> {
  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG)
    .maybeSingle();
  if (error) throw error;
  return data as Assignment | null;
}

/** Trainer: set/update the notes shown to this client (e.g. assessment findings). */
export async function updateTrainerNotes(clientId: string, notes: string): Promise<void> {
  const { error } = await supabase
    .from("assignments")
    .update({ trainer_notes: notes })
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG);
  if (error) throw error;
}

/** Either role: MoveAssess scan links for one client, newest first. */
export async function listScans(clientId: string): Promise<ClientScan[]> {
  const { data, error } = await supabase
    .from("client_scans")
    .select("*")
    .eq("client_id", clientId)
    .order("scan_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ClientScan[];
}

/** Trainer: link a client to a MoveAssess case + the date it was scanned. */
export async function addScan(
  clientId: string,
  fields: { case_name: string; case_url?: string; scan_date: string; note?: string }
): Promise<void> {
  const { error } = await supabase.from("client_scans").insert({
    client_id: clientId,
    case_name: fields.case_name,
    case_url: fields.case_url || null,
    scan_date: fields.scan_date,
    note: fields.note || null,
  });
  if (error) throw error;
}

/** Trainer: remove a scan link (e.g. entered by mistake). */
export async function deleteScan(id: string): Promise<void> {
  const { error } = await supabase.from("client_scans").delete().eq("id", id);
  if (error) throw error;
}

/** Either role: this client's progress photos, newest first. */
export async function listPhotos(clientId: string): Promise<ClientPhoto[]> {
  const { data, error } = await supabase
    .from("client_photos")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ClientPhoto[];
}

/** Either role: a short-lived signed URL (the bucket is private, no public URLs). */
export async function getPhotoUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from(PHOTOS_BUCKET).createSignedUrl(storagePath, 3600);
  if (error) throw error;
  return data.signedUrl;
}

/** Client: upload a weekly progress photo. Path is prefixed with their own id —
 *  the Storage RLS policy checks that folder segment against auth.uid(). */
export async function uploadPhoto(
  clientId: string,
  file: File,
  fields: { week?: number; note?: string }
): Promise<void> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${clientId}/${Date.now()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {
    contentType: file.type,
  });
  if (uploadError) throw uploadError;

  const { error } = await supabase.from("client_photos").insert({
    client_id: clientId,
    storage_path: path,
    week: fields.week ?? null,
    note: fields.note || null,
  });
  if (error) throw error;
}

/** Trainer or the owning client: remove a photo + its underlying file. */
export async function deletePhoto(id: string, storagePath: string): Promise<void> {
  await supabase.storage.from(PHOTOS_BUCKET).remove([storagePath]);
  const { error } = await supabase.from("client_photos").delete().eq("id", id);
  if (error) throw error;
}

/** Trainer: all logs for a specific client across the whole program. */
export async function getLogsForClient(clientId: string): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG)
    .order("week", { ascending: true });
  if (error) throw error;
  return (data ?? []) as WorkoutLog[];
}

/** Client: logs for a specific week+day (RLS scopes to own rows automatically). */
export async function getLogsForDay(week: number, dayLabel: string): Promise<WorkoutLog[]> {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("program_slug", PROGRAM_SLUG)
    .eq("week", week)
    .eq("day_label", dayLabel);
  if (error) throw error;
  return (data ?? []) as WorkoutLog[];
}

/** Client: save/overwrite a log entry (delete-then-insert so it's always current). */
export async function saveLog(
  clientId: string,
  week: number,
  dayLabel: string,
  exerciseKey: string,
  fields: { completed: boolean; weight?: string; reps?: string; notes?: string }
): Promise<void> {
  await supabase
    .from("workout_logs")
    .delete()
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG)
    .eq("week", week)
    .eq("day_label", dayLabel)
    .eq("exercise_key", exerciseKey);

  const { error } = await supabase.from("workout_logs").insert({
    client_id: clientId,
    program_slug: PROGRAM_SLUG,
    week,
    day_label: dayLabel,
    exercise_key: exerciseKey,
    ...fields,
  });
  if (error) throw error;
}

/** Client: remove a log entry (un-check). */
export async function deleteLog(
  clientId: string,
  week: number,
  dayLabel: string,
  exerciseKey: string
): Promise<void> {
  const { error } = await supabase
    .from("workout_logs")
    .delete()
    .eq("client_id", clientId)
    .eq("program_slug", PROGRAM_SLUG)
    .eq("week", week)
    .eq("day_label", dayLabel)
    .eq("exercise_key", exerciseKey);
  if (error) throw error;
}
