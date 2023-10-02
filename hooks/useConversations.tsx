import { fetcher } from "@/lib/swrRequests";
import useSWR from "swr";

export default function useConversations() {
  const { data, error, isLoading } = useSWR("/api/conversation", fetcher);

  return {
    conversations: data,
    isLoading,
    isError: error,
  };
}
