import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-8">
      <section className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold">AbleSpace Worksheet Module</h1>
        <p className="mt-3 text-muted-foreground">
          Navigate to the worksheet library to manage and assign worksheets.
        </p>
        <Link
          href="/worksheets"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Open Worksheet Library
        </Link>
      </section>
    </main>
  );
}
