type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section className="my-10 p-6 border rounded-lg  bg-gray-50 dark:bg-transparent dark:border-gray-700">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </section>
  );
}
