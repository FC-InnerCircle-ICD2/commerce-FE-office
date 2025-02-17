import Sidebar from './Sidebar';

type Props = {
  children: React.ReactElement;
};

export default function Layout({ children }: Props) {
  return (
    <main className="flex w-screen h-screen">
      <Sidebar />
      {children}
    </main>
  );
}
