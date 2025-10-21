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
    queryKey: ["note", page],
    queryFn: () => getNotes("", page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <p>{page}</p> */}
      <NotesClient />
    </HydrationBoundary>
  );
}

export default NotesPage;
