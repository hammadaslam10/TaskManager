import { useGetSingleTaskManagementQuery } from "@/redux/features/taskmanagementApi";
import { useRouter } from "next/router";

export default function ViewTask() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useGetSingleTaskManagementQuery({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Task Details</h1>
      <p>Title: {data?.data?.title}</p>
      <p>Description: {data?.data?.description}</p>
      <p>Status: {data?.data?.status}</p>
      <p>Due Date: {new Date(data?.data?.dueDate).toLocaleDateString()}</p>
    </div>
  );
}
