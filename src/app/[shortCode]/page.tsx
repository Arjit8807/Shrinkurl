// src/app/[shortCode]/page.tsx
import RedirectClient from './RedirectClient';

type Props = {
  params: {
    shortCode: string;
  };
};

const RedirectPage = ({ params }: Props) => {
  return <RedirectClient shortCode={params.shortCode} />;
};

export default RedirectPage;