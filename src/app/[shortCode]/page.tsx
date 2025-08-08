// src/app/[shortCode]/page.tsx
import RedirectClient from './RedirectClient';

// We are simplifying the props definition to be directly inline.
const RedirectPage = ({ params }: { params: { shortCode: string } }) => {
  return <RedirectClient shortCode={params.shortCode} />;
};

export default RedirectPage;