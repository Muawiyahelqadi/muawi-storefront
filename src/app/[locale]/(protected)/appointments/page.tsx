import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import AppointmentsClient from "@/src/app/[locale]/(protected)/appointments/AppointmentsClient";
import { fetchAppointmentPageByType } from "@/src/sanity/queries/appointment";

export default async function AppointmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signIn");
  }

  const appointments = await fetchAppointmentPageByType();

  return <AppointmentsClient appointments={appointments} />;
}
