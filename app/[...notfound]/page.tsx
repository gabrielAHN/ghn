import { redirect } from 'next/navigation';

export default function NotFoundCatchAllPage() {
  redirect('/');
  return null;
}