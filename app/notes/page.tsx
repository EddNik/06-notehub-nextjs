// SSR - компонент;

import { getNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: { page: string };
}

async function NotesPage({ searchParams }: NotesPageProps) {
  const queryClient = new QueryClient();

  const page = parseInt(searchParams.page) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["note", page, ""],
    queryFn: () => getNotes("", page),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ["notes", "", 1],
  //   queryFn: () => getNotes("", 1),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default NotesPage;
