import Form from "@/components/form";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 mx-auto max-w-prose p-2 text-black">
      <Form />
    </main>
  );
}
