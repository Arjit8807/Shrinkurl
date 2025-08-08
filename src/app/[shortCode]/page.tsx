// src/app/[shortCode]/page.tsx
import RedirectClient from './RedirectClient';

const RedirectPage = ({ params }: { params: { shortCode: string } }) => {
  return <RedirectClient shortCode={params.shortCode} />;
};

export default RedirectPage;